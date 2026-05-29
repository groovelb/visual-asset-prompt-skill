# Visual Asset 키워드 인덱스

> 선택 단계용 한 줄 요약. 풀 필드(promptFragment·compatible·incompatible·implementation)는 `.claude/skills/visual-asset-prompt/ssot/dictionary.json` 조회.
> 슬롯 정렬·네거티브는 `.claude/skills/visual-asset-prompt/scripts/derive.mjs`, positive 프롬프트 문장은 LLM 이 작성.

## Part: 기법 (어떻게 만들어진 것처럼 보이는가)

### Printmaking & Drawing · 판화·드로잉
판화나 손 드로잉처럼 찍고 그린 듯한 아날로그 제작 기법입니다. 잉크와 종이의 물성이 그대로 드러납니다.
- Etching (에칭 · Core · SVG/Image(gen)/Hybrid): 금속판 부식 판화풍. 세밀한 선과 고전적 음영
- Engraving (인그레이빙 · Core · SVG/Image(gen)): 뷰린 각인선. 정밀한 평행선 음영, 고전적 서적 삽화 느낌
- Woodcut (목판화풍 · Core · SVG/Image(gen)): 거칠고 강한 면, 굵은 선, 높은 대비의 수공예적 판화
- Linocut (리노컷 · Niche · SVG/Image(gen)): 단순화된 형태, 굵은 면 분할, 거친 수공예적 가장자리
- Lithograph (석판화풍 · Support · Image(gen)): 부드러운 톤, 손으로 그린 듯한 질감, 회화적 표면감
- Screenprint (실크스크린풍 · Core · Image(gen)/SVG): 선명한 색면, 제한된 팔레트, 포스터 같은 인쇄감
- Risograph (리소그래프풍 · Core · Image(gen)): 제한된 별색, 인쇄 어긋남, 거친 그레인, 독립 출판물 감성
- Ink Drawing (잉크 드로잉 · Core · SVG/Image(gen)): 펜이나 붓 잉크의 선명한 선과 강한 대비
- Ink Wash (수묵/잉크 워시 · Core · Image(gen)): 물에 희석된 잉크의 번짐, 농담, 흐릿한 음영. 동양화 감성
- Pencil Sketch (연필 스케치 · Support · Image(gen)): 연필 선, 밑그림, 필압이 드러나는 드로잉
- Charcoal Drawing (목탄 드로잉 · Niche · Image(gen)): 부드럽고 어두운 명암, 거친 번짐, 강한 질감
- Watercolor (수채화풍 · Support · Image(gen)): 물감의 투명도, 번짐, 물자국, 부드러운 색 겹침
- Gouache (과슈풍 · Support · Image(gen)): 불투명하고 매트한 색면, 부드러운 브러시 자국
- Collage Illustration (콜라주 일러스트 · Core · Image(gen)/Hybrid): 종이, 사진, 질감, 도형을 오려 붙인 듯한 이질적 레이어 조합
- Cut-paper Illustration (컷페이퍼 일러스트 · Core · SVG/Image(gen)): 종이를 잘라 겹친 듯한 단순한 형태, 레이어, 그림자
- Flat Vector Illustration (플랫 벡터 일러스트 · Core · SVG): 단순한 도형, 평면 색상, 명확한 윤곽의 벡터 기반 일러스트
- Cyanotype (시아노타입 · Niche · Image(gen)): 프러시안 블루 실루엣. 감광지 + 자외선 노출
- Ukiyo-e (우키요에 · Support · Image(gen)): 일본 목판 다색 인쇄. 평탄한 색면, 굵은 외곽선, 보카시 기법
- Letterpress (레터프레스 · Niche · Image(gen)): 활자/판 눌러찍기. deboss 자국, 잉크 농도 변화

### Specialized Illustration · 전문 도해
대상의 구조와 작동 원리를 정확하게 설명하는 전문 도해형 일러스트입니다. 기술·과학 문서의 명료함을 목표로 합니다.
- Technical Illustration (테크니컬 일러스트 · Scaffold · SVG/Hybrid): 대상의 구조, 부품, 작동 원리를 명확하게 설명하는 정밀한 설명형 일러스트
- Scientific Illustration (과학 일러스트 · Scaffold · Image(gen)/SVG): 생물, 물질, 자연현상을 정확하고 분석적으로 묘사하는 재현 스타일
- Botanical Illustration (식물 세밀화 · Scaffold · Image(gen)/SVG): 식물의 잎, 줄기, 꽃, 뿌리를 정확하고 세밀하게 표현
- Anatomical Illustration (해부학 일러스트 · Scaffold · Image(gen)/SVG): 인체나 생물의 내부 구조, 기관, 근육, 뼈를 분석적으로 표현
- Medical Illustration (의학 일러스트 · Niche · Image(gen)): 질병, 수술, 생리 작용을 교육적으로 설명하는 전문 일러스트
- Cartographic Illustration (지도학적 일러스트 · Scaffold · SVG): 지도, 지형, 경로, 위치 관계를 시각적으로 표현하는 지도 기반 스타일

