# 버다이트 개발 진행 현황

저장소: https://github.com/NullD4201/PokemonVerdite

설치나 빌드 없이 작동하는 GitHub Pages용 정적 페이지입니다. `index.html`을 브라우저에서 바로 열면 됩니다. 외부 라이브러리, 폰트, API 호출은 없습니다.

## 내용 수정

- `index.html`: 2026-10-18 기준 전체 출시 목표, 확인 기록, 다음 확인 과제. 변경 시 확인일과 아래 판단 근거도 함께 갱신하세요.
- `styles.css`: 페이지 전체에 고정된 숲 배경, 반투명 본문, 색상과 반응형 배치.
- `app.js`: 세부 작업의 비중과 단계를 집계하고 영역별 진행률, 한영 표시, 다크모드를 처리합니다.
- `check.cjs`: `node check.cjs`로 집계와 기본 파일을 검증합니다.
- `assets/verdite-forest.png`: 이 웹페이지용으로 생성한 숲 배경. 게임 실행 화면이 아닙니다.
- `favicon.svg`: 페이지 로고의 보석·V 형태를 재사용한 파비콘.

`.subtasks` 안의 세부 작업에서 `data-weight`는 전체 1,000점 중 계획 비중, `data-stage`는 `planned`(예정·0%), `implemented`(구현 확인·50%), `verified`(해당 작업 검증 완료·100%)입니다. 실제 구현과 그 구현의 검증을 각각 반 단계로 반영합니다. 선언·문서만 있으면 `planned`입니다. 변경 시 표시 단계·근거·이 문서의 집계도 함께 수정하세요. 상위 영역의 진행률과 상태는 세부 작업으로 자동 계산하며 HTML의 초기 상태 문구도 맞춥니다. 기록은 최신 항목을 위에 추가합니다.

상단 `한국어 / English` 버튼으로 표시 언어를 바꿉니다. 기본 언어는 한국어이며 새로고침하면 한국어로 돌아옵니다. 한국어 본문과 같은 요소의 `data-en` 영어 문구를 함께 편집하세요. 접근성 이름은 `data-en-label`을 사용합니다. 문서 언어·제목·버튼 선택 상태도 함께 바뀌며, 번역 API는 호출하지 않습니다. CSS·JS를 바꿔 배포할 때는 `index.html`의 파일 URL 버전도 갱신해 이전 캐시가 남지 않게 합니다.

상단 `다크모드 / Dark mode` 버튼으로 테마를 전환합니다. 첫 방문은 시스템 테마를 따르고, 명시적으로 선택한 테마는 `localStorage`의 `verdite-theme`에 저장해 다음 방문에 적용합니다. 저장이 차단되면 현재 화면 전환은 작동하고 재방문 시 시스템 테마를 사용합니다. 초기 테마는 본문을 그리기 전에 적용합니다.

## 전체 출시 목표와 집계 기준

분모는 **Windows 완성판 전체 12개 영역을 나눈 83개 세부 작업의 계획 비중 1,000점**입니다. 완료된 작업만으로 분모를 줄이지 않으며, 아직 만들지 않은 전 지역·콘텐츠도 유지합니다. `docs/pokefan_design.html` v1.2 (2026-10-03)의 전 지역·콘텐츠·2–4인 전용 서버·저장·품질 범위를 제품 산출물로 묶었습니다. 전투와 조작은 이후의 `Verdite/Docs/버다이트 플레이 기획서.pdf` v1.1 (2026-10-17)을 우선해 **실시간 전투**로 반영했습니다. 옛 GameProject의 환경 준비 상태나 턴제 규칙을 Verdite의 현재 구현으로 옮기지 않았습니다.

**집계: 반영 55 / 계획 1,000점 = 5.5%. 세부 작업 83개 중 검증 완료 10, 구현 확인 15, 예정 58.** 큰 영역이 끝나지 않아도 작은 작업의 구현·검증이 즉시 반영됩니다. 기획서 작성, 함수 선언, 소스가 없는 추측은 진행 점수를 주지 않습니다. 기존 0/12 목표 집계와 문서·에셋을 포함한 4/12 집계는 사용하지 않습니다.

