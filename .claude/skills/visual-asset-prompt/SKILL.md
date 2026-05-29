---
name: visual-asset-prompt
description: 막연한 비주얼 의도를 생성용 프롬프트로 재구성한다. 핵심은 Asset Template, 즉 FORMAT(비율·구도·배경·오브젝트 크기·프레임·여백)을 패턴으로 먼저 고정하고, 그 안에서 LOOK(매체·선·톤·색)을 잡은 뒤, SUBJECT만 가변으로 둔다. 시리즈는 FORMAT+LOOK 을 동결하고 마스터 이미지를 레퍼런스로 고정한 채 SUBJECT 만 순회한다. 먼저 호출 환경을 조사해 가용 생성기(Nano Banana / GPT)에 맞춰 최적화한다. 사용자가 명시한 제약(배경·색·매체·비율)은 잠그고 덮어쓰지 않는다. "이런 느낌 이미지/일러스트/히어로/썸네일/다이어그램/3D/배경 만들어줘", "비주얼 프롬프트 짜줘", "메뉴 일러스트 시리즈", "/visual-asset" 류 요청에 사용. 이미지를 직접 생성하지는 않고 spec 까지 만든 뒤 적합한 생성 스킬로 인계한다.
---

# Visual Asset Prompt

막연한 의도를 **검증된 생성 프롬프트(+네거티브)**로 재구성한다. 키워드를 쌓지 않는다. 대신 적은 키워드로 채운 구체적 **Asset Template** 로 방향을 못 박는다.

## 핵심 구조: Asset Template (3층)

```
[1] FORMAT  (패턴 = 먼저 고정)   비율 · 구도 · 배경 여부 · 오브젝트 크기 · 프레임 · 여백 · 에셋 타입
[2] LOOK    (그 안에서 다이얼)   매체 · 선/해칭 · 톤 · 색 규칙        ← 키워드는 여기 1~2개만
[3] SUBJECT (유일한 가변)        무엇을 그리나
```

작업 순서: **FORMAT 패턴을 박고 → 그 안에서 LOOK 을 잡고 → SUBJECT 를 넣는다.** FORMAT 은 싸고 결정적이라 필드로 패턴화하기 좋고, LOOK 은 craft라 반복으로 다이얼한다.

## 언제 쓰나

- 히어로 / 썸네일 / 일러스트 / 다이어그램 / 3D / 추상 배경 / 아이콘 / 메뉴 일러스트가 필요할 때
- 사용자가 "이런 느낌" 같은 감각 언어만 줬을 때
- 같은 스타일로 **여러 장(시리즈)** 을 만들 때 (메뉴, 아이콘 세트, 카드 시리즈)

## 절대 규칙

1. **명시 제약 잠금.** 사용자가 배경·색·매체·비율·스타일을 명시하면 그건 확정 스펙이다. 잠그고 절대 "최적화"로 덮지 않는다. 절제·인간매체 같은 휴리스틱은 *사용자가 그 필드를 안 줬을 때만* 발동.
2. **키워드는 LOOK 의 매체·스타일 1~2개만.** 8개 스택 금지. FORMAT 은 키워드가 아니라 구체 디렉션 필드로 채운다.
3. **키워드 나열이 아니라 장면 내러티브.** 콤마로 조각을 잇지 않는다. 칭찬어(stunning/epic/8k/trending) 금지. 스타일은 구체 시각 사실(매체·질감·광학·색)로. 용도·맥락 명시. (Nano Banana·GPT 공통, 리서치 확증)
4. **에셋 타입과 배경을 명시.** "메뉴 아이템/아이콘/스팟 = 배경 없는 고립 단일 오브젝트(흰 배경, 장면·소품·그림자 금지)". "히어로/씬"과 구분. 고립형이면 네거티브에 배경·장면을 넣는다.
5. **미감 vs 구조 모드.** 미감 단일 일러스트는 인간 매체(연필·펜·잉크·과슈) 우선, 중간톤 허용, 짧게(과잉 명세 금지). 다이어그램·SVG·구조 도식은 정밀 종합이 맞다. (단 1번 잠금이 우선)

기본 태도: 모호하면 **가장 단순한 spec 을 먼저** 내고 "더 넣을까요?"로 증분.

6. **의존성 없는 작업은 병렬로.** 서로 결과를 기다릴 필요가 없는 작업은 한 번에 실행한다. 예: 0단계 환경 조사와 레퍼런스(`model-profiles.md`·`index.md`) 읽기를 동시에, 독립 파일 여러 개를 한 번에 읽기. 시리즈는 마스터 확정 **이후** 나머지 SUBJECT 생성을 병렬로 돌린다(레퍼런스·템플릿 동결 전제). 순서 의존이 있는 단계(마스터→파생, derive 재검증)만 직렬로.

## 리소스 (전부 스킬 폴더 내, 자급)

- `references/model-profiles.md` 타깃 모델별(Nano Banana / GPT) 프롬프트 프로파일 + 2026 공통 규칙. D단계 작성 기준.
- `references/index.md` 284 키워드 한 줄 요약. LOOK 매체·스타일 고를 때 참조.
- `references/intent-frame.md` 7축 의도 프레임 (필요 시).
- `references/validation-rules.md` 절제 가드·복잡도 예산.
- `ssot/dictionary.json` 풀 필드 (고른 키워드의 compatible·incompatible·implementation 조회).
- `scripts/detect-env.mjs` 환경 조사. `scripts/derive.mjs` 검증·네거티브. `scripts/nano-gen.mjs` Nano Banana 생성(레퍼런스 인자 지원). `scripts/build.mjs` SSOT 재생성.