### Digital Illustration · 디지털 일러스트
벡터와 플랫처럼 디지털 도구로 그린 현대 일러스트 양식입니다. 화면과 인쇄 모두에 깔끔하게 적용됩니다.
- Vector Illustration (벡터 일러스트 · Core · SVG): 수학적 곡선 기반. 선명한 외곽, 솔리드 채움, 무한 확대
- Flat Design (플랫 디자인 · Core · SVG/CSS): 그라데이션/그림자 없이 순수 평면 색면과 기하 형태
- Isometric Illustration (아이소메트릭 일러스트 · Core · SVG/CSS/Three.js): 30° 축측 투영. 원근 왜곡 없이 세 면 동일 비율
- Pixel Art (픽셀 아트 · Core · SVG/Canvas): 픽셀 단위 수작업. 8bit/16bit 제약, 디더링. 레트로 게임 미학
- Concept Art (컨셉 아트 · Core · Image(gen)): 영화/게임 디지털 페인팅. 시네마틱 분위기
- Editorial Illustration (에디토리얼 일러스트 · Core · Image(gen)/SVG): 아티클 삽화. 은유적, 중간 디테일 회화 터치
- Children's Book Illustration (동화 일러스트 · Core · Image(gen)): 부드러운 형태, 따뜻한 팔레트, 둥근 캐릭터
- Sticker Art (스티커 아트 · Support · SVG): 다이컷 흰색 테두리, 광택 채움. 스티커팩 미학
- Fashion Illustration (패션 일러스트 · Niche · Image(gen)): 늘씬한 비례, 제스처 중심, 의상 디테일 강조
- Geometric Illustration (기하학적 일러스트 · Support · SVG/CSS): 기본 도형 조합. 모듈러, 추상적
- Infographic (인포그래픽 · Core · SVG/Hybrid): 아이콘 + 화살표 + 타이포 + 차트. 데이터/프로세스 시각 요약
- Blueprint (블루프린트 · Support · SVG): 흰색 선 + 청색 배경. 기술 도면 양식, 치수선과 주석
- Iconography (아이콘/픽토그램 · Core · SVG): 단일 개념 단순화 기호. 유니버설 심볼, 최소 디테일 즉시 인지

### Anime & Cartoon · 애니·카툰
애니메이션과 만화 특유의 셀 음영, 캐릭터 비례, 컷 양식입니다.
- Anime (애니메이션 · Core · Image(gen)): 일본 애니메이션 양식. 큰 눈, 셀 셰이딩, 표현적 라인워크
- Manga (만화 · Core · Image(gen)): 흑백 일본 만화. 스크린톤 중간톤, 패널 그리드
- Cel Shading (셀 셰이딩 · Core · Image(gen)/Three.js): 경계 뚜렷한 2~3단계 평면 그림자. 3D에도 2D 느낌
- 90s Anime (90년대 애니메이션 · Support · Image(gen)): VHS 시대 색감, 필름 그레인. 아키라/공각기동대 무드
- Pixar-style 3D (픽사 스타일 3D · Core · Image(gen)): 양식화 CGI. 서브서피스 스킨, 과장 비율
- Classic 2D Animation (클래식 2D 애니 · Support · Image(gen)): 유려한 선, 수채화 배경, 클래식 캐릭터 비율
- Western Cartoon (서양 카툰 · Support · Image(gen)/SVG): 굵은 외곽선, 과장된 표정, 원색 팔레트
- Comic Book Art (코믹북 아트 · Core · Image(gen)): 굵은 잉크 외곽선 + 하프톤 음영 + 다이나믹 패널

### 3D Render Style · 3D 렌더
입체로 렌더링한 듯한 3D 형상 표현 방식입니다. 점토, 와이어프레임, 로우폴리 등 렌더 룩으로 나뉩니다.
- 3D Render (3D 렌더 · Core · Three.js/3D/Image(gen)): 범용 레이트레이싱 룩. 일반적 3D 광택/GI/그림자
- Clay Render (클레이 렌더 · Core · Three.js/3D/Image(gen)): 점토처럼 부드럽고 매트한 표면, 둥근 형태, 친근한 입체감
- Wireframe Render (와이어프레임 렌더 · Core · Three.js/SVG/CSS): 3D 객체의 면과 꼭짓점 구조를 선으로만 표현
- Low-poly (로우폴리 · Core · Three.js/3D/Image(gen)): 적은 폴리곤으로 구성된 각진 면과 단순화된 형태
- Isometric Render (아이소메트릭 렌더 · Support · Three.js/SVG): 3D 등각 투영 렌더링. 게임, 인포그래픽에 활용
- Voxel (복셀 · Core · Three.js/Image(gen)): 작은 정육면체 블록 단위로 형태를 구성하는 3D 픽셀 아트
- Toon Render (툰 렌더 · Core · Three.js/Image(gen)): 만화처럼 단순화된 명암, 강한 윤곽, 비현실적 색감의 3D
- Ambient Occlusion Render (앰비언트 오클루전 렌더 · Support · Three.js/3D): 접촉부와 구석의 그림자를 강조해 구조와 깊이를 드러냄
- Ray-traced Render (레이트레이스 렌더 · Support · Three.js/3D): 빛의 반사, 굴절, 그림자를 물리적으로 계산한 사실적 렌더링
- Photoreal Render (포토리얼 렌더 · Scaffold · 3D/Image(gen)): 실제 사진처럼 보이는 재질, 빛, 카메라 표현
- Claymation (클레이메이션 · Support · Image(gen)): 점토 인형 질감. 손가락 자국, 스톱모션 느낌
- Origami / Papercraft (오리가미/페이퍼크래프트 · Support · Image(gen)/Three.js): 접힌 종이 기하. 주름 그림자, 레이어 간격

### 3D Material Finish · 3D 재질
유리, 금속, 세라믹처럼 3D 표면이 빛에 반응하는 재질 마감입니다.
- Matte Finish (매트 마감 · Support · Three.js/CSS/3D): 빛 반사가 적고 부드러운 표면의 차분한 재질
- Glossy Finish (글로시 마감 · Support · Three.js/CSS/3D): 반짝이는 표면 반사와 매끄러운 재질감
- Glass Material (유리 재질 · Core · Three.js/WebGL/CSS): 투명도, 굴절, 반사, 두께감을 가진 유리 재질
- Frosted Glass Material (프로스티드 글래스 · Core · Three.js/CSS/WebGL): 반투명하고 흐릿한 유리 표면, 부드러운 내부 확산감
- Chrome Material (크롬 재질 · Core · Three.js/WebGL): 거울 같은 금속 반사와 차갑고 미래적인 표면감
- Metallic Material (금속 재질 · Core · Three.js/WebGL/CSS): 금속의 반사, 거칠기, 무게감을 표현하는 재질
- Ceramic Material (세라믹 재질 · Core · Three.js/3D): 도자기처럼 매끄럽거나 은은한 광택이 있는 단단한 표면
- Plastic Material (플라스틱 재질 · Support · Three.js/CSS): 합성수지 같은 가벼운 반사, 부드러운 색면
- Translucent Material (반투명 재질 · Core · Three.js/WebGL/CSS): 빛이 내부를 통과하는 듯한 깊이감과 반투명성
- Holographic Material (홀로그래픽 재질 · Core · Three.js/WebGL/CSS): 무지갯빛 반사와 각도에 따른 색 변화가 나타나는 미래적 표면
- Iridescent Material (이리데슨트 재질 · Core · Three.js/WebGL): 조개껍질이나 오일막처럼 각도에 따라 색이 달라지는 표면

