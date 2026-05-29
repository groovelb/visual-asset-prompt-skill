/**
 * Visual Asset 단일 빌드: SSOT -> (1) 사전 데이터  (2) 스킬 references.
 * 레시피 prompt/negative 는 derive.mjs(공유 엔진)로 도출한다.
 *
 * 출력:
 *   src/data/visualAssetTaxonomyData.js  (사전 페이지용, 프로젝트 src 에 기록)
 *   ../references/{index.md, intent-frame.md, validation-rules.md}  (스킬 자체 references)
 * (풀 사전/검증 원본 SSOT 는 ../ssot 1벌만 유지. 스킬이 자급한다.)
 *
 * 실행: node .claude/skills/visual-asset-prompt/scripts/build.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { derive } from './derive.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, '..');              // .claude/skills/visual-asset-prompt
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');  // 프로젝트 루트
const SSOT = path.join(SKILL_ROOT, 'ssot');                    // 스킬 자급 SSOT
const SKILL_REF = path.join(SKILL_ROOT, 'references');
const DATA_OUT = path.join(ROOT, 'src', 'data', 'visualAssetTaxonomyData.js');

const dict = JSON.parse(fs.readFileSync(path.join(SSOT, 'dictionary.json'), 'utf8')).keywords;
const validation = JSON.parse(fs.readFileSync(path.join(SSOT, 'validation.json'), 'utf8'));
const recipeInput = JSON.parse(fs.readFileSync(path.join(SSOT, 'recipes.json'), 'utf8')).recipes;
const intentFrameMd = fs.readFileSync(path.join(SSOT, 'intent-frame.md'), 'utf8');

const byCat = new Map();
for (const k of dict) { if (!byCat.has(k.category)) byCat.set(k.category, []); byCat.get(k.category).push(k); }

const PARTS = [
  ['va-part-1', '기법', '어떻게 만들어진 것처럼 보이는가',
    ['Printmaking & Drawing', 'Specialized Illustration', 'Digital Illustration', 'Anime & Cartoon',
     '3D Render Style', '3D Material Finish', 'Photography', 'Retro-Digital', 'Abstract & Generative']],
  ['va-part-2', '구조', '어떤 시점과 배치로 보여주는가',
    ['Projection & Structural View', 'Diagrammatic Representation', 'Composition & Framing']],
  ['va-part-3', '표면', '선·음영·색·질감·효과를 어떻게 처리하는가',
    ['Linework & Stroke', 'Tone & Shading', 'Color Treatment', 'Texture & Surface',
     'Pattern & Ornament', 'Optical Effect', 'Subject Treatment', 'Mood & Atmosphere']],
];

const CAT_META = {
  'Printmaking & Drawing': ['판화·드로잉', '판화나 손 드로잉처럼 찍고 그린 듯한 아날로그 제작 기법입니다. 잉크와 종이의 물성이 그대로 드러납니다.'],
  'Specialized Illustration': ['전문 도해', '대상의 구조와 작동 원리를 정확하게 설명하는 전문 도해형 일러스트입니다. 기술·과학 문서의 명료함을 목표로 합니다.'],
  'Digital Illustration': ['디지털 일러스트', '벡터와 플랫처럼 디지털 도구로 그린 현대 일러스트 양식입니다. 화면과 인쇄 모두에 깔끔하게 적용됩니다.'],
  'Anime & Cartoon': ['애니·카툰', '애니메이션과 만화 특유의 셀 음영, 캐릭터 비례, 컷 양식입니다.'],
  '3D Render Style': ['3D 렌더', '입체로 렌더링한 듯한 3D 형상 표현 방식입니다. 점토, 와이어프레임, 로우폴리 등 렌더 룩으로 나뉩니다.'],
  '3D Material Finish': ['3D 재질', '유리, 금속, 세라믹처럼 3D 표면이 빛에 반응하는 재질 마감입니다.'],
  'Photography': ['사진', '실제로 촬영한 사진처럼 보이는 카메라 기반 양식입니다. 스튜디오, 필름, 매크로 등 촬영 방식으로 나뉩니다.'],
  'Retro-Digital': ['레트로 디지털', '신스웨이브, Y2K처럼 특정 시대의 디지털 미감을 재현하는 양식입니다.'],
  'Abstract & Generative': ['추상·제너러티브', '코드로 생성하는 추상 형상과 제너러티브 패턴입니다. 그라디언트, 파티클, 필드 계열이 대표적입니다.'],
  'Projection & Structural View': ['시점·투영', '대상을 어떤 시점과 투영으로 보여줄지 정하는 공간 표현입니다. 아이소메트릭, 정투영, 단면 등이 포함됩니다.'],
  'Diagrammatic Representation': ['다이어그램', '구조와 관계를 설명하기 위한 도식·다이어그램 형식입니다. 시스템, 플로우, 네트워크 등을 시각화합니다.'],
  'Composition & Framing': ['구도·프레이밍', '화면 안에서 요소를 배치하고 잘라내는 구도 규칙입니다.'],
  'Linework & Stroke': ['선 처리', '선의 굵기, 질감, 성격을 정하는 선 처리 방식입니다.'],
  'Tone & Shading': ['톤·음영', '명암과 음영을 만드는 톤 처리 방식입니다. 해칭, 하프톤, 그라디언트 등이 있습니다.'],
  'Color Treatment': ['색 운용', '색을 제한하고 조정하는 색 운용 규칙입니다. 모노크롬, 듀오톤, 제한 팔레트 등으로 결과의 톤을 좌우합니다.'],
  'Texture & Surface': ['질감·표면', '종이결, 필름 그레인, 노이즈처럼 표면에 얹는 질감 오버레이입니다.'],
  'Pattern & Ornament': ['패턴·장식', '반복 패턴과 장식 요소입니다. 배경이나 테두리에 리듬을 부여합니다.'],
  'Optical Effect': ['광학 효과', '글로우, 글리치, 굴절처럼 빛과 렌즈를 흉내 내는 후처리 효과입니다.'],
  'Subject Treatment': ['대상 처리', '대상을 얼마나 사실적으로 또는 추상적으로 다룰지 정하는 추상화 정도입니다.'],
  'Mood & Atmosphere': ['빛·분위기', '빛과 환경 요소로 최종 분위기를 만드는 처리입니다. 소프트 라이트, 골든 아워, 네온 글로우 등이 있습니다.'],
};

const IMPL_SHORT = {
  'SVG Linework': 'SVG', 'Static SVG Asset': 'SVG', 'Generated Raster Image': 'Image(gen)',
  'Hybrid Image + Code Overlay': 'Hybrid', 'CSS': 'CSS', 'Canvas': 'Canvas', 'WebGL': 'WebGL',
  'Three.js': 'Three.js', 'SVG Filter': 'SVG Filter', '3D Model': '3D',
};
const shortImpl = (arr) => {
  const out = [];
  for (const x of arr || []) { const s = IMPL_SHORT[x] || x; if (!out.includes(s)) out.push(s); }
  return out;
};

const item = (k) => {
  const enriched = k.depthStatus === 'enriched';
  return {
    name: k.keyword,
    koName: k.koName || '',
    role: k.role,
    description: k.definition,
    visual: enriched ? (k.visualResult || []).join(' · ') : '',
    build: shortImpl(k.implementation),
    goodWith: [...(k.compatibleKeywords || [])],
    avoidWith: [...(k.incompatibleKeywords || [])],
    promptFragment: enriched ? (k.promptFragment || '') : '',
    pending: !enriched,
  };
};

// taxonomy 조립
const taxonomy = [];
let catNo = 0;
for (const [pid, plabel, pdesc, cats] of PARTS) {
  const pnum = Number(pid.split('-').pop());
  let partItems = 0;
  const categories = [];
  for (const c of cats) {
    catNo += 1;
    const ks = byCat.get(c);
    partItems += ks.length;
    const [sub, defn] = CAT_META[c];
    categories.push({
      id: `va-cat-${catNo}`, number: catNo, name: c, subtitle: sub,
      definition: defn, count: ks.length,
      groups: [{ label: null, items: ks.map(item) }],
    });
  }
  taxonomy.push({ id: pid, number: pnum, label: plabel, description: pdesc, type: 'visual-asset', count: partItems, categories });
}
const stats = { parts: PARTS.length, categories: catNo, keywords: dict.length };

// recipes: prompt/negative 를 derive.mjs 로 도출 (단일 로직 출처)
const recipes = recipeInput.map((r) => {
  const d = derive(r.keywords, r.facetFrame.subject, { authoredAvoid: r.avoid || [] });
  return { id: r.id, title: r.title, intent: r.intent, subject: r.facetFrame.subject,
    facetFrame: r.facetFrame, keywords: r.keywords, output: r.output,
    slots: d.slots, prompt: d.prompt, negative: d.negative };
});

// ── JS 에미터 (designTaxonomyData.js 손맛 유지: 비따옴표 키, 인라인 문자열 배열) ──
const isPlainKey = (k) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k);
function emit(o, ind = 0) {
  const sp = '  '.repeat(ind);
  if (Array.isArray(o)) {
    if (o.length === 0) return '[]';
    if (o.every((x) => typeof x === 'string')) return '[' + o.map((x) => JSON.stringify(x)).join(', ') + ']';
    return '[\n' + o.map((x) => sp + '  ' + emit(x, ind + 1)).join(',\n') + '\n' + sp + ']';
  }
  if (o && typeof o === 'object') {
    const keys = Object.keys(o);
    if (keys.length === 0) return '{}';
    return '{\n' + keys.map((k) => {
      const key = isPlainKey(k) ? k : JSON.stringify(k);
      return sp + '  ' + key + ': ' + emit(o[k], ind + 1);
    }).join(',\n') + '\n' + sp + '}';
  }
  if (o === null) return 'null';
  if (typeof o === 'boolean' || typeof o === 'number') return String(o);
  return JSON.stringify(o);
}

const header = `/**
 * Vibe Dictionary: Visual Asset Taxonomy v0.1 데이터
 *
 * 3 Parts (기법 / 구조 / 표면) · 20 Categories · 284 Keywords
 *
 * 출처: 검증된 하이브리드 SSOT (.claude/skills/visual-asset-prompt/ssot/dictionary.json).
 * 자동 생성: .claude/skills/visual-asset-prompt/scripts/build.mjs. 직접 수정하지 말고 SSOT 에서 재생성.
 *
 * item type 'visual-asset' 필드:
 * - name / koName / role(Core·Support·Niche·Scaffold) / description
 * - visual: 결과 시각 특징 (깊이-완성 45개만, 나머지는 빈 값 = 준비 중)
 * - build: 바이브 코딩 구현 경로 (SVG·Canvas·Image 등)
 * - goodWith / avoidWith: 조합 가이드 (잘 어울림 / 충돌)
 * - promptFragment: 복사용 영문 프롬프트 조각 (깊이-완성 45개만)
 * - pending: 깊이 필드 미완성 여부
 *
 * VISUAL_ASSET_RECIPES: 활용법 워크드 예제. prompt/negative 는 derive.mjs 도출.
 */
