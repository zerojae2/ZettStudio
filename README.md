# 게임 프로젝트 포트폴리오 — 프로젝트별 문서 모달 버전

HTML, 순수 CSS, 순수 바닐라 JavaScript만 사용한 반응형 포트폴리오 웹사이트입니다.

이 버전은 메인 페이지의 별도 `DOCUMENTS` 메뉴와 섹션을 제거하고, 각 프로젝트의 **상세 보기 모달 안에서 해당 게임의 PDF 기획 문서만 열람**하도록 구성했습니다.

## 실행 방법

VS Code에서 프로젝트 폴더를 열고 `index.html`을 **Live Server**로 실행합니다.

또는 터미널에서 다음 명령을 실행합니다.

```bash
python -m http.server 5500
```

브라우저에서 `http://localhost:5500`으로 접속합니다.

## 프로젝트별 PDF 등록 방법

### 1. PDF 파일 넣기

프로젝트에 맞는 폴더에 PDF를 넣습니다.

```text
documents/
├─ dragon-ascension/   # 구천을 기는 용
├─ gungeon-heroes/     # Gungeon Heroes
└─ familia-chronicle/  # Familia Chronicle
```

### 2. `assets/js/data.js`에서 경로 연결하기

각 프로젝트 객체 안에 `documents` 배열이 있습니다. 등록할 문서의 `file` 값에 상대 경로를 입력합니다.

```js
documents: [
  {
    id: "proposal",
    title: "개발제안서",
    description: "프로젝트 비전과 시장 포지셔닝",
    file: "documents/gungeon-heroes/Gungeon_Heroes_개발제안서.pdf"
  }
]
```

- `file: ""`이면 상세 창에 **준비 중**으로 표시됩니다.
- PDF 경로를 입력하면 **열기 ↗**로 변경됩니다.
- 문서 카드를 누르면 사이트 내부 PDF 뷰어가 열립니다.
- 문서를 더 추가할 때는 같은 형식의 객체를 `documents` 배열에 추가합니다.

## YouTube 영상 연결 방법

유튜브 주소가 다음과 같다면,

```text
https://www.youtube.com/watch?v=abc123XYZ
```

`assets/js/data.js`의 `youtubeId`에는 ID 부분만 입력합니다.

```js
youtubeId: "abc123XYZ"
```

## 자주 수정할 파일

- `assets/js/data.js` — 프로젝트 설명, 프로젝트별 PDF, YouTube ID, 연락처
- `assets/css/style.css` — 색상, 간격, 모달, 반응형 레이아웃
- `index.html` — 전체 섹션 구조와 고정 문구
- `assets/images/` — 프로젝트 대표 이미지

## 폴더 구조

```text
game-project-portfolio-project-documents/
├─ index.html
├─ README.md
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ data.js
│  │  └─ main.js
│  └─ images/
│     ├─ gungeon-heroes-hero.png
│     ├─ dragon-ascension.svg
│     ├─ familia-chronicle.svg
│     └─ favicon.svg
└─ documents/
   ├─ dragon-ascension/
   ├─ gungeon-heroes/
   └─ familia-chronicle/
```

## 주요 변경 사항

- 상단 내비게이션의 `Documents` 메뉴 제거
- 메인 페이지의 `DOCUMENTS` 섹션 제거
- 프로젝트 상세 모달에 프로젝트별 PDF 목록 추가
- 각 프로젝트 카드에 문서 등록 개수 표시
- 빈 PDF 경로는 `준비 중`, 등록된 경로는 `열기`로 자동 표시
- 프로젝트 상세 모달에서 해당 프로젝트의 플레이 영상 바로 열기
- 데스크톱, 태블릿, 모바일 반응형 모달 적용

## 이번 버전 변경 사항

- 히어로 이미지 확대/이동 모션 제거
- 좌우 가장자리의 투명한 이전/다음 클릭 영역 적용
- 큰 슬라이더 컨트롤 박스 제거
- 프로젝트 카드 장르 태그 아래 구분선 제거


## 프로젝트 상세 창 레이아웃

상세 창은 대표 이미지가 위에, 프로젝트 설명과 PDF 문서가 아래에 배치되는 세로형 구조입니다. 자세한 내용은 `PROJECT_DETAIL_LAYOUT_GUIDE.md`를 확인하세요.

## 메인 인트로 제목 크기 축소

이 버전은 메인 페이지의 큰 제목 크기를 줄인 버전입니다.

수정 위치:

```css
assets/css/style.css
```

적용된 값:

```css
.hero h1 {
  max-width: 860px;
  font-size: clamp(2.25rem, 4.15vw, 4.65rem);
  line-height: 1.08;
}
```
