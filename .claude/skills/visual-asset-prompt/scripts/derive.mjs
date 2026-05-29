/**
 * Visual Asset 프롬프트 도출 엔진 (단일 로직 출처).
 *
 * 사전 빌드(build.mjs)와 visual-asset-prompt 스킬이 공유한다.
 * 흐름: classify(슬롯 분류) -> validate(절제 가드) -> assemble(11슬롯 문법 조립) -> negative(충돌 자동 도출)
 *
 * CLI:  node derive.mjs '["Etching","Cross-hatching","Monochrome"]' "fine dining menu" [complexity]
 *       -> { prompt, negative, slots, violations } JSON 출력
 *
 * import: import { derive, validate, classify } from './derive.mjs'
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SSOT_DIR = path.join(__dirname, '..', 'ssot'); // 스킬 자급: scripts/ 옆 ../ssot

let _dict = null;
let _val = null;

/** SSOT 사전 로드 (lazy, 캐시). keyword -> entry */
export function loadDict() {
  if (_dict) return _dict;
  const raw = JSON.parse(fs.readFileSync(path.join(SSOT_DIR, 'dictionary.json'), 'utf8'));
  _dict = new Map(raw.keywords.map((k) => [k.keyword, k]));
  return _dict;
}

/** 검증 규칙 로드 (복잡도 게이트 등) */
export function loadValidation() {
  if (_val) return _val;
  _val = JSON.parse(fs.readFileSync(path.join(SSOT_DIR, 'validation.json'), 'utf8'));
  return _val;
}

// 카테고리 -> 프롬프트 슬롯. style = 배타적 표현 스타일(최대 2), form = 조합형 추상/제너러티브(자유 적층)
const CATEGORY_SLOT = {
  'Printmaking & Drawing': 'style', 'Specialized Illustration': 'style', 'Digital Illustration': 'style',
  'Anime & Cartoon': 'style', '3D Render Style': 'style', 'Photography': 'style', 'Retro-Digital': 'style',
  'Abstract & Generative': 'form',
  'Projection & Structural View': 'view', 'Diagrammatic Representation': 'view', 'Composition & Framing': 'view',
  'Linework & Stroke': 'line', 'Tone & Shading': 'tone', 'Color Treatment': 'color',
  'Texture & Surface': 'texture', 'Pattern & Ornament': 'texture', '3D Material Finish': 'material',
  'Optical Effect': 'effect', 'Subject Treatment': 'treatment', 'Mood & Atmosphere': 'mood',
};
// 사람이 그림을 묘사하는 자연 순서 (이미지 모델 친화)
const SLOT_ORDER = ['style', 'form', 'view', 'treatment', 'line', 'tone', 'color', 'material', 'texture', 'effect', 'mood'];

/** 선택 키워드를 슬롯으로 분류 */
export function classify(keywords) {
  const dict = loadDict();
  const slots = Object.fromEntries(SLOT_ORDER.map((s) => [s, []]));
  for (const kw of keywords) {
    const e = dict.get(kw);
    if (!e) continue;
    slots[CATEGORY_SLOT[e.category] || 'texture'].push(kw);
  }
  return slots;
}

/** 절제 가드: style<=2, 복잡도 예산, 충돌 쌍. (차단 아닌 보고) */
export function validate(keywords, { complexity = 'medium' } = {}) {
  const dict = loadDict();
  const val = loadValidation();
  const slots = classify(keywords);
  const present = keywords.filter((k) => dict.has(k));
  const violations = [];

  if (slots.style.length > 2) {
    violations.push({ rule: 'style<=2', detail: slots.style, message: '배타적 표현 스타일이 2개를 초과합니다. 하나로 좁히세요.' });
  }
  const budget = val.complexityLevels?.[complexity]?.maxKeywords ?? 8;
  if (present.length > budget) {
    violations.push({ rule: 'complexity-budget', detail: `${present.length} > ${budget} (${complexity})`, message: '키워드 예산을 초과합니다. 보정 키워드를 줄이세요.' });
  }
  const conflicts = [];
  for (let i = 0; i < present.length; i++) {
    for (let j = i + 1; j < present.length; j++) {
      const a = present[i], b = present[j];
      const inc = new Set(dict.get(a).incompatibleKeywords);
      const incB = new Set(dict.get(b).incompatibleKeywords);
      if (inc.has(b) || incB.has(a)) conflicts.push([a, b]);
    }
  }
  if (conflicts.length) {
    violations.push({ rule: 'incompatible', detail: conflicts, message: '충돌 조합이 있습니다. 한쪽을 빼거나 대안으로 교체하세요.' });
  }
  return { ok: violations.length === 0, violations, slots, budget };
}

/** 키워드의 프롬프트 조각. 없으면 영어 키워드 자체를 프롬프트 토큰으로 사용
 *  (키워드명이 곧 영어 스타일 토큰이라 이미지 모델에 그대로 통한다. 한글 fallback 금지). */
function frag(entry) {
  if (entry.promptFragment) return entry.promptFragment;
  return entry.keyword.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
}

/** 11슬롯 고정 문법으로 프롬프트 조립. subject(내용)는 사용자 언어 그대로 맨 앞. */
export function assemble(keywords, subject) {
  const dict = loadDict();
  const slots = classify(keywords);
  const parts = [];
  if (subject) parts.push(subject.trim());
  for (const slot of SLOT_ORDER) {
    for (const kw of slots[slot]) parts.push(frag(dict.get(kw)));
  }
  return parts.join(', ');
}

/** 네거티브 = 선택 키워드들의 incompatible 합집합 - 선택된 것 (+ 저자 avoid 보강) */
export function negative(keywords, authoredAvoid = []) {
  const dict = loadDict();
  const neg = new Set();
  for (const kw of keywords) {
    const e = dict.get(kw);
    if (e) for (const x of e.incompatibleKeywords) neg.add(x);
  }
  for (const kw of keywords) neg.delete(kw);
  for (const a of authoredAvoid) neg.add(a);
  return [...neg].sort();
}

/** 통합 도출: 검증 + 조립 + 네거티브 */
export function derive(keywords, subject, { authoredAvoid = [], complexity = 'medium' } = {}) {
  const v = validate(keywords, { complexity });
  return {
    prompt: assemble(keywords, subject),
    negative: negative(keywords, authoredAvoid),
    slots: Object.fromEntries(Object.entries(v.slots).filter(([, arr]) => arr.length)),
    violations: v.violations,
    complexity,
  };
}

// ── CLI ──
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const keywords = JSON.parse(process.argv[2] || '[]');
  const subject = process.argv[3] || '';
  const complexity = process.argv[4] || 'medium';
  console.log(JSON.stringify(derive(keywords, subject, { complexity }), null, 2));
}
