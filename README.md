# Visual Asset Prompt Skill

> "이런 느낌으로 만들어줘"를, 이미지 생성 AI가 알아듣는 **정확한 프롬프트**로 바꿔주는 스킬입니다.

디자이너가 머릿속에 있는 막연한 비주얼("따뜻하고 차분한 명상 앱 일러스트")을 그대로 AI에 던지면, 매번 비율도 배경도 톤도 다른 결과가 나옵니다. 이 스킬은 그 막연함을 **세 칸짜리 틀**로 정리해, 같은 스타일을 안정적으로 반복할 수 있게 해줍니다.

이미지를 직접 그리지는 않습니다. **잘 만든 프롬프트(+빼야 할 것 목록)까지 만들어주고**, 실제 생성은 적합한 도구로 넘깁니다.

이 저장소에는 **Claude Code용**과 **Codex용** 두 버전이 함께 들어 있습니다.

---

## 1. 핵심 아이디어: 키워드를 쌓지 말고, 틀부터 짜라

대부분의 사람은 프롬프트에 형용사를 잔뜩 쌓습니다.
`멋진, 고급스러운, 미니멀, 8k, 트렌디한, 디테일한...` → AI는 오히려 헷갈려 합니다.

이 스킬은 반대로 갑니다. **3층 구조**로 정리합니다.

```
[1] FORMAT  (틀 - 먼저 못박기)   비율 · 구도 · 배경 유무 · 오브젝트 크기 · 여백
[2] LOOK    (룩 - 그 안에서 고르기)   매체 · 선 · 톤 · 색       ← 스타일 키워드는 여기 1~2개만
[3] SUBJECT (대상 - 유일하게 바뀌는 것)   무엇을 그릴 것인가
```

비유하자면:

- **FORMAT = 액자와 매트지** 입니다. 정사각인지 세로인지, 배경이 흰색인지 장면인지, 오브젝트가 가운데 작게 들어가는지. 이게 흔들리면 같은 시리즈처럼 안 보입니다. 그래서 **제일 먼저, 가장 구체적으로** 정합니다.
- **LOOK = 그림의 재료와 분위기** 입니다. "과슈로 칠한 느낌", "리소 인쇄 질감". 스타일 키워드는 **딱 1~2개만** 씁니다.
- **SUBJECT = 그 안에 들어가는 그림** 입니다. 시리즈를 만들 땐 FORMAT과 LOOK은 그대로 두고 이것만 바꿉니다.

> 한 줄 요약: **틀(FORMAT)을 못박고 → 룩(LOOK)을 1~2개로 고르고 → 대상(SUBJECT)만 바꾼다.**

---

## 2. 어떤 작업에 쓰나

- 랜딩 페이지 **히어로 그래픽**
- 블로그/강의 **썸네일**
- 앱 **온보딩 일러스트**
- 시스템 구조 **다이어그램**
- **3D 오브젝트**, 추상 **배경**, **아이콘**
- 같은 스타일로 여러 장 뽑는 **시리즈** (메뉴 일러스트, 아이콘 세트, 카드 시리즈)

특히 "감(感)으로만 설명되는" 요청과 "여러 장을 같은 톤으로" 뽑아야 할 때 강력합니다.

---

## 3. 실제로 어떻게 흘러가나 (예시 2개)

스킬은 항상 같은 순서를 밟습니다. 아래는 실제 스킬 데이터로 만든 결과입니다.

### 예시 A. 명상 앱 온보딩 일러스트 (감성형)

당신의 요청:
> "수면 앱 온보딩에 쓸 차분한 일러스트 하나 만들어줘. 밤하늘 아래 명상하는 사람."

스킬이 정리한 Asset Template:

| 칸 | 결정 |
|---|---|
| **FORMAT** | 단일 장면 / 배경 있음(밤하늘) / 4:5 세로(모바일) / 중앙 배치, 위쪽 여백 넉넉히 |
| **LOOK** | 매체 = **Gouache(과슈)** 1개 · 색 = dusty lavender + pale cream + soft grey 중간톤 · 부드러운 붓 자국 |
| **SUBJECT** | 달빛 아래 명상하는 인물 |

완성된 프롬프트 (문장으로, 키워드 나열 X):
```
A meditating figure under a moonlit night sky, soft gouache illustration with gentle
brushwork, dusty lavender and pale cream palette with soft grey mid-tones, centered with
generous negative space above, calm reassuring light. For a sleep app onboarding screen.
```

빼야 할 것 (네거티브, 스킬이 자동 도출):
```
Glitch, Glossy Surface, Neon
```
(과슈의 차분한 무광 느낌과 충돌하는 것들이 자동으로 빠집니다.)

