# 프로젝트 상세 창 세로형 레이아웃

`상세 보기`를 누르면 프로젝트 창이 다음 순서로 표시됩니다.

1. 프로젝트 대표 이미지
2. 프로젝트명과 설명
3. 담당·엔진·핵심 경험·플랫폼 정보
4. 프로젝트별 PDF 기획 문서
5. 플레이 영상 버튼

## 이미지 높이 변경

`assets/css/style.css`의 마지막에 있는 아래 값을 수정합니다.

```css
.project-modal .modal-shell {
  grid-template-rows: minmax(300px, 42svh) auto;
}
```

- `42svh`를 높이면 이미지 영역이 커집니다.
- `42svh`를 낮추면 설명과 문서가 더 빨리 보입니다.

## 이미지 위치 변경

이미지 초점은 기존처럼 `assets/js/data.js`에서 프로젝트별로 조절합니다.

```javascript
modalImagePosition: "50% 50%",
modalImagePositionTablet: "50% 45%",
modalImagePositionMobile: "50% 42%"
```

## 문서 등록

각 프로젝트의 `documents` 배열에 PDF 경로를 입력합니다.

```javascript
{
  id: "proposal",
  title: "개발제안서",
  description: "프로젝트 목표와 개발 방향",
  file: "documents/familia-chronicle/Familia_Chronicle_개발제안서.pdf"
}
```


## 프로젝트 제목 표시 방식

상세 화면의 프로젝트 제목은 설명 영역에 한 번만 표시합니다. 대표 이미지 위에는 제목이나 프로젝트 유형을 중복 출력하지 않습니다.
