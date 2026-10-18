# 버다이트 개발 진행 현황

저장소: https://github.com/NullD4201/PokemonVerdite

설치나 빌드 없이 작동하는 GitHub Pages용 정적 페이지입니다. `index.html`을 브라우저에서 바로 열면 됩니다. 외부 라이브러리, 폰트, API 호출은 없습니다.

## 내용 수정

- `index.html`: 2026-10-18 기준 개발 항목, 확인 기록, 다음 확인 과제. 변경 시 확인일과 아래 판단 근거도 함께 갱신하세요.
- `styles.css`: 색상, 배치와 모바일 화면.
- `app.js`: 등록된 항목에서 완료율과 상태별 개수를 자동 계산하고 한국어·영어 표시를 전환합니다.
- `check.cjs`: `node check.cjs`로 집계와 기본 파일을 검증합니다.
- `assets/verdite-forest.png`: 이 웹페이지용으로 생성한 숲 배경. 게임 실행 화면이 아닙니다.
- `favicon.svg`: 페이지 로고의 보석·V 형태를 재사용한 파비콘.

개발 항목의 `data-status`에는 `done`(완료), `active`(진행 중), `planned`(예정)을 사용합니다. 변경 시 같은 항목의 상태 문구도 함께 수정하세요. 완료율은 완료 항목 수를 전체 항목 수로 나눈 값이며, 게임 전체의 완성도나 작업량 가중치를 나타내지 않습니다. 기록은 최신 항목을 위에 추가합니다.

상단 `한국어 / English` 버튼으로 표시 언어를 바꿉니다. 기본 언어는 한국어이며 새로고침하면 한국어로 돌아옵니다. 한국어 본문과 같은 요소의 `data-en` 영어 문구를 함께 편집하세요. 접근성 이름은 `data-en-label`을 사용합니다. 문서 언어·제목·버튼 선택 상태도 함께 바뀌며, 번역 API는 호출하지 않습니다. CSS·JS를 바꿔 배포할 때는 `index.html`의 파일 URL 버전도 갱신해 이전 캐시가 남지 않게 합니다.

## 상태 판단 근거

확인일: **2026-10-18 (한국 시간)**. 로컬 `Pokefan/Verdite`의 현재 소스, 기획서와 저장된 검사 자료를 읽었습니다. 아래 경로는 로컬 프로젝트 기준이며, 게임 원본·설정·전체 로그를 이 공개 웹 저장소에 복사하지 않습니다.

완료는 해당 행에 적힌 범위의 문서·에셋 또는 기존 검사 결과를 확인했다는 뜻입니다. 진행 중은 코드 구현 또는 연결 단계, 예정은 미구현 또는 검증 전입니다. 현재 집계는 **12개 중 완료 4 / 진행 중 4 / 예정 4 = 33%**입니다. 서로 다른 크기의 작업을 같은 비중으로 세므로 게임 전체의 완성도가 아닙니다.

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

2026-10-18 내장 ImageGen으로 새로 생성했습니다. 최종 파일은 `assets/verdite-forest.png`이며, 게임 화면 또는 실제 맵의 기록이 아닌 웹페이지용 일러스트입니다. 파비콘은 새 래스터 이미지가 아니라 기존 페이지 로고 형태를 SVG로 재사용했습니다.

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