### 예시 B. 데이터 파이프라인 다이어그램 (구조형)

당신의 요청:
> "개발자 도구 랜딩에 쓸 시스템 구조 그래픽. 데이터가 흐르는 모듈 블록들."

Asset Template:

| 칸 | 결정 |
|---|---|
| **FORMAT** | 다이어그램 / 배경 깔끔 / 16:9 / 그리드 기반 배치 / 오버레이 텍스트 여백 확보 |
| **LOOK** | **Technical Illustration + Isometric + Limited Palette** · 절제된 브랜드 색 · 깨끗한 구조선 |
| **SUBJECT** | 연결된 모듈 블록으로 표현한 데이터 파이프라인 |

완성된 프롬프트:
```
simplified data pipeline as connected modular blocks, precise technical illustration with
clean structural lines, callouts, and diagrammatic clarity, isometric projection showing
structured layers without dramatic perspective distortion, limited palette with restrained
brand colors and clear hierarchy
```

빼야 할 것:
```
Ink Bleed, Watercolor
```

> 감성형(예시 A)은 **짧은 문장**으로, 구조형(예시 B)은 **정밀한 종합**으로 쓰는 게 핵심입니다. 스킬이 알아서 모드를 맞춥니다.

---

## 4. 충돌은 스킬이 자동으로 잡아줍니다

스타일을 잘못 섞으면(예: 판화 + 유리 그라디언트) 스킬이 경고합니다. 실제 출력:

요청: `Etching(에칭) + Mesh Gradient(메시 그라디언트)`
```
violations:
  "충돌 조합이 있습니다. 한쪽을 빼거나 대안으로 교체하세요."
  → [Etching, Mesh Gradient]
```
에칭의 날카로운 판화 선과 부드러운 그라디언트는 물성이 정반대라, 디자이너가 알아채기 전에 막아줍니다.

---

## 5. 고를 수 있는 룩(LOOK)들

스타일 키워드는 **284개**가 정리돼 있습니다. 전체는 `references/index.md`에서 한 줄 설명과 함께 볼 수 있고, 대표만 추리면:

- **판화·드로잉**: Etching(에칭), Risograph(리소그래프), Woodcut(목판화), Ink Wash(수묵), Gouache(과슈), Watercolor(수채)
- **디지털 일러스트**: Flat Design(플랫), Isometric(아이소메트릭), Pixel Art(픽셀), Editorial(에디토리얼)
- **애니·카툰**: Anime, Cel Shading(셀 셰이딩), Pixar-style 3D, Comic Book
- **3D 렌더/재질**: Clay Render(클레이), Low-poly, Glass/Chrome/Frosted Glass Material
- **사진**: Studio, Analog Film(필름), Polaroid, Macro, Food Photography
- **레트로 디지털**: Synthwave, Vaporwave, Cyberpunk, Y2K
- **추상·제너러티브**: Mesh Gradient, Aurora Gradient, Particle Field, Voronoi, Topographic Lines

각 키워드는 **궁합(compatible)·상극(incompatible)** 정보를 갖고 있어, 위의 자동 충돌 검출이 가능합니다.

---

## 6. 시리즈 만들기 (메뉴 일러스트, 아이콘 세트)

같은 스타일로 여러 장을 뽑을 때가 가장 까다롭습니다. 방법은:

1. **마스터 1장 먼저** 만든다 → 마음에 들 때까지 다듬는다.
2. 그 이미지를 **레퍼런스로 고정**한다.
3. FORMAT과 LOOK은 그대로 두고 **SUBJECT만 바꿔** 나머지를 뽑는다.

이렇게 하면 비율·구도·크기·여백·톤이 흔들리지 않습니다. (스킬이 레퍼런스 + 동일 템플릿 문장을 함께 넘깁니다.)

> 단, "공정 비교 테스트"를 원할 땐 이전 결과물을 레퍼런스로 쓰지 않습니다.

---

## 7. 준비된 레시피 6종

자주 쓰는 조합은 미리 정리돼 있습니다 (`ssot/recipes.json`):

| 레시피 | 용도 |
|---|---|
| AI SaaS 히어로 그래픽 | AI SaaS 랜딩 히어로 |
| 개발자 도구 아키텍처 다이어그램 | 시스템 구조 그래픽 |
| 포트폴리오·에이전시 배경 그래픽 | 개인 브랜드 히어로 배경 |
| 크리에이티브 코딩 비주얼 | 캔버스로 움직이는 추상 그래픽 |
| 웰니스 앱 일러스트레이션 | 명상 앱 온보딩 이미지 |
| 프리미엄 테크 3D 오브젝트 | 미래적 AI 제품 오브젝트 |