`;

const dataBody = header +
  '\nexport const VISUAL_ASSET_TAXONOMY_STATS = ' + emit(stats) + ';\n' +
  '\nexport const VISUAL_ASSET_TAXONOMY = ' + emit(taxonomy) + ';\n' +
  '\n/** 활용법 워크드 예제: 의도 -> 7축 -> 키워드 -> 출력 -> 프롬프트 -> 네거티브.\n' +
  ' *  prompt 는 11슬롯 도출, negative 는 충돌 합집합 + 저자 avoid. (derive.mjs) */\n' +
  '\nexport const VISUAL_ASSET_RECIPES = ' + emit(recipes) + ';\n';

fs.writeFileSync(DATA_OUT, dataBody);

// ── 스킬 references ──
fs.mkdirSync(SKILL_REF, { recursive: true });

// index.md: 284 한 줄, 카테고리별 (선택 단계 브라우징용)
let index = '# Visual Asset 키워드 인덱스\n\n> 선택 단계용 한 줄 요약. 풀 필드(promptFragment·compatible·incompatible·implementation)는 `.claude/skills/visual-asset-prompt/ssot/dictionary.json` 조회.\n> 슬롯 정렬·네거티브는 `.claude/skills/visual-asset-prompt/scripts/derive.mjs`, positive 프롬프트 문장은 LLM 이 작성.\n';
for (const [pid, plabel, pdesc, cats] of PARTS) {
  index += `\n## Part: ${plabel} (${pdesc})\n`;
  for (const c of cats) {
    const [sub, defn] = CAT_META[c];
    index += `\n### ${c} · ${sub}\n${defn}\n`;
    for (const k of byCat.get(c)) {
      const b = shortImpl(k.implementation).join('/');
      index += `- ${k.keyword} (${k.koName} · ${k.role} · ${b}): ${k.definition}\n`;
    }
  }
}
fs.writeFileSync(path.join(SKILL_REF, 'index.md'), index);

