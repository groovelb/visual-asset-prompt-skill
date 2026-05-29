/**
 * 환경 사전 조사: 이 환경에서 어떤 이미지 생성기가 실제로 호출 가능한지 알려준다.
 * visual-asset-prompt 스킬의 0단계에서 호출해, 가용 타깃 모델에 맞춰 프롬프트를 최적화한다.
 *
 * 사용법: node .claude/skills/visual-asset-prompt/scripts/detect-env.mjs
 * 출력: { generators: {...}, recommendedTarget, notes } JSON
 */
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..', '..'); // 스킬 scripts -> 프로젝트 루트 (4단계 위)
const RUNNER = '.claude/skills/visual-asset-prompt/scripts/nano-gen.mjs';

async function loadEnv() {
  try {
    const txt = await readFile(join(ROOT, '.env.local'), 'utf-8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
    }
  } catch { /* env 직접 사용 */ }
}
const exists = (p) => access(join(ROOT, p)).then(() => true).catch(() => false);

await loadEnv();

const nanoKey = !!process.env.GEMINI_API_KEY;
const nanoScript = await exists(RUNNER);
const gptKey = !!(process.env.OPENAI_API_KEY);
const gptSdk = await exists('node_modules/openai');

const generators = {
  'nano-banana': {
    available: nanoKey && nanoScript,
    key: nanoKey ? 'GEMINI_API_KEY set' : 'GEMINI_API_KEY missing',
    runner: nanoScript ? RUNNER : 'missing',
    model: 'gemini-3.1-flash-image-preview',
    profile: 'nano-banana',
  },
  'gpt-image': {
    available: gptKey && gptSdk,
    key: gptKey ? 'OPENAI_API_KEY set' : 'OPENAI_API_KEY missing',
    sdk: gptSdk ? 'openai installed' : 'openai SDK not installed',
    model: 'gpt-image-2',
    profile: 'gpt-image',
  },
};

const availableList = Object.entries(generators).filter(([, g]) => g.available).map(([k]) => k);
const recommendedTarget = availableList[0] || null;

const notes = [];
if (!recommendedTarget) notes.push('호출 가능한 생성기 없음. 키/SDK 설치 필요.');
if (availableList.length > 1) notes.push('복수 가용. 의도에 맞는 타깃을 사용자에게 확인 권장.');
if (!generators['gpt-image'].available && generators['nano-banana'].available) {
  notes.push('GPT 미연결. Nano Banana 로 생성하되, GPT 타깃 프롬프트가 필요하면 프로파일대로 작성해 외부에서 사용 가능.');
}

console.log(JSON.stringify({ generators, availableList, recommendedTarget, notes }, null, 2));