- 전체 진행률 = `Σ(작업 비중 × 단계 반영률) ÷ Σ(작업 비중) × 100`
- 영역 진행률 = 같은 계산을 해당 영역의 세부 작업에만 적용
- 구현 확인 50%, 검증 완료 100%는 페이지의 **고정 집계 규칙**이며, 실제 작업시간의 절반을 썼다는 뜻이 아닙니다.
- 비중은 이번 세분화에서 정한 **초기 계획값**입니다. 지도·전체 3D 콘텐츠의 큰 제작 범위를 남겨 두고 단일 에셋·메뉴 작업은 작은 비중으로 둡니다. 실측 공수나 확정 일정에 기반한 값이 아니므로 화면에도 ‘추정’으로 표시합니다.
- 영역별 세부 작업과 비중·상태·근거는 페이지에서 펼쳐 볼 수 있습니다. 표시값은 소수 첫째 자리로 반올림하되, 미완료 작업이 있으면 100%로 반올림하지 않습니다.

| 영역 | 계획 비중 | 반영 점수 | 영역 진행률 |
| --- | ---: | ---: | ---: |
| 탐험과 이동 | 40 | 5 | 12.5% |
| 포획·동료·파티 | 40 | 19 | 47.5% |
| 실시간 전투·지원 | 100 | 6.5 | 6.5% |
| 성장·도감·아이템 | 60 | 0 | 0% |
| 전 지역 지도·연결 | 300 | 1 | 0.3% |
| 퀘스트·지역 모험 | 100 | 0 | 0% |
| 3D 콘텐츠·동작·음향 | 180 | 1 | 0.6% |
| 메뉴·게임 UI·설정 | 40 | 13 | 32.5% |
| 전용 서버·멀티·통신 | 50 | 0 | 0% |
| 교환·소유권 | 20 | 0 | 0% |
| 저장·변환·복구 | 40 | 8.5 | 21.3% |
| 성능·통합·배포 | 30 | 1 | 3.3% |
| **전체** | **1,000** | **55** | **5.5%** |

현재 반영분은 탐험 5 + 포획·동료 19 + 전투 조작 기반 6.5 + 테스트맵 1 + 통신기 에셋 1 + UI 13 + 동료 저장 8.5 + 패키징 설정 1 = **55점**입니다. 동료 등록·기본 소환·슬롯 저장/로드·초기화는 저장된 실행 기록을 해당 범위에만 반영했습니다. 직접 조작·카메라·복귀와 저장 실패 방어는 코드 확인 단계로 50%만 반영합니다.

동료·전투·UI·저장 묶음을 더 작은 작업으로 나눴으며 **12개 영역의 비중과 전체 1,000점은 그대로 유지**했습니다. 예를 들어 자동 출전·쿼터뷰·직접 조작 15점은 수동 조작 3점, 이동 3점, 카메라 4점, 자동 출전 5점으로 나눴습니다. 앞의 세 항목만 구현 확인이므로 5점을 반영하고, 자동 출전은 0점입니다. 기본 소환은 필드 동료 등장만 검증하며 파티 편성·보관함이나 자동 전투 완료를 뜻하지 않습니다.

아래는 각 영역의 최종 범위입니다. 이 조건을 전부 충족하기 전에도 위 세부 작업 진행분이 반영됩니다.