### Photography · 사진
실제로 촬영한 사진처럼 보이는 카메라 기반 양식입니다. 스튜디오, 필름, 매크로 등 촬영 방식으로 나뉩니다.
- Studio Photography (스튜디오 포토 · Core · Image(gen)): 통제된 인공 조명, 심리스 배경, 선명. 제품 촬영
- Editorial Photography (에디토리얼 포토 · Support · Image(gen)): 매거진 스타일. 연출된 인물/라이프스타일
- Documentary Photography (다큐멘터리 포토 · Niche · Image(gen)): 연출 없는 저널리즘. 현장광, 솔직한 포착
- Street Photography (스트릿 포토 · Support · Image(gen)): 도시 캔디드. 가용광, 움직임, 일상 순간
- Fashion Photography (패션 포토 · Niche · Image(gen)): 하이키, 모델 중심, 의상 강조
- Food Photography (푸드 포토 · Support · Image(gen)): 탑다운/45°, 스타일링, 식욕 자극 조명
- Macro Photography (매크로 포토 · Support · Image(gen)): 극접사. 매우 얕은 심도, 미세 디테일 확대
- Landscape Photography (풍경 포토 · Core · Image(gen)): 넓은 풍경. 골든아워, 전경 앵커, 깊은 심도
- Analog Film (아날로그 필름 · Core · Image(gen)): 필름 그레인, 따뜻한 색 캐스트, 바랜 색감. 35mm
- Cinestill (시네스틸 · Support · Image(gen)): 시네마틱 그레인, 보케, 할레이션. 야간 필름 느낌
- Polaroid (폴라로이드 · Support · Image(gen)): 흰색 테두리, 바랜 색조, 정사각 크롭, 소프트 포커스
- B&W Photography (흑백 사진 · Core · Image(gen)): 흑백 톤. 명암과 질감만으로 구성
- Double Exposure (이중노출 · Support · Image(gen)): 두 이미지 겹쳐 투과. 실루엣 안 풍경 등 초현실
- Long Exposure (장노출 · Niche · Image(gen)): 장노출. 빛 궤적, 물 실크 표면, 움직임 흔적

### Retro-Digital · 레트로 디지털
신스웨이브, Y2K처럼 특정 시대의 디지털 미감을 재현하는 양식입니다.
- Synthwave (신스웨이브 · Core · Image(gen)/CSS/WebGL): 80년대 레트로퓨처리즘. 네온 그리드, 크롬 태양, 보라-핑크-시안
- Vaporwave (베이퍼웨이브 · Core · Image(gen)/CSS): 90년대 인터넷. 파스텔 핑크/틸, 글리치, Win95 UI
- Cyberpunk (사이버펑크 · Core · Image(gen)): 네온 디스토피아. 비, 홀로그램, 고밀도 도시
- Y2K Futurism (Y2K 퓨처리즘 · Support · Image(gen)/CSS): 반투명 크롬 블롭, 라임/실버, iMac G3 플라스틱
- Frutiger Aero (프루티거 아에로 · Support · Image(gen)/CSS): Vista/iOS6 스큐어모피즘. 광택 UI, 보케, 자연+기술
- Digital Brutalism (디지털 브루탈리즘 · Niche · CSS/Image(gen)): 콘크리트 텍스처, 로 타이포, 로파이 웹

