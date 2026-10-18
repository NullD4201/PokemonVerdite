# 버다이트 개발 진행 현황

저장소: https://github.com/NullD4201/PokemonVerdite

설치나 빌드 없이 작동하는 GitHub Pages용 정적 페이지입니다. `index.html`을 브라우저에서 바로 열면 됩니다. 외부 라이브러리, 폰트, API 호출은 없습니다.

## 내용 수정

- `index.html`: 2026-10-18 기준 전체 출시 목표, 확인 기록, 다음 확인 과제. 변경 시 확인일과 아래 판단 근거도 함께 갱신하세요.
- `styles.css`: 페이지 전체에 고정된 숲 배경, 반투명 본문, 색상과 반응형 배치.
- `app.js`: `.release-goals`의 출시 목표만 집계하고 한국어·영어 표시를 전환합니다.
- `check.cjs`: `node check.cjs`로 집계와 기본 파일을 검증합니다.
- `assets/verdite-forest.png`: 이 웹페이지용으로 생성한 숲 배경. 게임 실행 화면이 아닙니다.
- `favicon.svg`: 페이지 로고의 보석·V 형태를 재사용한 파비콘.

출시 목표의 `data-status`에는 `done`(전체 목표의 배포 기준 검증 완료), `active`(일부 구현), `planned`(구현 확인 전)를 사용합니다. 변경 시 같은 항목의 상태 문구와 검증 근거를 함께 수정하세요. 기록은 최신 항목을 위에 추가합니다.

상단 `한국어 / English` 버튼으로 표시 언어를 바꿉니다. 기본 언어는 한국어이며 새로고침하면 한국어로 돌아옵니다. 한국어 본문과 같은 요소의 `data-en` 영어 문구를 함께 편집하세요. 접근성 이름은 `data-en-label`을 사용합니다. 문서 언어·제목·버튼 선택 상태도 함께 바뀌며, 번역 API는 호출하지 않습니다. CSS·JS를 바꿔 배포할 때는 `index.html`의 파일 URL 버전도 갱신해 이전 캐시가 남지 않게 합니다.

## 전체 출시 목표와 집계 기준

분모는 문서 작성·개별 에셋·최근 작업의 개수가 아니라 **Windows 완성판 전체의 12개 출시 목표**입니다. `docs/pokefan_design.html` v1.2 (2026-10-03)의 전 지역·콘텐츠·2–4인 전용 서버·저장·품질 범위를 제품 산출물로 묶었습니다. 전투와 조작은 이후의 `Verdite/Docs/버다이트 플레이 기획서.pdf` v1.1 (2026-10-17)을 우선해 **실시간 전투**로 반영했습니다. 옛 GameProject의 환경 준비 상태나 턴제 규칙을 Verdite의 현재 구현으로 옮기지 않았습니다.

**집계: 검증 완료 0 / 전체 목표 12 = 0%, 진행 중 4, 예정 8.** 목표별 동일 비중의 충족률입니다. 부분 구현을 임의로 25%·50% 등으로 환산하지 않으며, 작업시간·전체 공수·출시까지 남은 기간의 비율이 아닙니다. 0%는 구현이 전혀 없다는 뜻이 아니라 전체 범위를 충족한 출시 목표가 아직 확인되지 않았다는 뜻입니다. 기존의 문서·에셋을 포함한 4/12 = 33% 집계는 사용하지 않습니다.