| 출시 영역 | 최종 완료 기준 | 현재 상태와 남은 작업 |
| --- | --- | --- |
| 탐험과 이동 | 출시 맵 전반에서 이동·카메라·상호작용·채택한 이동 능력과 경사·충돌을 검증 | 진행 중: 기본 조작·테스트맵. 전체 지도 통합 검증 전 |
| 포획·동료·파티 | 조준·투척·포획 보정·등록·파티·보관함이 실제 플레이로 연결 | 진행 중: 포획·등록·저장·기본 소환 실행 기록. 보정·파티 편성·보관함과 전체 흐름 검증은 남음 |
| 실시간 전투·지원 | 자동 출전·직접 조작·기술·회피·지원·승패·복귀와 예외 흐름 검증 | 진행 중: 수동 동료 조작·이동·카메라·복귀 구현. 자동 출전·기술·지원은 예정이며 멀티 일시정지 규칙도 미정 |
| 성장·도감·아이템 | 레벨·경험치·진화·기술 습득·도감·가방과 확정한 육성 규칙 검증 | 예정: 구현 확인 전 |
| 전 지역 지도·연결 | 확정 MapCatalog의 모든 지역·실내·버전/시대 변형·특수 공간의 접근·충돌·복귀 검증 | 진행 중: 테스트맵 준비만 반영. 출시 지도·전체 MapCatalog 확인 전 |
| 퀘스트·지역 모험 | 확정한 출현·NPC·퀘스트·지역 도전·해금·지역 기믹을 끝까지 플레이 가능 | 예정: 최종 콘텐츠 목록과 구현 확인 전 |
| 3D 콘텐츠·동작·음향 | 확정한 전체 종·폼·환경의 모델·리깅·동작·효과·음향·LOD 검수 | 진행 중: 통신기 에셋만 검증. 전체 수량 확정·제작 필요 |
| 메뉴·게임 UI·설정 | 타이틀·HUD·동료·가방·지도·통신 UI, 조작 설정 유지, 키보드/마우스·패드 검증 | 진행 중: 메뉴·폰트의 기존 검사 통과, 동료 목록 데이터·변경 알림 구현. 위젯 내부·선택 연결 미검증 |
| 전용 서버·멀티·통신 | 2–4인 접속, 지역별 독립 탐험, 동기화·재접속·연락 기능 검증 | 예정: 구현 확인 전 |
| 교환·소유권 | 서버 권한, 개인/공유 진행, 교환 실패·재시도·중복 요청의 소실/복제 방지 검증 | 예정: 구현·검증 전 |
| 저장·변환·복구 | 월드·플레이어 저장, 백업 복원, 버전 변환, 강제 종료·손상 복구 검증 | 진행 중: 동료 슬롯 저장·로드·초기화 기록. 월드·위치·성장 저장, 백업·변환·실패 복구는 남음 |
| 성능·통합·배포 | 에디터 없는 PC의 Windows 클라이언트/서버 설치·실행, 전체 플레이, 4인 장시간·성능 검증 및 설치·복구 안내 | 진행 중: 패키징 설정만 반영. 실행 가능한 배포판의 검증 전 |

전체 지도 범위는 기존 기획의 동결 범위(2026-10-03)를 유지합니다. 관동·성도·호연·신오·하나·칼로스·알로라·가라르·팔데아, 히스이와 기획에 포함된 리메이크·레전즈·DLC 공간/변형을 포함하며, 첫 지방만으로 100%가 되지 않습니다. 이 목록은 프로젝트의 목표를 기록한 것으로 작품의 최신 출시 현황을 새로 조사한 결과는 아닙니다. 원작 대사·이벤트의 완전한 1:1 재현, 선택 확장인 8인·Linux 서버·공개 매칭, 후원 운영과 문서 관리 체크는 기본 출시 집계에서 제외합니다.

종·폼·기술·퀘스트의 최종 수량, 전체 MapCatalog, 일부 전투·멀티 규칙은 미확정입니다. 미정 콘텐츠는 예정 상태의 잔여 범위 묶음으로 남겼습니다. 목록 확정 시 기존 묶음의 비중을 유지한 채 맵·종·퀘스트별 작업으로 쪼개고, 구현·검증되는 즉시 반영해야 합니다. **작업을 나눴다는 이유만으로 분모나 진행률이 바뀌지 않게 합니다.** 출시 범위 자체가 바뀌면 비중과 근거를 함께 다시 산정합니다. 옛 턴제 기획의 시간 추정치를 실시간 전투의 실측 공수로 사용하지 않습니다.

## 상태 판단 근거

확인일: **2026-10-18 (한국 시간)**. 로컬 `Pokefan/Verdite`의 현재 소스, 기획서와 저장된 검사 자료를 읽었습니다. 동료 관련 실행 근거는 같은 날 21:53까지 기록된 `Verdite.log`에서 확인했습니다. 아래 경로는 로컬 프로젝트 기준이며, 게임 원본·설정·전체 로그를 이 공개 웹 저장소에 복사하지 않습니다.

아래는 세부 작업 점수의 근거 기록입니다. 이 표의 행 개수를 단순 집계하지 않고, 위 비중과 해당 작업 범위에만 반영합니다. 예를 들어 메뉴·폰트의 기존 검사 통과는 UI 영역에 일부 반영하지만 전체 HUD·조작·패드까지 완료한 것으로 표시하지 않습니다. 기획서 작성은 범위의 근거일 뿐 진행 점수는 없습니다.

