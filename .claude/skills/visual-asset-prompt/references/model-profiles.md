# 모델별 프롬프트 프로파일 (Nano Banana / GPT, 2026 기준)

> 타깃 생성기에 따라 프롬프트 형태가 다르다. 0단계 환경 조사(`detect-env.mjs`)로 타깃을 정한 뒤, 해당 프로파일대로 E단계 프롬프트를 쓴다.
> 출처: 6개월 이내 공식 문서 + 2026 가이드 리서치 (Gemini 이미지 가이드, OpenAI Cookbook 등).

## 공통 규칙 (두 모델 합의, 항상 적용)

2026년 Nano Banana 와 GPT 가 독립적으로 같은 결론에 도달한 규칙이다. 우리 스킬의 과거 "키워드 스택" 출력은 이 규칙들과 정면 충돌하므로 반드시 따른다.

1. **키워드 나열 금지 → 장면 내러티브.** 콤마로 키워드를 잇지 말고 한 장면을 문장으로 서술한다. (두 모델 공식 안티패턴)
2. **칭찬어 금지.** stunning, epic, masterpiece, 8k, ultra-detailed, trending on artstation 류는 무효 또는 해롭다.
3. **스타일어는 구체적 시각 사실로.** "premium minimal" 대신 "brushed aluminum, 50mm feel, soft bounce light, matte off-white paper" 처럼 매체·질감·광학·색을 사실로 적는다.
4. **용도·맥락 명시.** "for an app onboarding screen", "editorial blog hero" 처럼 쓰임을 넣으면 모델이 폴리시 수준을 맞춘다.
5. **네거티브는 긍정 서술 우선.** 두 모델 다 negative 파라미터 없음. "no cars" 보다 "empty street". 꼭 제외할 핵심만 짧게 inline.
6. **과적재 금지, 반복 수정.** 한 프롬프트에 다 넣지 말고 짧은 베이스 후 단일 변경으로 다듬는다.
7. **레퍼런스 이미지가 일관성 최강 레버.** 시리즈·브랜드 일관성이 필요하면 레퍼런스를 쓰고 역할을 명시한다.

미감 단일 일러스트 추가 규칙(트러블슈팅 2026-05-27): 인간 매체(연필·펜·과슈·수채) 우선, 기계 매체(인그레이빙·해칭 강제) 회피, 중간톤 허용, 정중앙+흰여백 강제 대신 살짝 각도+그림자, 짧게.

---

## 프로파일 A: Nano Banana (gemini-3.1-flash-image-preview)

우리 `nano-gen.mjs` 의 기본 타깃. thinking 가능한 Flash 계열.

- **형태**: 한 장면을 서술하는 내러티브. 권장 골격 `[Subject] + [Action] + [Context] + [Composition] + [Lighting/Style]` 를 자연스러운 한 문장~짧은 문단으로.
- **길이**: 핵심 의도를 명확히, **과잉 명세 금지**(추론 엔진이 맥락을 메움). 미감 일러스트는 25~50단어. 구조형 다이어그램은 조금 더 길어도 됨.
- **품질 레버**: 카메라·렌즈·조명·소재 용어, `aspectRatio`/`imageSize`, 복잡 씬은 thinking_level high, 레퍼런스 역할 명시.
- **네거티브**: 파라미터 없음. 긍정 서술. `nano-gen.mjs` 는 짧은 `Avoid: ...` 절만 덧붙임(핵심 1~2개).
- **의도 강화**: 멀티턴 "X만 바꾸고 나머지 유지", "동일 비율 유지", 레퍼런스 이미지 역할 지정.
- **안티패턴**: 콤마 키워드 스택, redundant quality modifiers, strict monochrome 강제, dense hatching 강제, 25자 초과 텍스트.

예 (미감):
```
A meditating figure under a moonlit night sky, soft gouache illustration with gentle
brushwork, dusty lavender and pale cream palette with soft grey mid-tones, centered with
generous negative space above, calm reassuring light. For a sleep app onboarding screen.
```

---

## 프로파일 B: GPT (gpt-image-2)

현재 이 환경엔 미연결(OPENAI 키/SDK 없음). 연결되면 사용하거나, 외부(ChatGPT)에 붙여 쓸 프롬프트로 작성.

- **형태**: 5슬롯 구조 템플릿. `장면/배경 → 피사체 → 핵심 디테일 → 용도 → 제약`. 라벨이나 줄바꿈으로 구획해도 좋다.
- **길이**: 상세해도 좋고 **문자 그대로 읽는다**. 단 구체 사실로 채우고, 마지막 **제약 슬롯**(no watermark, preserve face, keep layout)을 반드시 넣는다(생략하면 모델이 임의로 채움).
- **품질 레버**: `quality: high`(텍스트·디테일), `size`, 레퍼런스 + `input_fidelity: high`(아이덴티티 보존), 단일 변경 반복.
- **네거티브**: 파라미터 없음. 긍정 프롬프트 안에 "no watermark", "no extra text" 처럼 구체적으로.
- **의도 강화**: 제약 슬롯에 불변 항목 명시, 멀티턴마다 핵심 재명시(드리프트 방지), 레퍼런스 역할 라벨링.
- **안티패턴**: 칭찬어 스택, 모순 스타일 결합("photorealistic cartoon"), UI 목업에 concept-art 어휘, 한 프롬프트 과적재.

예 (구조형):
```
Background: clean light studio backdrop.
Subject: a simplified data pipeline as connected modular blocks (ingestion, processing, storage).
Details: isometric view, clean monoline strokes, restrained cool-blue and neutral palette, generous spacing.
Use case: B2B data infrastructure blog hero image.
Constraints: no text labels, no logos, no photorealistic clutter, keep ample empty space for overlay text.
```

---

## 타깃 선택 규칙

1. `node .claude/skills/visual-asset-prompt/scripts/detect-env.mjs` 로 가용 생성기 확인.
2. 가용 타깃이 하나면 그 프로파일 사용.
3. 둘 다 가용이면 의도로 정함: 정밀 텍스트·구조·아이덴티티 보존이 핵심이면 GPT, 빠른 미감·장면 일러스트·멀티턴 편집이면 Nano Banana. 애매하면 사용자에게 한 번 확인.
4. 가용 타깃이 없으면(키/SDK 없음) 프롬프트는 작성하되 "외부 도구용"임을 알리고 생성은 보류.