// intent-frame.md (copy, 1벌)
fs.writeFileSync(path.join(SKILL_REF, 'intent-frame.md'), intentFrameMd);

// validation-rules.md (validation.json -> readable md)
let vr = '# 검증 규칙 (절제 가드)\n\n## 원칙\n';
for (const p of validation.principles) vr += `- ${p}\n`;
vr += '\n## 복잡도 예산 (키워드 상한)\n';
for (const [lvl, o] of Object.entries(validation.complexityLevels)) vr += `- ${lvl}: 최대 ${o.maxKeywords}개 (${o.description})\n`;
vr += '\n## 글로벌 충돌 규칙\n';
for (const r of validation.globalIncompatibleRules) vr += `- [${r.if.join(', ')}] 이면 [${r.avoid.join(', ')}] 피함: ${r.reason}\n`;
vr += '\n## 출력별 점검\n';
for (const [k, arr] of Object.entries(validation.outputChecks)) vr += `- ${k}: ${arr.join(' / ')}\n`;
fs.writeFileSync(path.join(SKILL_REF, 'validation-rules.md'), vr);

console.log('build.mjs done');
console.log(`  data: ${path.relative(ROOT, DATA_OUT)} (parts=${stats.parts} cat=${stats.categories} kw=${stats.keywords} recipes=${recipes.length})`);
console.log(`  skill refs: index.md, intent-frame.md, validation-rules.md`);
