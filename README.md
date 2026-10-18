# 버다이트 개발 진행 현황

저장소: https://github.com/NullD4201/PokemonVerdite

설치나 빌드 없이 작동하는 GitHub Pages용 정적 페이지입니다. `index.html`을 브라우저에서 바로 열면 됩니다. 외부 라이브러리, 폰트, API 호출은 없습니다.

## 내용 수정

- `index.html`: 개발 항목, 최근 기록, 다음 목표. 현재 내용은 모두 **예시**입니다. 실제 상태로 교체한 뒤 미리보기 안내와 예시 표시도 함께 수정하세요.
- `styles.css`: 색상, 배치와 모바일 화면.
- `app.js`: 등록된 항목에서 완료율과 상태별 개수를 자동 계산합니다.
- `check.cjs`: `node check.cjs`로 집계와 기본 파일을 검증합니다.

개발 항목의 `data-status`에는 `done`(완료), `active`(진행 중), `planned`(예정)을 사용합니다. 변경 시 같은 항목의 상태 문구도 함께 수정하세요. 완료율은 완료 항목 수를 전체 항목 수로 나눈 값이며, 게임 전체의 완성도나 작업량 가중치를 나타내지 않습니다. 기록은 최신 항목을 위에 추가합니다.

## GitHub Pages

이 디렉터리는 `PokemonVerdite` 저장소의 루트입니다. `index.html`, `styles.css`, `app.js`가 함께 배포되면 동작하며, 상대 경로를 사용하므로 저장소 이름이 포함된 URL에서도 작동합니다.

배포 주소: https://nulld4201.github.io/PokemonVerdite/

GitHub Pages는 `main` 브랜치의 루트(`/`)를 배포합니다. 변경 내용을 `main`에 push하면 자동으로 갱신됩니다. `.nojekyll` 파일로 Jekyll 변환 없이 정적 파일을 제공합니다.

GitHub 개발 이슈나 커밋을 자동 집계하지 않고, 위 HTML의 상태를 직접 관리합니다.
