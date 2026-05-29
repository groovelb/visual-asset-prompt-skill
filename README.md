# Visual Asset Prompt Skill

막연한 비주얼 의도("이런 느낌으로 만들어줘")를 **검증된 생성용 프롬프트 스펙**으로 재구성하는 스킬입니다. 키워드를 쌓지 않고, `FORMAT`(비율·구도·배경·크기·프레임·여백)을 먼저 고정한 뒤 `LOOK`(매체·선·톤·색) 키워드를 1~2개만 얹고 `SUBJECT`만 가변으로 둡니다. 이미지를 직접 생성하지 않고 **스펙까지 만든 뒤 적합한 생성기로 인계**합니다.

이 저장소는 **Claude Code용**과 **Codex용** 두 가지 형태를 함께 담고 있습니다.

## 핵심 모델: Asset Template (3층)

```
[1] FORMAT  (패턴 = 먼저 고정)   비율 · 구도 · 배경 여부 · 오브젝트 크기 · 프레임 · 여백 · 에셋 타입
[2] LOOK    (그 안에서 다이얼)   매체 · 선/해칭 · 톤 · 색 규칙        ← 키워드는 여기 1~2개만
[3] SUBJECT (유일한 가변)        무엇을 그리나
```

시리즈는 `FORMAT + LOOK`을 동결하고 마스터 이미지를 레퍼런스로 고정한 채 `SUBJECT`만 순회합니다.

## 디렉토리 구조

```
.
├── .claude/skills/visual-asset-prompt/      # Claude Code 스킬 (원본 SSOT)
│   ├── SKILL.md
│   ├── references/                          # 모델 프로파일 · 키워드 인덱스 · 의도 프레임 · 검증 규칙
│   ├── scripts/                             # detect-env · derive · nano-gen · build (.mjs)
│   └── ssot/                                # dictionary · validation · recipes (단일 데이터 출처)
└── .agents/skills/vdl-visual-asset-prompt/  # Codex 스킬 (얇은 래퍼)
    ├── SKILL.md
    └── agents/openai.yaml
```

> **두 스킬의 관계**: Codex 스킬은 taxonomy·compatibility·negative 로직을 복제하지 않고 `.claude/skills/visual-asset-prompt`를 **단일 출처(SSOT)** 로 참조합니다. 그래서 두 스킬은 같은 디렉토리 구조 안에 함께 있어야 하며, **이 저장소 루트에서** 명령을 실행해야 경로가 맞습니다.

## 차이점 (Claude vs Codex)

| | Claude 스킬 | Codex 스킬 |
|---|---|---|
| 이름 | `visual-asset-prompt` | `vdl-visual-asset-prompt` |
| 성격 | 원본 SSOT (스크립트·레퍼런스·데이터 보유) | 얇은 래퍼 (원본 참조) |
| 타깃 생성기 | Nano Banana(Gemini) / GPT image 자동 선택 | **Codex 내장 이미지 모델(gpt-image 2.0 / 최신)만** |
| 언어 | 한국어 | 영어 |

공통 원칙: 사용자 명시 제약 잠금, 키워드 1~2개만, 내러티브(콤마 나열·칭찬어 금지), **의존성 없는 작업은 병렬 실행**, em-dash(U+2014) 사용 금지.

---

## 사용법 — Claude Code

### 설치

스킬은 프로젝트 단위 또는 사용자 단위로 인식됩니다. 둘 중 하나를 선택하세요.

```bash
# (A) 이 저장소 루트에서 Claude Code를 실행 → .claude/skills 가 자동 인식됨
cd visual-asset-prompt-skill
claude

# (B) 다른 프로젝트에서 쓰려면 스킬 폴더를 복사
cp -R .claude/skills/visual-asset-prompt /경로/내프로젝트/.claude/skills/
```

### 호출

자연어 또는 슬래시로 트리거됩니다.

```
이런 느낌으로 히어로 이미지 만들어줘: ...
비주얼 프롬프트 짜줘
메뉴 일러스트 시리즈 만들어줘
/visual-asset ...
```

스킬은 다음 순서로 동작합니다.