### Abstract & Generative · 추상·제너러티브
코드로 생성하는 추상 형상과 제너러티브 패턴입니다. 그라디언트, 파티클, 필드 계열이 대표적입니다.
- Mesh Gradient (메시 그라디언트 · Core · CSS/Canvas/WebGL/Image(gen)): 여러 색상 포인트가 유기적으로 섞이며 부드러운 색면 흐름
- Aurora Gradient (오로라 그라디언트 · Core · CSS/Canvas/WebGL): 오로라처럼 흐릿하고 빛나는 색 띠가 겹치는 추상 그래픽
- Liquid Gradient (리퀴드 그라디언트 · Core · CSS/Canvas/WebGL): 액체처럼 흐르는 색상 경계와 유동적인 색 변화
- Grainy Gradient (그레이니 그라디언트 · Core · CSS/SVG Filter/Canvas): 그라디언트 위에 노이즈나 입자를 더해 질감과 깊이를 만듦
- Blob Shape (블롭 형태 · Core · CSS/SVG/Canvas): 둥글고 불규칙한 유기적 덩어리 형태
- Metaball (메타볼 · Core · Canvas/WebGL/Three.js): 여러 유기적 덩어리가 서로 합쳐지는 듯한 액체형 추상 구조
- Membrane Form (멤브레인 형태 · Support · WebGL/Three.js): 얇은 막이나 표면이 늘어나고 휘어진 듯한 유기적 구조
- Particle Field (파티클 필드 · Core · Canvas/WebGL/Three.js): 많은 입자가 공간에 분포해 흐름, 에너지, 데이터를 표현
- Point Cloud (포인트 클라우드 · Core · Canvas/WebGL/Three.js): 점들의 집합으로 형태, 공간, 데이터 구조를 표현
- Vector Field (벡터 필드 · Core · Canvas/SVG): 방향과 힘을 가진 선이나 화살표 흐름으로 보이지 않는 장을 표현
- Flow Field (플로우 필드 · Core · Canvas/WebGL): 알고리즘적 흐름을 따라 선이나 입자가 이동하는 생성형 그래픽
- Waveform (웨이브폼 · Core · SVG/Canvas/CSS): 파동, 소리, 신호, 에너지의 흐름을 선형 또는 추상 곡선으로 표현
- Orbital System (궤도 시스템 · Core · SVG/Canvas/CSS): 중심과 주변 궤도, 회전 관계를 이용해 시스템을 표현
- Radial System (방사형 시스템 · Core · SVG/Canvas): 중심에서 바깥으로 퍼지는 원형 또는 방사형 구조
- Spiral System (나선형 시스템 · Core · SVG/Canvas): 성장, 반복, 순환, 복잡성을 나선 형태로 표현
- Topographic Lines (지형 등고선 · Core · SVG/Canvas): 선의 간격과 형태로 높낮이, 흐름, 표면 구조를 표현
- Voronoi Cells (보로노이 셀 · Core · Canvas/SVG/WebGL): 점 사이의 거리 관계로 분할된 세포형 패턴
- Crystalline Structure (결정 구조 · Core · Three.js/SVG): 결정처럼 각진 면, 반복적 격자, 기하학적 성장 패턴
- Fractal Form (프랙탈 형태 · Core · Canvas/WebGL): 작은 구조가 반복되어 큰 구조를 이루는 자기유사적 패턴
- Parametric Surface (파라메트릭 표면 · Core · Three.js/WebGL): 수학적 파라미터로 생성된 곡면, 격자, 유동적 표면
- Procedural Lines (절차적 선 · Support · Canvas/SVG): 알고리즘 규칙에 따라 생성된 반복적이거나 유기적인 선

## Part: 구조 (어떤 시점과 배치로 보여주는가)

### Projection & Structural View · 시점·투영
대상을 어떤 시점과 투영으로 보여줄지 정하는 공간 표현입니다. 아이소메트릭, 정투영, 단면 등이 포함됩니다.
- Isometric (아이소메트릭 · Core · SVG/Three.js/CSS): 세 축이 동일한 비율로 보이는 등각 투영
- Axonometric (축측 투영 · Scaffold · SVG): 원근감 없이 여러 축을 기준으로 입체를 보여주는 투영 상위 범주
- Orthographic (정투영 · Core · SVG): 대상의 한 면을 왜곡 없이 평면적으로 보여주는 기술 제도식 투영
- Oblique Projection (사투영 · Support · SVG): 정면 비율을 유지하고 깊이 축을 비스듬히 표현하는 투영
- Eye Level (아이 레벨 · Core · Image(gen)): 시선 높이 정면 앵글. 친근하고 자연스러운 기본값
- Bird's Eye View (조감/탑다운 · Core · Image(gen)/SVG): 직하방/고각 시점. 전체 구조/패턴. 음식 촬영 포함
- Worm's Eye View (극저각 · Support · Image(gen)): 극저각 올려보기. 위압감, 장대함, 건축 스케일
- Aerial/Drone (항공/드론 · Support · Image(gen)): 항공 촬영 시점. 도시/자연 패턴, 넓은 스케일
- Over-the-Shoulder (어깨 너머 · Support · Image(gen)): 어깨 너머 시점. 맥락 속 피사체, 앱 사용 장면
- One-Point Perspective (1점 투시 · Support · Image(gen)): 단일 소실점. 터널, 복도의 깊이감과 집중 유도
- Flat (2D) (2D 평면 · Core · SVG/CSS): 깊이감 없는 완전 평면. 아이콘, 패턴, UI 요소 기본
- Plan View (평면도 · Core · SVG): 대상을 위에서 내려다본 도면식 시점
- Elevation View (입면도 · Support · SVG): 대상의 정면이나 측면을 수직 투영으로 보여주는 도면식 표현
- Top-down View (탑다운 뷰 · Core · SVG/Canvas): 대상을 수직으로 내려다보는 시점. 지도, 데이터 맵에 적합
- Cutaway View (컷어웨이 뷰 · Core · SVG/Hybrid): 대상의 일부를 잘라내 내부 구조를 동시에 보여주는 설명형 시각화
- Cross-section View (단면도 · Core · SVG): 대상을 특정 평면으로 절단해 내부 단면 구조를 보여주는 표현
- Exploded View (분해도 · Core · SVG/Three.js): 부품을 분리해 띄워놓음으로써 조립 구조와 관계를 보여줌
- X-ray View (엑스레이 뷰 · Core · SVG): 외부를 투과해 내부 구조가 보이는 것처럼 표현
- Transparent View (투명 뷰 · Core · SVG/CSS/Three.js): 외피나 표면을 반투명하게 처리해 내부 레이어를 드러냄
- Macro View (매크로 뷰 · Support · Image(gen)): 대상을 매우 가까이 확대해 질감, 구조, 세부 형태를 강조
- Microscopic View (현미경 뷰 · Support · Image(gen)/Canvas): 미세 구조, 세포, 입자, 재료 패턴을 현미경처럼 확대
- Topographic View (지형도식 뷰 · Core · SVG/Canvas): 등고선과 고도 정보를 중심으로 지형이나 표면 구조를 표현
- Shallow Depth of Field (얕은 심도 · Core · Image(gen)): 피사체 선명 + 배경 블러(보케). 주제 분리
- Deep Focus (딥 포커스 · Support · Image(gen)): 전경~배경 모두 선명. 정보 전달 목적
- Tilt-Shift (틸트시프트 · Niche · Image(gen)): 선택적 블러 미니어처 효과

