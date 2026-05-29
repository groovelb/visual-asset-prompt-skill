# 검증 규칙 (절제 가드)

## 원칙
- Core style은 1~2개만 선택하고, 나머지는 modifier로 제한한다.
- 사용자 의도는 먼저 7축 프레임으로 정리한 뒤, 실제 어셋 키워드로 매핑한다.
- 시각 결과와 직접 연결되지 않는 분위기 단어는 promptContext로 낮춘다.
- 이미지 생성용 프롬프트와 SVG/Canvas 구현 지시문은 같은 키워드를 쓰더라도 출력 형식을 분리한다.
- 오버엔지니어링 방지를 위해 MVP에서는 Core 키워드 30~50개와 레시피 10개로 시작한다.

## 복잡도 예산 (키워드 상한)
- low: 최대 5개 (아이콘, 빈 상태, 단순 패턴)
- medium: 최대 8개 (히어로 그래픽, 다이어그램, 썸네일)
- high: 최대 12개 (복합 시스템 구조, 3D/Canvas 인터랙션)

## 글로벌 충돌 규칙
- [Hairline, Measurement Diagram] 이면 [Heavy Blur, Heavy Glow] 피함: 정밀 선과 측정 정보가 흐려져 읽기 어려움
- [Engraving, Hatching] 이면 [Glass Material, Mesh Gradient] 피함: 판화적 선 음영과 유리/그라디언트 물성이 충돌
- [SVG Linework] 이면 [Photoreal Render, Complex Material] 피함: 벡터 선화 구현과 사진/재질 중심 표현은 목표가 다름
- [Canvas, Particle Field] 이면 [High Density, Many Colors] 피함: 성능과 UI 가독성 저하
- [Wellness, Soft Light] 이면 [Glitch, Cyberpunk, Hard Light] 피함: 차분한 톤과 공격적인 오류/네온 미학이 충돌

## 출력별 점검
- imagePrompt: 구도와 무드가 포함되어 있는가 / negative prompt가 있는가 / 브랜드 톤과 제품 맥락이 반영되어 있는가
- svg: stroke/fill 규칙이 명확한가 / viewBox와 반응형 조건이 있는가 / CSS 변수나 토큰 연결이 가능한가
- canvas: 입자 수/밀도/속도 같은 성능 조건이 있는가 / UI 위에 얹었을 때 방해되지 않는가 / 정지 상태 fallback이 있는가