1. **환경 조사** — 가용 생성기 탐지
   ```bash
   node .claude/skills/visual-asset-prompt/scripts/detect-env.mjs
   ```
2. **Asset Template 작성** — FORMAT + SUBJECT 확정 (명시 제약은 잠금)
3. **LOOK 다이얼** — `references/index.md`에서 매체·스타일 키워드 1~2개 선택
4. **검증·네거티브 도출**
   ```bash
   node .claude/skills/visual-asset-prompt/scripts/derive.mjs '["Etching"]' "<영문 subject>" medium
   # -> { prompt, negative, slots, violations } JSON
   ```
5. **프롬프트 작성** — 타깃 모델 프로파일(`references/model-profiles.md`)에 맞춘 장면 내러티브
6. **출력·라우팅** — raster는 `nano-gen.mjs` 또는 생성 스킬로 인계

### Nano Banana로 직접 생성 (선택)

```bash
# GEMINI_API_KEY 필요 (env 또는 .env.local)
node .claude/skills/visual-asset-prompt/scripts/nano-gen.mjs "<prompt>" "<outPath>" [aspect] [negative] [refImage]
```

---

## 사용법 — Codex

### 설치

```bash
# (A) 이 저장소를 Codex 작업 디렉토리로 사용 → .agents/skills 인식
# (B) 다른 Codex 프로젝트에 복사 (Claude 원본 폴더도 함께 복사해야 함)
cp -R .agents/skills/vdl-visual-asset-prompt /경로/내프로젝트/.agents/skills/
cp -R .claude/skills/visual-asset-prompt    /경로/내프로젝트/.claude/skills/
```

> Codex 스킬은 `.claude/skills/visual-asset-prompt`의 레퍼런스·데이터를 읽어 동작합니다. **원본 폴더가 없으면 스킬이 중단**되므로 두 폴더를 항상 함께 두세요.

### 호출

```
$vdl-visual-asset-prompt 이 비주얼 아이디어를 생성용 Asset Template과 프롬프트로 만들어줘
```

### 동작 (Codex 전용 차이)

- **타깃 생성기는 Codex 내장 이미지 모델(gpt-image 2.0 / 최신)로 고정**됩니다. Nano Banana를 타깃하지 않으며, `detect-env.mjs` / `GEMINI_API_KEY` / `nano-gen.mjs`에 의존하지 않습니다.
- 프롬프트는 **GPT image 프로파일(5-슬롯: 장면 → 피사체 → 디테일 → 용도 → 제약)** 로 작성합니다. 마지막 **제약 슬롯**을 반드시 포함합니다.
- raster 생성은 Codex 내장 이미지 생성기에서 직접 수행합니다. 아이소 SVG·OG 등은 해당 VDL 스킬로 라우팅합니다.
- 검증·네거티브는 공유 엔진을 그대로 사용합니다.
  ```bash
  node .claude/skills/visual-asset-prompt/scripts/derive.mjs '["Risograph"]' "article and course thumbnail" medium
  ```

---

## 스크립트 & 의존성

| 스크립트 | 용도 | 외부 의존성 |
|---|---|---|
| `detect-env.mjs` | 가용 생성기 탐지 | 없음 (Node 내장) |
| `derive.mjs` | 슬롯 분류 · 검증 · 네거티브 도출 | 없음 (Node 내장 + ssot JSON) |
| `nano-gen.mjs` | Nano Banana(Gemini) 이미지 생성 | `@google/genai`, `GEMINI_API_KEY` |
| `build.mjs` | SSOT 수정 후 references 재생성 | `derive.mjs` |

- 런타임: **Node.js 18+** (ES modules `.mjs`).
- API 키는 코드에 하드코딩하지 말고 환경변수 또는 `.env.local`에 둡니다.
- `build.mjs`는 SSOT(`ssot/*.json`)를 고친 뒤에만 실행하세요. references를 다시 생성합니다.

## 라이선스 / 출처

내부용 디자인 시스템 스킬입니다. Asset Template 모델과 SSOT는 `.claude/skills/visual-asset-prompt`가 단일 출처입니다.