### Diagrammatic Representation · 다이어그램
구조와 관계를 설명하기 위한 도식·다이어그램 형식입니다. 시스템, 플로우, 네트워크 등을 시각화합니다.
- Schematic Diagram (스키매틱 다이어그램 · Core · SVG/Hybrid): 구성 요소와 관계를 단순화해 보여주는 구조 중심 다이어그램
- Technical Diagram (테크니컬 다이어그램 · Scaffold · SVG/Hybrid): 기술적 대상의 구조와 원리를 설명하는 넓은 범주의 다이어그램
- Blueprint Diagram (블루프린트 다이어그램 · Core · SVG/Hybrid): 청사진처럼 치수선, 보조선, 설계선으로 구성된 설계도형 다이어그램
- System Diagram (시스템 다이어그램 · Scaffold · SVG/Hybrid): 여러 구성 요소와 상호작용을 하나의 시스템으로 보여주는 관계 그래픽
- Process Diagram (프로세스 다이어그램 · Core · SVG/Hybrid): 단계, 순서, 절차를 시각적으로 정리한 다이어그램
- Flow Diagram (플로우 다이어그램 · Core · SVG/Hybrid): 입력, 처리, 출력, 분기 등 흐름의 방향성을 표현
- Network Diagram (네트워크 다이어그램 · Core · SVG/Hybrid): 노드와 연결선으로 관계망, 연결 구조를 표현
- Node-link Diagram (노드-링크 다이어그램 · Core · SVG/Hybrid): 점과 선을 이용해 개체와 관계를 추상적으로 표현
- Circuit Diagram (회로 다이어그램 · Core · SVG/Hybrid): 전기 회로나 논리 구조를 기호와 연결선으로 표현
- Architecture Diagram (아키텍처 다이어그램 · Core · SVG/Hybrid): 소프트웨어, 서비스, 인프라 구성 요소의 구조를 보여줌
- Pipeline Diagram (파이프라인 다이어그램 · Core · SVG/Hybrid): 데이터, 작업, 생산 과정이 단계적으로 이동하는 구조
- Stack Diagram (스택 다이어그램 · Core · SVG/Hybrid): 여러 계층이나 레이어가 쌓인 구조를 표현
- Layer Diagram (레이어 다이어그램 · Core · SVG/Hybrid): 시스템, 정보, 시각 요소의 층위를 분리해 보여줌
- Component Diagram (컴포넌트 다이어그램 · Core · SVG/Hybrid): 부품, 모듈, 구성 요소의 관계와 역할을 보여줌
- Annotation Diagram (주석 다이어그램 · Core · SVG/Hybrid): 대상 주변에 라벨, 선, 설명을 붙여 세부 정보를 설명
- Measurement Diagram (측정 다이어그램 · Core · SVG/Hybrid): 치수선, 각도, 스케일, 비율을 강조해 구조를 설명
- Spec Sheet Illustration (스펙시트 일러스트 · Core · SVG/Hybrid): 제품이나 시스템의 사양을 도면과 라벨로 정리한 설명형 그래픽
- Taxonomy Map (택소노미 맵 · Support · SVG/Hybrid): 개념, 카테고리, 키워드의 분류 구조를 시각적으로 보여줌
- Constellation Diagram (별자리형 다이어그램 · Core · SVG/Hybrid): 분산된 노드가 별자리처럼 연결되어 관계와 군집을 표현

### Composition & Framing · 구도·프레이밍
화면 안에서 요소를 배치하고 잘라내는 구도 규칙입니다.
- Centered (중앙 배치 · Core · ): 피사체 프레임 정중앙. 안정감, 대칭, 포멀
- Rule of Thirds (3분할 법칙 · Core · ): 3분할 교차점 배치. 자연스러운 시선 흐름
- Asymmetric (비대칭 · Support · ): 의도적 비대칭. 긴장감, 동적, 현대적
- Diagonal (대각선 배치 · Support · ): 대각선 축 배치. 움직임, 에너지, 역동성
- Radial (방사형 배치 · Niche · ): 중심에서 방사형. 집중, 폭발, 만다라
- Negative Space (여백 · Core · ): 의도적 빈 공간. 여백이 메시지
- Tight Crop (타이트 크롭 · Support · ): 프레임까지 꽉 참. 밀도감, 임팩트
- Full Bleed (풀 블리드 · Core · ): 여백 없이 가장자리까지 확장. 몰입감
- Frame-in-Frame (프레임 인 프레임 · Support · ): 프레임 안의 프레임. 창문, 아치로 깊이와 맥락 부여
- Seamless Pattern (심리스 패턴 · Core · ): 이음새 없이 반복 타일. 배경, 텍스타일, 브랜드 패턴
- Grid-Based (그리드 기반 · Core · ): 균등 격자 안에 요소 배치. 질서, 체계
- Layered/Overlap (레이어드/겹침 · Support · ): 요소 겹쳐 쌓인 구성. 깊이감, 콜라주적 풍부함

## Part: 표면 (선·음영·색·질감·효과를 어떻게 처리하는가)