---

## 8. 자주 하는 실수 (스킬이 막아주는 것들)

- ❌ 형용사 쌓기 (`멋진, 고급, 8k, 트렌디`) → ✅ 구체적 시각 사실 (`brushed aluminum, soft bounce light, matte off-white paper`)
- ❌ 콤마로 키워드 나열 → ✅ 한 장면을 문장으로 서술
- ❌ 스타일 키워드 8개 욱여넣기 → ✅ 매체·스타일 1~2개만
- ❌ 배경을 안 정함 → ✅ "흰 배경에 고립된 단일 오브젝트"인지 "장면"인지 명시
- ❌ 사용자가 정한 제약(색·비율·배경)을 AI가 멋대로 바꿈 → ✅ **명시한 건 잠그고 안 바꿈**

---

## 9. 설치 & 사용법

### Claude Code

```bash
# (A) 이 저장소 폴더에서 Claude Code 실행 → .claude/skills 자동 인식
cd visual-asset-prompt-skill
claude

# (B) 다른 프로젝트에서 쓰려면 스킬 폴더를 복사
cp -R .claude/skills/visual-asset-prompt /내프로젝트/.claude/skills/
```

호출은 자연어로:
```
이런 느낌으로 히어로 이미지 만들어줘: ...
비주얼 프롬프트 짜줘
메뉴 일러스트 시리즈 만들어줘
/visual-asset ...
```

### Codex

```bash
# Codex 스킬은 Claude 원본 폴더를 함께 읽으므로 둘 다 복사해야 합니다.
cp -R .agents/skills/vdl-visual-asset-prompt /내프로젝트/.agents/skills/
cp -R .claude/skills/visual-asset-prompt    /내프로젝트/.claude/skills/
```

호출:
```
$vdl-visual-asset-prompt 이 비주얼 아이디어를 Asset Template과 프롬프트로 만들어줘
```

> **Claude vs Codex 차이**: 동작 원리는 같습니다. 단, Codex 버전은 생성 대상이 **Codex 내장 이미지 모델(gpt-image 2.0 / 최신)** 로 고정되고 프롬프트를 GPT 5-슬롯 형식(장면 → 피사체 → 디테일 → 용도 → 제약)으로 씁니다. Claude 버전은 Nano Banana(Gemini)와 GPT를 환경에 맞춰 자동 선택합니다.

---

## 10. 폴더 구조 (개발자용)

```
.
├── .claude/skills/visual-asset-prompt/      # Claude 스킬 (모든 데이터의 원본 = SSOT)
│   ├── SKILL.md                             # 워크플로우 본문
│   ├── references/                          # 키워드 인덱스(284) · 모델 프로파일 · 의도 프레임 · 검증 규칙
│   ├── scripts/                             # detect-env · derive · nano-gen · build (.mjs)
│   └── ssot/                                # dictionary(284 키워드) · recipes(6) · validation
└── .agents/skills/vdl-visual-asset-prompt/  # Codex 스킬 (위 원본을 참조하는 얇은 래퍼)
    ├── SKILL.md
    └── agents/openai.yaml
```

> Codex 스킬은 taxonomy·궁합 데이터·네거티브 로직을 복제하지 않고 `.claude/skills/visual-asset-prompt`를 단일 출처로 참조합니다. **두 폴더는 항상 같이** 두세요. 원본이 없으면 Codex 스킬은 중단됩니다.

### 스크립트 (디자이너는 직접 실행할 필요 없음 - 스킬이 알아서 호출)

| 스크립트 | 하는 일 | 의존성 |
|---|---|---|
| `detect-env.mjs` | 지금 환경에서 어떤 생성기를 쓸 수 있는지 확인 | 없음 (Node) |
| `derive.mjs` | 키워드 충돌 검사 + 빼야 할 것(네거티브) 자동 도출 | 없음 (Node + ssot) |
| `nano-gen.mjs` | Nano Banana(Gemini)로 실제 이미지 생성 | `@google/genai`, `GEMINI_API_KEY` |
| `build.mjs` | ssot 데이터 수정 후 references 다시 생성 | `derive.mjs` |

- Node.js 18+ 필요. API 키는 환경변수나 `.env.local`에 두고, 코드에 하드코딩하지 않습니다.

---

내부용 디자인 시스템 스킬입니다. 모든 스타일 데이터의 단일 출처는 `.claude/skills/visual-asset-prompt` 입니다.
