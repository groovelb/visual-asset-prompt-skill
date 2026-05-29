# VDL Intent Frame

버전 1의 7축 구조를 VDL과 Claude Code Skill에서 쓰기 좋게 줄인 의도 해석 프레임입니다.

## 목적

사용자의 막연한 감각 언어를 바로 그래픽 어셋 키워드로 보내지 않고, 먼저 7개의 질문으로 정리합니다.

```text
사용자 의도
→ 7축 시각 프레임
→ Core Dictionary 키워드 매핑
→ 이미지 프롬프트 / SVG / Canvas 지시문
```

## 7축 프레임

| Axis | 이름 | 핵심 질문 | 예시 |
|---:|---|---|---|
| 1 | Rendering | 어떻게 만들어진 것처럼 보여야 하는가? | Technical Illustration, Flat Vector, 3D Render |
| 2 | Perspective | 어떤 시점/공간감인가? | Flat 2D, Isometric, Orthographic, Top-down |
| 3 | Color | 색상은 어떤 규칙으로 제한되는가? | Monochrome, Duotone, Limited Palette |
| 4 | Texture | 표면은 어떤 질감을 갖는가? | Paper Grain, Grainy Gradient, Matte, Glass |
| 5 | Composition | 화면 안에서 어떻게 배치되는가? | Centered, Negative Space, Grid-Based, Asymmetric |
| 6 | Subject | 대상은 어느 정도 추상화되는가? | Realistic, Simplified, Stylized, Detailed |
| 7 | Mood | 최종 분위기를 만드는 광학/환경 요소는 무엇인가? | Crisp, Soft Light, Glow, Cinematic |

## 사용 규칙

1. 이 프레임은 최종 분류체계가 아니라 **입력 정리 도구**입니다.
2. Rendering, Perspective, Color는 거의 항상 채웁니다.
3. Texture, Composition, Mood는 결과 품질을 높이는 보정값입니다.
4. Subject는 사용자의 요청이 구체적일 때만 강하게 적용합니다.
5. SVG 출력에서는 Mood보다 Linework, Geometry, Token을 우선합니다.
6. 이미지 생성 출력에서는 Composition과 Mood를 반드시 포함합니다.

## 출력 템플릿

```json
{
  "rendering": "Technical Illustration",
  "perspective": "Isometric",
  "color": "Limited Palette",
  "texture": "Blueprint Grid Pattern",
  "composition": "Negative Space",
  "subject": "Simplified system modules",
  "mood": "Crisp"
}
```