### Linework & Stroke · 선 처리
선의 굵기, 질감, 성격을 정하는 선 처리 방식입니다.
- Monoline (모노라인 · Core · SVG/CSS): 모든 선이 동일한 굵기로 유지되는 균일하고 정돈된 선
- Hairline (헤어라인 · Core · SVG): 매우 가늘고 섬세한 선으로 정밀하고 고급스러운 인상
- Outline Drawing (아웃라인 드로잉 · Core · SVG): 대상의 외곽선을 중심으로 형태를 정의하는 선 기반 표현
- Contour Line (컨투어 라인 · Core · SVG): 대상의 외곽이나 형태 흐름을 따라 구조와 부피를 암시하는 선
- Continuous Line (연속선 드로잉 · Support · SVG): 선을 거의 끊지 않고 하나의 흐름으로 대상을 그림
- Clean Vector Line (클린 벡터 라인 · Core · SVG): 벡터 기반의 매끄럽고 정제된 선. 디지털 그래픽에 적합
- Hand-drawn Line (핸드드로잉 라인 · Support · SVG/Image(gen)): 손으로 그린 듯한 불균일한 흔들림과 자연스러운 필압
- Rough Ink Line (거친 잉크 라인 · Support · SVG/Image(gen)): 잉크의 번짐, 끊김, 거친 가장자리가 드러나는 질감 있는 선
- Technical Line (테크니컬 라인 · Core · SVG): 제도, 설계, 측정에 적합한 정밀하고 기능적인 선
- Blueprint Line (블루프린트 라인 · Core · SVG/CSS): 청사진이나 설계도처럼 얇고 정밀한 보조선, 치수선 느낌
- Engraved Line (인그레이빙 라인 · Core · SVG): 판에 새긴 듯한 날카롭고 반복적인 선으로 음영과 장식성을 만듦
- Wireframe Line (와이어프레임 라인 · Core · SVG/Three.js): 3D 구조의 골격이나 면의 경계를 선만으로 표현
- Dashed Line (파선 · Support · SVG/CSS): 끊어진 선을 사용해 경로, 숨은 구조, 보조 관계를 표현
- Dotted Line (도트 라인 · Support · SVG/CSS): 작은 점들의 연속으로 선을 구성해 연결감이나 보조 정보를 표현

### Tone & Shading · 톤·음영
명암과 음영을 만드는 톤 처리 방식입니다. 해칭, 하프톤, 그라디언트 등이 있습니다.
- Hatching (해칭 · Core · ): 평행선을 반복해 명암과 밀도를 표현하는 음영 기법
- Cross-hatching (크로스해칭 · Core · ): 서로 교차하는 선을 겹쳐 깊은 음영과 질감을 만듦
- Stippling (스티플링 · Core · ): 작은 점들의 밀도 차이로 명암과 질감을 만드는 점묘 기반 음영
- Halftone Shading (하프톤 음영 · Core · ): 인쇄 망점처럼 점의 크기나 간격으로 톤을 분해해 표현
- Screentone (스크린톤 · Support · ): 만화나 인쇄물에서 쓰이는 반복 점, 선, 패턴 톤
- Dithered Shading (디더링 음영 · Core · ): 제한된 색상이나 픽셀 패턴으로 중간 톤을 만듦
- Ink Wash Shading (잉크 워시 음영 · Support · ): 묽은 잉크의 농담, 번짐, 층을 이용해 부드러운 명암
- Gradient Shading (그라디언트 음영 · Support · ): 색상이나 명도가 부드럽게 변하는 그라디언트로 입체감 표현
- Flat Fill (플랫 필 · Core · ): 음영 없이 단일 색면으로 형태를 채우는 간결한 표현
- Soft Shading (소프트 셰이딩 · Support · ): 부드러운 명암 변화와 낮은 경계감으로 입체감을 만듦
- Contour Shading (컨투어 음영 · Support · ): 형태의 굴곡을 따라가는 선이나 톤으로 구조를 표현
- Chiaroscuro (키아로스쿠로 · Niche · ): 강한 명암 대비로 극적인 깊이와 입체감을 만드는 고전적 음영

### Color Treatment · 색 운용
색을 제한하고 조정하는 색 운용 규칙입니다. 모노크롬, 듀오톤, 제한 팔레트 등으로 결과의 톤을 좌우합니다.
- Monochrome (모노크롬 · Core · ): 단일 색상 명도 변화만으로 구성. 흑백 포함
- Duotone (듀오톤 · Core · ): 2색으로 하이라이트/섀도우 분리. 모던하고 강렬
- Tritone (트리톤 · Support · ): 3색 톤 구성. Duotone보다 풍부하면서 제한적
- Limited Palette (제한 팔레트 · Core · ): 의도적 3~5색. 절제, 브랜드 일관성
- Full Color (풀 컬러 · Core · ): 제한 없는 자연 풀컬러. 사진/리얼리스틱 기본값
- Halftone (하프톤 처리 · Core · ): 인쇄 도트 패턴으로 톤 시뮬레이션. 코믹/레트로/팝아트
- Gradient Map (그라디언트 맵 · Support · ): 명도값에 색상 매핑. 브랜드 컬러 통일 기법
- Desaturated (디새추레이티드 · Support · ): 채도 낮춘 처리. 차분하고 절제된 인상
- Inverted/Negative (반전/네거티브 · Niche · ): 색상 반전. 어두운 배경 + 밝은 피사체. 실험적
- Spot Color (별색 강조 · Support · ): 모노 위에 한 색만 강조. 시선 유도, 드라마틱
- Color Grading (컬러 그레이딩 · Core · ): 영화적 색보정. 틸/오렌지, 쿨/웜 시프트 톤 통일
- Pastel (파스텔 · Core · ): 높은 명도 + 낮은 채도. 부드럽고 친근
- Neon/Vivid (네온/비비드 · Core · ): 극도로 높은 채도. 에너지, 나이트라이프, 게이밍
- Earth Tone (어스 톤 · Support · ): 갈색, 올리브, 테라코타. 자연, 오가닉, 크래프트
- Muted (뮤티드 · Support · ): 중간 채도. 탁하지만 세련. 스칸디나비안, 미니멀
- High Contrast (고대비 · Support · ): 밝은/어두운 영역 극단 대비. 강렬, 드라마틱
- Sepia/Warm Cast (세피아/웜 캐스트 · Support · ): 갈색-황금 색조. 빈티지, 노스탤지어

