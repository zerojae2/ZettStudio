# 프로젝트 카드 레이아웃 수정 가이드

## 카드 문구 수정

`assets/js/data.js`에서 프로젝트별로 수정합니다.

```js
period: "2026년 3월 25일 — 2026년 7월 8일",
category: "게임 기획",
summary: "게임 기획 제작을 위한 웹사이트를 디자인했습니다."
```

## 카드 이미지 비율 변경

`assets/css/style.css`에서 다음 항목을 찾습니다.

```css
.project-card-media {
  aspect-ratio: 16 / 8.7;
}
```

- 이미지 영역을 더 높게: `16 / 10`
- 이미지 영역을 더 낮게: `16 / 7`
- 정사각형에 가깝게: `4 / 3`

## 카드 모서리와 그림자 변경

```css
.project-card {
  border-radius: 18px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, .18);
}
```

## 카드 본문 여백 변경

```css
.project-card-body {
  padding: 16px 17px 15px;
}
```

## 카드 설명 줄 수 변경

```css
.project-card .project-summary {
  -webkit-line-clamp: 3;
}
```

`3`을 `4`로 바꾸면 설명이 최대 네 줄까지 표시됩니다.