| 항목 | 상태 | 확인한 근거와 범위 |
| --- | --- | --- |
| 플레이 기획 v1.1 | 완료 | `Verdite/Docs/버다이트 플레이 기획서.pdf`, v1.1 / 2026-10-17. 탐험·포획·실시간 전투·지원 명령·통신기를 정의한 7쪽 문서. 밸런스와 일부 규칙은 추가 결정 대상. |
| 타이틀 메뉴와 설정 | 완료 | `Verdite/Source/Verdite/Menu/VerditeTitleWidget.cpp`, `VerditeMenuTests.cpp`; `Verdite/Saved/MenuChecks/Report1280x720/index.json`, `Report1920x1080/index.json`에서 2026-10-17 `Verdite.Menu.Flow` 각각 성공 1, 실패 0. `output/menu/visual-validation.json`의 배경 움직임·버튼 고정 검사 PASS. |
| UI 폰트 | 완료 | `Verdite/SourceArt/Fonts/VerditeSans/shaping_validation.json`, `unreal_font_validation.json`: 3가지 굵기, 한글 11,172자 NFC/NFD 조합 검사, UE 재로드 PASS. |
| 통신기 3D 에셋 | 완료 | `Verdite/SourceArt/Props/VerditeCommunicator/README.txt`, `project_validation_report.json`, `unreal_validation_report.json`: 메시·재질·정적 화면 및 UE 가져오기 검증. 실제 연락·네트워크 기능은 제외. |
| 탐험 이동과 카메라 | 진행 중 | `Verdite/Source/Verdite/Gameplay/VerditeTrainerCharacter.cpp`, `VerditeGameMode.cpp`, `VerditePlayerController.cpp`; `Content/Verdite/Input`, `Content/Verdite/Maps/L_GameplayPrototype.umap` 존재. 이동·점프·달리기·숙이기·숄더뷰·줌 코드 확인. |
| 조준과 몬스터볼 투척 | 진행 중 | 같은 `VerditeTrainerCharacter.cpp` 및 `VerditeMonsterBall.cpp`: 조준, 궤적 예측, 투척, 벽 반사와 충돌 전달 구현. `Verdite/Saved/Logs/Verdite.log`의 볼 충돌 기록 확인. |
| 기본 포획 판정 | 진행 중 | `VerditeTestPokemon.cpp`의 `CaptureChance` 판정, 성공 시 숨김·충돌 해제와 결과 이벤트. 위 실행 로그의 2026-10-18 성공·실패 기록 확인. 체력·볼 보정 및 전투 연계는 아직 없음. |
| 동료 등록과 기본 소환 | 해당 작업 검증 완료 | `VerditeTestPokemon.cpp`의 포획 성공 분기에서 `RegisterCompanion` 호출. `VerditeCompanionSubsystem.cpp`에 실제 등록·저장 본문, `VerditePlayerController.cpp`에 `SummonCompanion` 구현. `Verdite/Saved/Logs/Verdite.log:3174`에서 두 번째 등록·저장, `:3223`에서 목록 1번 동료 소환 확인. 0번 소환 기록도 존재. 파티 편성·보관함·소환 실패 예외 검증은 제외. |
| 동료 목록 UI 데이터 | 구현 확인 | `GetCompanions`, `GetCompanionListText`, `OnCompanionsChanged` 구현. `Content/Verdite/UI/WBP_CompanionList.uasset` 존재. 데이터·알림만 부분 반영하며 블루프린트 내부와 실제 선택 흐름은 미검증. |
| 직접 조작·이동·카메라·복귀 | 구현 확인 | `VerditePlayerController.cpp`의 `ControlSummonedCompanion`, `ReturnToTrainer`, `HandleSummonedCompanionDestroyed`; `VerditeTestPokemon.cpp`의 `MoveToCursor`, `Tick`, `Orbit`, `Zoom`과 동료 입력 에셋 확인. 현재 이동은 직선 방식이며 장애물 우회 경로 탐색은 없음. 실제 조작 전체를 검증한 기록으로 간주하지 않음. |
| 자동 전투·기술·지원 명령 | 예정 | 기획서 2·3·5·7쪽의 자동 출전, 기술·회피·피해, 지원 UI와 전투 종료 흐름은 구현 확인 전. 수동 소환·조작은 해당 기반 작업만 부분 반영. |
| 통신과 멀티플레이 | 예정 | 기획서 6·7쪽 및 통신기 README에서 실제 연락 UI·네트워크를 별도 구현 대상으로 명시. |
| 동료 저장·불러오기·초기화 | 해당 작업 검증 완료 | `VerditeCompanionSaveGame.h`의 버전 1 및 이름·클래스 목록, `VerditeCompanionSubsystem.cpp`의 `SaveGameToSlot`·`LoadGameFromSlot`·`DeleteGameInSlot` 구현. `Verdite/Saved/Logs/Verdite.log:3289`에서 동료 2개 로드, `:3422`에서 기존 세이브 초기화 확인. `VerditeCompanionSaveTests.cpp`의 메모리 직렬화 테스트는 `Verdite/Saved/Logs/Verdite-backup-2026.10.18-09.37.27.log:2176`에 `Verdite.Companions.SaveRoundTrip` 성공 기록. 이 자동 검사는 디스크 실패나 월드 저장을 검사하지 않음. |
| 저장 실패 방어 | 구현 확인 | 등록 시 저장 성공 후 목록 반영, 로드 실패·버전 불일치 시 `bSaveAllowed`로 등록 차단, 항목의 이름·클래스 검사. 손상 파일·디스크 오류의 실제 검증 결과는 확인하지 못했으며 백업·버전 변환은 미구현. |
| 패키징과 게임패드 검증 | 예정 | `Verdite/Config/DefaultGame.ini`에 Menu·L_GameplayPrototype 패키징 대상 설정. 프로젝트·메뉴 README 및 캡처 검증 보고서는 게임 패키징·게임패드 미검증으로 명시. |