### Texture & Surface · 질감·표면
종이결, 필름 그레인, 노이즈처럼 표면에 얹는 질감 오버레이입니다.
- Paper Grain (종이 그레인 · Core · SVG Filter/CSS/Image(gen)): 종이 섬유와 미세한 표면 입자가 보이는 자연스러운 종이 질감
- Archival Paper Texture (아카이브 종이 질감 · Core · Image(gen)): 오래된 문서, 박물관 자료처럼 고전적인 종이 표면감
- Blueprint Paper Texture (블루프린트 종이 질감 · Core · CSS/Image(gen)): 청사진 종이처럼 기술적이고 차가운 표면 질감
- Newsprint Texture (신문지 질감 · Support · Image(gen)): 얇은 종이, 잉크 번짐, 낮은 인쇄 품질의 신문 인쇄 질감
- Risograph Grain (리소그래프 그레인 · Core · Image(gen)/SVG Filter): 리소 인쇄 특유의 거친 입자, 색 번짐, 어긋난 인쇄 질감
- Screenprint Texture (실크스크린 질감 · Core · Image(gen)): 색면이 층으로 찍힌 듯한 가장자리, 잉크 두께, 수작업 인쇄감
- Halftone Texture (하프톤 질감 · Core · SVG Filter/CSS): 인쇄 망점이 표면 전체에 드러나는 점 기반 텍스처
- Noise Texture (노이즈 텍스처 · Core · SVG Filter/CSS/Canvas): 무작위 입자나 픽셀을 더해 디지털 표면의 밋밋함을 줄이는 질감
- Film Grain (필름 그레인 · Core · CSS/SVG Filter/Image(gen)): 아날로그 필름처럼 미세한 입자와 불균일한 표면감
- Digital Noise (디지털 노이즈 · Support · CSS/SVG Filter): 디지털 랜덤 픽셀 노이즈. 균일하고 차가움
- Grain Gradient (그레인 그라디언트 · Core · CSS/SVG Filter): 그라데이션에 미세 입자. 플랫에 깊이감 추가
- Distressed/Grunge (디스트레스드/그런지 · Support · Image(gen)): 긁힘, 얼룩, 마모 흔적. 거칠고 날것
- Ink Bleed (잉크 번짐 · Core · Image(gen)/SVG Filter): 잉크가 종이에 스며들며 가장자리가 퍼지는 듯한 표현
- Ink Smudge (잉크 얼룩 · Support · Image(gen)): 손이나 도구에 의해 잉크가 문질러진 듯한 얼룩
- Embossed Surface (엠보싱 표면 · Support · CSS/SVG Filter): 표면이 위로 돌출된 듯한 입체적 압각 질감
- Debossed Surface (디보싱 표면 · Support · CSS/SVG Filter): 표면이 안쪽으로 눌린 듯한 음각 질감
- Matte Paper (매트 종이 · Core · CSS): 빛 반사가 적고 부드러운 촉감의 무광 종이 표면
- Glossy Surface (글로시 표면 · Support · CSS): 빛을 강하게 반사하는 매끄럽고 광택 있는 표면
- Misregistration (미스레지스트레이션 · Support · Image(gen)/CSS): 색판 어긋남. 리소/스크린프린트 불완전 정합
- Brushed Metal (브러시드 메탈 · Support · CSS/Image(gen)): 금속 표면을 한 방향으로 문지른 듯한 미세한 선형 질감
- Acrylic Surface (아크릴 표면 · Support · CSS): 투명하거나 반투명한 플라스틱 계열의 매끄럽고 가벼운 표면
- Marble Texture (대리석 질감 · Support · Image(gen)/CSS): 자연석의 불규칙한 결, 고급스러운 색 흐름, 단단한 표면감
- Concrete Texture (콘크리트 질감 · Support · Image(gen)/CSS): 거칠고 미세한 입자, 무채색의 산업적 표면감
- Fabric Texture (패브릭 질감 · Support · Image(gen)): 직물의 짜임, 섬유, 부드러운 표면
- Holographic Foil (홀로그래픽 포일 · Core · CSS/WebGL): 각도에 따라 무지갯빛이 변하는 얇은 금속박 같은 표면 효과
- Pearlescent Surface (진주광 표면 · Core · CSS/WebGL): 진주처럼 부드럽고 다층적인 색 반사가 나타나는 표면

### Pattern & Ornament · 패턴·장식
반복 패턴과 장식 요소입니다. 배경이나 테두리에 리듬을 부여합니다.
- Halftone Pattern (하프톤 패턴 · Core · SVG/CSS/SVG Filter): 인쇄 망점처럼 점의 크기와 간격을 반복해 톤과 장식성을 만듦
- Dot Pattern (도트 패턴 · Core · SVG/CSS/SVG Filter): 점을 반복적으로 배열해 리듬, 질감, 배경 장식을 만듦
- Line Pattern (라인 패턴 · Core · SVG/CSS/SVG Filter): 선을 반복해 방향성, 밀도, 표면 질감을 만듦
- Checker Pattern (체커 패턴 · Support · SVG/CSS/SVG Filter): 격자형 사각 패턴으로 대비와 리듬감을 만듦
- Grid Pattern (그리드 패턴 · Core · SVG/CSS/SVG Filter): 그래픽 배경이나 표면 장식으로 쓰이는 격자 패턴
- Blueprint Grid Pattern (블루프린트 그리드 패턴 · Core · SVG/CSS/SVG Filter): 설계도 배경처럼 정밀한 격자와 보조선을 가진 기술적 패턴
- Wave Pattern (웨이브 패턴 · Core · SVG/CSS/SVG Filter): 반복되는 파형 선이나 면으로 흐름과 유동성을 표현
- Topographic Pattern (지형도 패턴 · Core · SVG/CSS/SVG Filter): 등고선이 반복되어 지형, 데이터, 표면의 흐름을 암시
- Hatch Pattern (해치 패턴 · Core · SVG/CSS/SVG Filter): 평행선 또는 교차선을 반복해 밀도와 음영감을 만듦
- Circuit Pattern (회로 패턴 · Core · SVG/CSS/SVG Filter): 회로 기판처럼 선과 노드가 반복되는 기술적 장식 패턴
- Pixel Pattern (픽셀 패턴 · Core · SVG/CSS/SVG Filter): 작은 사각 픽셀 단위가 반복되어 디지털 질감이나 레트로 감성을 만듦
- Guilloche Pattern (기요셰 패턴 · Core · SVG/CSS/SVG Filter): 지폐나 보안 인쇄물처럼 정교한 곡선이 반복되는 장식 패턴
- Moiré Pattern (무아레 패턴 · Core · SVG/CSS/SVG Filter): 두 패턴이 겹치며 생기는 간섭 무늬로 광학적 긴장감을 만듦
- Ornamental Border (장식 테두리 · Niche · SVG/CSS/SVG Filter): 이미지나 영역의 가장자리를 장식하는 반복적 프레임 그래픽
- Corner Ornament (코너 장식 · Niche · SVG/CSS/SVG Filter): 프레임이나 박스의 모서리에 배치되는 장식 그래픽 요소
- Divider Ornament (디바이더 장식 · Niche · SVG/CSS/SVG Filter): 콘텐츠나 영역 사이를 나누는 장식적 구분선 그래픽