| 출시 목표 | 완료로 인정할 기준 | 현재 상태와 남은 작업 |
| --- | --- | --- |
| 탐험과 이동 | 출시 맵 전반에서 이동·카메라·상호작용·채택한 이동 능력과 경사·충돌을 검증 | 진행 중: 기본 조작·테스트맵. 전체 지도 통합 검증 전 |
| 포획·동료·파티 | 조준·투척·포획 보정·등록·파티·보관함이 실제 플레이로 연결 | 진행 중: 기본 포획만 실행 기록. 등록 함수 본문과 후속 흐름 없음 |
| 실시간 전투·지원 | 자동 출전·직접 조작·기술·회피·지원·승패·복귀와 예외 흐름 검증 | 예정: 최신 기획 단계. 멀티 일시정지 등 미정 규칙 해결 필요 |
| 성장·도감·아이템 | 레벨·경험치·진화·기술 습득·도감·가방과 확정한 육성 규칙 검증 | 예정: 구현 확인 전 |
| 전 지역 지도·연결 | 확정 MapCatalog의 모든 지역·실내·버전/시대 변형·특수 공간의 접근·충돌·복귀 검증 | 예정: 프로토타입 맵은 출시 지도 완료로 세지 않음. 전체 MapCatalog 확인 전 |
| 퀘스트·지역 모험 | 확정한 출현·NPC·퀘스트·지역 도전·해금·지역 기믹을 끝까지 플레이 가능 | 예정: 최종 콘텐츠 목록과 구현 확인 전 |
| 3D 콘텐츠·동작·음향 | 확정한 전체 종·폼·환경의 모델·리깅·동작·효과·음향·LOD 검수 | 진행 중: 통신기 에셋만 검증. 전체 수량 확정·제작 필요 |
| 메뉴·게임 UI·설정 | 타이틀·HUD·동료·가방·지도·통신 UI, 조작 설정 유지, 키보드/마우스·패드 검증 | 진행 중: 메뉴·폰트의 기존 검사 통과. 전체 게임 UI 미완성 |
| 전용 서버·멀티·통신 | 2–4인 접속, 지역별 독립 탐험, 동기화·재접속·연락 기능 검증 | 예정: 구현 확인 전 |
| 교환·소유권 | 서버 권한, 개인/공유 진행, 교환 실패·재시도·중복 요청의 소실/복제 방지 검증 | 예정: 구현·검증 전 |
| 저장·변환·복구 | 월드·플레이어 저장, 백업 복원, 버전 변환, 강제 종료·손상 복구 검증 | 예정: 동료 배열은 Transient. 메뉴 설정 저장은 별개 |
| 성능·통합·배포 | 에디터 없는 PC의 Windows 클라이언트/서버 설치·실행, 전체 플레이, 4인 장시간·성능 검증 및 설치·복구 안내 | 예정: 패키징 설정만 존재. 실행 가능한 배포판의 검증 전 |

전체 지도 범위는 기존 기획의 동결 범위(2026-10-03)를 유지합니다. 관동·성도·호연·신오·하나·칼로스·알로라·가라르·팔데아, 히스이와 기획에 포함된 리메이크·레전즈·DLC 공간/변형을 포함하며, 첫 지방만으로 100%가 되지 않습니다. 이 목록은 프로젝트의 목표를 기록한 것으로 작품의 최신 출시 현황을 새로 조사한 결과는 아닙니다. 원작 대사·이벤트의 완전한 1:1 재현, 선택 확장인 8인·Linux 서버·공개 매칭, 후원 운영과 문서 관리 체크는 기본 출시 집계에서 제외합니다.

종·폼·기술·퀘스트의 최종 수량, 전체 MapCatalog, 일부 전투·멀티 규칙은 미확정입니다. 해당 목표는 목록을 확정하고 전체 구현을 검증하기 전까지 완료로 바꿀 수 없습니다. 범위가 추가/삭제되면 이 기준과 페이지를 같은 변경에서 갱신해야 합니다. 옛 턴제 기획의 시간 추정치를 실시간 전투의 공수 가중치로 사용하지 않습니다.

## 상태 판단 근거

확인일: **2026-10-18 (한국 시간)**. 로컬 `Pokefan/Verdite`의 현재 소스, 기획서와 저장된 검사 자료를 읽었습니다. 아래 경로는 로컬 프로젝트 기준이며, 게임 원본·설정·전체 로그를 이 공개 웹 저장소에 복사하지 않습니다.