자료 간 차이는 현재 코드와 개별 결과를 우선했습니다. `Verdite/README.txt`의 “탐험·포획 미구현” 문구와 동료 헤더의 “SaveGame 연결은 후속” 주석은 현재 `.cpp` 구현과 일치하지 않습니다. 런타임 배열의 `Transient` 지정과 별개로 `UVerditeCompanionSaveGame`에 목록을 복사해 저장합니다. `docs/버다이트 플레이 기획서.pdf`와 `Verdite/Docs/버다이트 플레이 기획서.pdf`는 같은 v1.1 파일입니다. 지원 메뉴에서 전투·효과를 일시정지한다는 이 PDF를 우선했으며, 더 오래된 `docs/pokefan_gameplay_design_2026-10-17.html` v0.1의 비일시정지 규칙은 적용하지 않았습니다.

이전 `ReportUMG1080`에는 설정 저장 실패가 있지만, 그보다 뒤의 720p·1080p 보고서는 성공입니다. 다만 현재 메뉴 테스트는 `L_GameplayPrototype` 도착과 플레이어 소유까지 검사하도록 바뀌었으므로, 이전 성공 기록으로 최신 통합 테스트까지 통과했다고 간주하지 않았습니다. C++ 기본 목적지는 OpenWorld이며 블루프린트의 현재 목적지 값은 재실행으로 확인하지 않았습니다. 이전 Live Coding 세션에는 충돌 기록도 있어, 이후의 동료 실행 로그만으로 전체 안정성을 완료 처리하지 않습니다.

이번 작업에서는 엔진 빌드·게임 실행·블루프린트 내부 검사를 새로 수행하지 않았습니다. 소스의 존재를 완성된 플레이로 표시하지 않으며, 동료 조작 검증·자동 전투 연결은 현재 코드에서 도출한 다음 확인 과제이고 확정 일정이 아닙니다.

## 배경 이미지 생성

2026-10-18 내장 ImageGen으로 새로 생성했습니다. 최종 파일은 `assets/verdite-forest.png`이며, 게임 화면 또는 실제 맵의 기록이 아닌 웹페이지용 일러스트입니다. `body::before`의 고정 레이어에서 페이지 전체 배경으로 사용하고, 본문에는 테마에 맞춘 반투명 표면을 두어 긴 글을 읽을 수 있게 합니다. 상단 모듈은 이미지를 따로 반복하지 않습니다. 파비콘은 기존 페이지 로고 형태를 SVG로 재사용했습니다.

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