### Optical Effect · 광학 효과
글로우, 글리치, 굴절처럼 빛과 렌즈를 흉내 내는 후처리 효과입니다.
- Glow (글로우 · Core · CSS/SVG Filter/Canvas): 빛이 주변으로 퍼지는 듯한 발광 효과
- Bloom (블룸 · Support · CSS/Canvas/WebGL): 강한 빛이 화면에서 번져 밝은 영역이 부드럽게 확산
- Blur (블러 · Support · CSS/SVG Filter): 형태를 흐리게 만들어 깊이감, 속도감, 비초점 효과
- Lens Flare (렌즈 플레어 · Niche · Canvas/Image(gen)): 카메라 렌즈에 강한 빛이 들어올 때 생기는 빛 번짐
- Chromatic Aberration (색수차 · Core · CSS/SVG Filter/Canvas): RGB 색상이 살짝 어긋나며 렌즈 왜곡이나 디지털 감각을 만듦
- RGB Split (RGB 분리 · Core · CSS/Canvas): 빨강, 초록, 파랑 채널을 분리해 글리치나 전자적 왜곡
- Scanline (스캔라인 · Core · CSS/SVG Filter): CRT나 오래된 디스플레이처럼 수평선이 반복되는 화면 질감
- Glitch (글리치 · Core · CSS/Canvas/SVG Filter): 디지털 오류, 깨짐, 왜곡, 노이즈를 의도적으로 표현
- Liquid Distortion (리퀴드 왜곡 · Core · WebGL/Canvas/SVG Filter): 이미지가 액체 표면을 통과한 듯 휘어지고 흐르는 효과
- Noise Displacement (노이즈 디스플레이스먼트 · Core · WebGL/Canvas/SVG Filter): 무작위 노이즈 값을 이용해 이미지나 선을 변형시키는 왜곡
- Refraction (굴절 · Core · WebGL/Three.js): 빛이 유리나 액체를 통과하며 뒤의 이미지가 휘어져 보이는 효과
- Caustics (카스틱스 · Niche · WebGL/Three.js): 물이나 유리 표면을 통과한 빛이 밝은 곡선 패턴으로 맺히는 광학 효과

### Subject Treatment · 대상 처리
대상을 얼마나 사실적으로 또는 추상적으로 다룰지 정하는 추상화 정도입니다.
- Realistic (사실적 · Core · ): 현실 그대로. 디테일, 질감, 비례 모두 실물
- Stylized (양식화 · Core · ): 현실 기반 과장/단순화. 캐릭터 일러스트, 마스코트
- Simplified (단순화 · Core · ): 핵심 형태만 남김. 아이콘, 인포그래픽 요소
- Geometric/Abstract (기하/추상 · Core · ): 기하 형태로 환원. 원, 삼각형, 사각형 조합
- Silhouette (실루엣 · Core · ): 외곽만 남긴 단색 형태. 최대 단순화
- Outline/Stroke-only (외곽선만 · Support · ): 외곽선만으로 형태. 내부 빈 상태
- Detailed (정교한/장식적 · Support · ): 장식적 디테일 풍부. 패턴, 문양
- Chibi (치비/SD · Support · ): 과장 비율 (머리:몸 1:1~2). 극단적 귀여움

### Mood & Atmosphere · 빛·분위기
빛과 환경 요소로 최종 분위기를 만드는 처리입니다. 소프트 라이트, 골든 아워, 네온 글로우 등이 있습니다.
- Soft Light (소프트 라이트 · Core · ): 부드럽고 확산된 광원. 그림자 옅음. 편안한 인상
- Hard Light (하드 라이트 · Support · ): 강한 직사광. 선명한 그림자. 드라마틱
- Backlit/Rim Light (백라이트/림 라이트 · Support · ): 피사체 뒤 광원. 실루엣 가장자리 빛남. 극적 분리
- Golden Hour (골든아워 · Core · ): 일출/일몰 따뜻한 황금빛. 가장 따뜻한 자연광
- Blue Hour (블루아워 · Support · ): 일출 직전/일몰 직후 차가운 청색. 고요, 멜랑콜리
- Neon Glow (네온 글로우 · Core · ): 인공 네온 광원. 도시 야경, 나이트라이프
- Foggy/Hazy (안개/연무 · Support · ): 안개/연무. 원경 흐릿. 몽환적, 신비
- Crisp/Clean (크리스프/클린 · Core · ): 대기 효과 없는 선명. 깨끗하고 명료. UI 기본
- Bokeh (보케 · Core · ): 초점 밖 빛 원형 산란. 로맨틱, 축제, 나이트
- Cottagecore (코티지코어 · Support · ): 전원 로맨틱. 리넨, 들꽃, 베이킹, 자연광
- Dark Academia (다크 아카데미아 · Support · ): 트위드, 고서, 촛불, 가을 톤. 학구적 고전주의
- Liminal Space (리미널 스페이스 · Support · ): 빈 형광등 공간, 전이 공간의 언캐니 고요
- Solarpunk (솔라펑크 · Support · ): 녹색 유토피아. 아르누보 곡선 + 식물 건축 + 재생에너지