> 호출은 프로젝트 루트 기준 `.claude/skills/visual-asset-prompt/scripts/...` 경로로 한다.

## 절차

### 0. 환경 사전 조사 (타깃 모델)

```bash
node .claude/skills/visual-asset-prompt/scripts/detect-env.mjs
```

`recommendedTarget` 을 타깃으로. 가용 0이면 프롬프트만 작성(외부 도구용 고지). `references/model-profiles.md` 의 타깃 프로파일을 D단계 기준으로 읽는다.

### A. Asset Template 채우기 (FORMAT + SUBJECT)

사용자 의도에서 **FORMAT 필드**와 **SUBJECT** 를 정한다. 부족한 것만 1~2개 질문(적응형). 사용자가 명시한 필드는 **잠근다**(규칙 1).

| FORMAT 필드 | 결정 |
|---|---|
| 에셋 타입 | 단일 오브젝트(고립) / 장면 / 패턴 / 다이어그램 |
| 배경 | 없음(순백) / 플랫컬러 / 질감종이 / 장면 |
| 비율 | 1:1 / 4:5 / 16:9 ... |
| 구도 | 중앙 / 3분할 / 살짝 3/4각 ... |
| 오브젝트 크기 | 프레임의 약 N% |
| 프레임/크롭 | 전체 / 타이트 / 여백형 |
| 여백 | 오브젝트 주변 균일 여백 |

고립형(메뉴 아이템·아이콘)이면 "배경 없음·장면 금지"를 FORMAT 에 명시한다(규칙 4).

### B. LOOK 다이얼 (매체·스타일 키워드 1~2개)

`references/index.md` 에서 **매체·스타일 키워드 1개(최대 2)** 를 고른다. 색·선·톤 규칙은 사용자 명시값을 잠그거나, 없으면 구체 디렉션으로 채운다.
- 미감이면 인간 매체 우선(규칙 5). 사용자가 특정 매체를 명시했으면 그대로(규칙 1).
- 필요 시 `references/intent-frame.md` 7축으로 의도를 정리. 단 키워드를 늘리지 않는다.

### C. 검증·네거티브 (스크립트)

고른 LOOK 키워드로 엔진을 호출해 충돌·네거티브를 받는다. (키워드가 1~2개라 derive 는 **조립자가 아니라 검증·네거티브 도구**다. `prompt`/`slots` 는 참고만.)

```bash
node .claude/skills/visual-asset-prompt/scripts/derive.mjs '["Etching"]' "<subject 영문>" medium
```

`violations` 있으면 사용자에게 알리고 교체. `negative` 는 핵심만 추려 쓴다. 고립형이면 "background, scene" 를 네거티브에 더한다.

### D. 프롬프트 작성 (타깃 모델 프로파일, 내러티브)

**FORMAT + LOOK + SUBJECT 를 한 장면 내러티브로** 쓴다. 키워드 나열 금지(규칙 3). `references/model-profiles.md` 의 타깃 프로파일 적용.
- Nano Banana: 짧은 장면 서술(미감 25~50단어). GPT: 5슬롯 구조(장면→피사체→디테일→용도→제약).
- FORMAT 의 배경·크기·여백·구도를 문장으로 명시("isolated on clean white background, centered, generous margins").

### E. 시리즈 모드 (FORMAT+LOOK 동결 + 레퍼런스 + SUBJECT 순회)

같은 스타일 여러 장이면:
1. 1번 SUBJECT 로 마스터 1장 생성 → 사용자 확인.
2. 그 이미지를 **레퍼런스로 고정**, FORMAT+LOOK 동결, SUBJECT 만 바꿔 나머지 생성.

```bash
node .claude/skills/visual-asset-prompt/scripts/nano-gen.mjs "<마스터 레퍼런스의 스타일·구도·프레임·여백 그대로, SUBJECT 만 X 로>" "<outPath>" <aspect> "<negative>" "<masterImagePath>"
```

레퍼런스 + 동일 템플릿 텍스트를 함께 써야 비율·구도·크기·여백이 흔들리지 않는다.

### F. 출력·라우팅

raster → `nano-gen.mjs`(또는 `nano-banana` 스킬). 아이소 SVG → `isometric-illustration`. 비트맵→아이소 → `bitmap-to-iso`. OG → `og-optimized`. 직접 그리지 않는다.

## 출력 형식

```markdown
## 의도 요약
## Asset Template
- FORMAT: 에셋타입 / 배경 / 비율 / 구도 / 오브젝트 크기 / 프레임 / 여백   (잠금 항목 표시)
- LOOK: 매체·스타일(키워드 1~2개) / 선·톤 / 색 규칙
- SUBJECT: (시리즈면 목록)
## 완성 프롬프트
FORMAT+LOOK+SUBJECT 를 푼 내러티브.
## 네거티브 프롬프트
derive 결과에서 핵심만.
## 출력 경로
매체 + 인계 스킬. (시리즈면 마스터→레퍼런스 순회 방식)
```

## 주의

- 사용자 명시 제약은 잠근다. 내용을 지어내지 않는다.
- 키워드는 LOOK 매체·스타일 1~2개만. FORMAT 은 구체 필드로.
- 모든 축·키워드를 채우려 하지 않는다. 비어 있어도 된다.
- em-dash(U+2014) 문자 사용 금지. 쉼표·마침표·괄호로 푼다.