아래는 개별 작업의 근거 기록으로, **전체 진행률의 분모·분자로 직접 사용하지 않습니다.** 이 표의 완료는 해당 문서·에셋 또는 기존 검사만 확인했다는 뜻입니다. 예를 들어 메뉴 검사와 폰트가 완료여도 전체 게임 UI와 조작 검증이 남아 있으므로 상위 출시 목표는 진행 중입니다.

| 항목 | 상태 | 확인한 근거와 범위 |
| --- | --- | --- |
| 플레이 기획 v1.1 | 완료 | `Verdite/Docs/버다이트 플레이 기획서.pdf`, v1.1 / 2026-10-17. 탐험·포획·실시간 전투·지원 명령·통신기를 정의한 7쪽 문서. 밸런스와 일부 규칙은 추가 결정 대상. |
| 타이틀 메뉴와 설정 | 완료 | `Verdite/Source/Verdite/Menu/VerditeTitleWidget.cpp`, `VerditeMenuTests.cpp`; `Verdite/Saved/MenuChecks/Report1280x720/index.json`, `Report1920x1080/index.json`에서 2026-10-17 `Verdite.Menu.Flow` 각각 성공 1, 실패 0. `output/menu/visual-validation.json`의 배경 움직임·버튼 고정 검사 PASS. |
| UI 폰트 | 완료 | `Verdite/SourceArt/Fonts/VerditeSans/shaping_validation.json`, `unreal_font_validation.json`: 3가지 굵기, 한글 11,172자 NFC/NFD 조합 검사, UE 재로드 PASS. |
| 통신기 3D 에셋 | 완료 | `Verdite/SourceArt/Props/VerditeCommunicator/README.txt`, `project_validation_report.json`, `unreal_validation_report.json`: 메시·재질·정적 화면 및 UE 가져오기 검증. 실제 연락·네트워크 기능은 제외. |
| 탐험 이동과 카메라 | 진행 중 | `Verdite/Source/Verdite/Gameplay/VerditeTrainerCharacter.cpp`, `VerditeGameMode.cpp`, `VerditePlayerController.cpp`; `Content/Verdite/Input`, `Content/Verdite/Maps/L_GameplayPrototype.umap` 존재. 이동·점프·달리기·숙이기·숄더뷰·줌 코드 확인. |
| 조준과 몬스터볼 투척 | 진행 중 | 같은 `VerditeTrainerCharacter.cpp` 및 `VerditeMonsterBall.cpp`: 조준, 궤적 예측, 투척, 벽 반사와 충돌 전달 구현. `Verdite/Saved/Logs/Verdite.log`의 볼 충돌 기록 확인. |
| 기본 포획 판정 | 진행 중 | `VerditeTestPokemon.cpp`의 `CaptureChance` 판정, 성공 시 숨김·충돌 해제와 결과 이벤트. 위 실행 로그의 2026-10-18 성공·실패 기록 확인. 체력·볼 보정 및 전투 연계는 아직 없음. |
| 동료 등록과 목록 | 진행 중 | `VerditeCompanionSubsystem.h`에 등록·목록 함수 선언이 있으나 `.cpp`에 해당 함수 본문이 없음. 포획 성공 코드에서 등록 호출도 없음. |
| 실시간 전투와 지원 명령 | 예정 | 기획서 2·3·5·7쪽에 자동 출전, 쿼터뷰, 기술, 지원 UI와 복귀 흐름 정의. 현재 Gameplay 소스에서 해당 구현은 확인되지 않음. |
| 통신과 멀티플레이 | 예정 | 기획서 6·7쪽 및 통신기 README에서 실제 연락 UI·네트워크를 별도 구현 대상으로 명시. |
| 게임 저장과 불러오기 | 예정 | 동료 배열은 `Transient` 선언, SaveGame 연결은 후속 작업이라는 소스 주석. 현재 소스에서 게임 데이터 저장·복원 구현은 확인되지 않음. 메뉴 설정 저장과 구분. |
| 패키징과 게임패드 검증 | 예정 | `Verdite/Config/DefaultGame.ini`에 Menu·L_GameplayPrototype 패키징 대상 설정. 프로젝트·메뉴 README 및 캡처 검증 보고서는 게임 패키징·게임패드 미검증으로 명시. |

