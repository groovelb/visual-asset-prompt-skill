/**
 * Nano Banana 기본 생성 스크립트 (프롬프트를 인자로 받음).
 * visual-asset-prompt 스킬 테스트용. 매번 새 스크립트를 만들지 않고 이걸 재사용한다.
 *
 * 사용법:
 *   node .claude/skills/visual-asset-prompt/scripts/nano-gen.mjs "<prompt>" "<outPath>" ["<aspectRatio>"] ["<negative>"] ["<refImage>"]
 *
 * refImage 를 주면 그 이미지를 스타일/구도 레퍼런스로 첨부한다 (시리즈 일관성: 동일 스타일·프레임·여백).
 *
 * 예:
 *   node .claude/skills/visual-asset-prompt/scripts/nano-gen.mjs "watercolor calm illustration ..." tmp/eval/nano-test/1.png 4:5 "harsh contrast, glitch"
 *   node .../nano-gen.mjs "draw a cappuccino, keep reference style" out.webp 1:1 "color" tmp/eval/nano-test/espresso-v4-traditional.webp
 *
 * key: GEMINI_API_KEY (env 또는 .env.local). 모델: gemini-3.1-flash-image-preview (Nano Banana 최신).
 * 주의: @google/genai 는 config 키 사용 (generationConfig 는 무시됨).
 */
import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..', '..'); // 스킬 scripts -> 프로젝트 루트 (.env.local, 출력 경로 기준)
const MODEL = 'gemini-3.1-flash-image-preview';

async function loadEnv() {
  try {
    const txt = await readFile(join(ROOT, '.env.local'), 'utf-8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
    }
  } catch { /* env 직접 사용 */ }
}

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

async function main() {
  await loadEnv();
  const [prompt, outPath, aspectRatio = '16:9', negative = '', refImage = ''] = process.argv.slice(2);

  if (!prompt || !outPath) {
    console.error('usage: node nano-gen.mjs "<prompt>" "<outPath>" ["<aspectRatio>"] ["<negative>"] ["<refImage>"]');
    process.exit(1);
  }
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY 가 env 에 없습니다.');
    process.exit(1);
  }

  // Nano Banana 는 별도 negative 파라미터가 없어 짧은 avoid 절로 덧붙인다 (literal 모델이라 과하지 않게)
  const text = negative ? `${prompt}\n\nAvoid: ${negative}.` : prompt;

  // refImage 가 있으면 스타일/구도 레퍼런스로 첨부 (시리즈 일관성 최강 레버)
  let contents = text;
  if (refImage) {
    const buf = await readFile(join(ROOT, refImage));
    const mimeType = MIME[extname(refImage).toLowerCase()] || 'image/webp';
    contents = [{ role: 'user', parts: [
      { inlineData: { mimeType, data: buf.toString('base64') } },
      { text },
    ] }];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log(`⏳ ${outPath}  (aspect ${aspectRatio}${refImage ? `, ref ${refImage}` : ''})`);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {                          // config 키 (generationConfig 아님)
      responseModalities: ['IMAGE'],
      temperature: 0.7,
      imageConfig: { aspectRatio, imageSize: '2K' },
    },
  });

  const candidates = response.candidates || [];
  for (const c of candidates) {
    for (const part of c.content?.parts || []) {
      if (part.inlineData?.data) {
        await mkdir(dirname(join(ROOT, outPath)), { recursive: true });
        const ext = part.inlineData.mimeType === 'image/png' ? '.png' : '.webp';
        const finalPath = extname(outPath) ? outPath : outPath + ext;
        await writeFile(join(ROOT, finalPath), Buffer.from(part.inlineData.data, 'base64'));
        console.log(`✅ saved ${finalPath}`);
        return;
      }
    }
  }
  const t = candidates[0]?.content?.parts?.find((p) => p.text)?.text;
  console.error(`⚠️ no image returned. text: ${t ? t.slice(0, 200) : '(none)'}`);
  process.exit(2);
}

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