자료 간 차이는 현재 코드와 개별 결과를 우선했습니다. `Verdite/README.txt`의 “탐험·포획 미구현” 문구는 이후 추가된 Gameplay 코드와 일치하지 않습니다. 이전 `ReportUMG1080`에는 설정 저장 실패가 있지만, 그보다 뒤의 720p·1080p 보고서는 성공입니다. 다만 현재 메뉴 테스트는 `L_GameplayPrototype` 도착과 플레이어 소유까지 검사하도록 바뀌었으므로, 이전 성공 기록으로 최신 통합 테스트까지 통과했다고 간주하지 않았습니다. C++ 기본 목적지는 OpenWorld이며 블루프린트의 현재 목적지 값은 재실행으로 확인하지 않았습니다.

이번 작업에서는 엔진 빌드·게임 실행·블루프린트 내부 검사를 새로 수행하지 않았습니다. 소스의 존재를 완성된 플레이로 표시하지 않으며, 동료 등록 다음 단계는 현재 코드에서 도출한 확인 과제이고 확정 일정이 아닙니다.

## 배경 이미지 생성

2026-10-18 내장 ImageGen으로 새로 생성했습니다. 최종 파일은 `assets/verdite-forest.png`이며, 게임 화면 또는 실제 맵의 기록이 아닌 웹페이지용 일러스트입니다. `body::before`의 고정 레이어에서 페이지 전체 배경으로 사용하고, 본문에는 밝은 반투명 표면을 두어 긴 글을 읽을 수 있게 합니다. 상단 모듈은 이미지를 따로 반복하지 않습니다. 파비콘은 기존 페이지 로고 형태를 SVG로 재사용했습니다.

사용한 최종 프롬프트:

```text
Use case: stylized-concept
Asset type: wide website hero background for Verdite, a Korean wilderness adventure game development journal.
Primary request: create an original atmospheric forest landscape illustration, landscape aspect ratio 3:2 or wider, ideally 1536 x 1024.
Scene: a quiet mossy woodland trail curves from the lower center toward a small sunlit clearing beside a shallow emerald creek; layered broadleaf trees, ferns, smooth stones, distant hazy forest. A small cluster of natural green crystals near the creek subtly echoes the name Verdite.
Style: refined hand-painted environment concept art, soft gouache textures and cinematic spatial depth, tasteful game-world illustration, intricate but restrained, not photorealistic and not pixel art.
Composition: no people or creatures; darker low-detail foliage in the left third for white headline overlay, interesting creek and lit clearing mainly in the center; tree framing around edges. Must crop attractively for a wide 1120x430 website header as well as a narrow mobile header.
Lighting and palette: early morning golden sunlight, deep forest green and sage with muted ivory highlights; calm, hopeful, exploratory mood; controlled contrast with a quiet shadowed foreground.
Constraints: landscape only, no text, no letters, no logo, no watermark, no interface, no framed mockup. This is a website illustration, not a gameplay screenshot.
```

## GitHub Pages

이 디렉터리는 `PokemonVerdite` 저장소의 루트입니다. `index.html`, `styles.css`, `app.js`가 함께 배포되면 동작하며, 상대 경로를 사용하므로 저장소 이름이 포함된 URL에서도 작동합니다.

배포 주소: https://nulld4201.github.io/PokemonVerdite/

GitHub Pages는 `main` 브랜치의 루트(`/`)를 배포합니다. 변경 내용을 `main`에 push하면 자동으로 갱신됩니다. `.nojekyll` 파일로 Jekyll 변환 없이 정적 파일을 제공합니다.

GitHub 개발 이슈나 커밋을 자동 집계하지 않고, 위 HTML의 상태를 직접 관리합니다.
