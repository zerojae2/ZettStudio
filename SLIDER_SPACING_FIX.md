# 슬라이드 점과 스크롤 아이콘 간격 수정

데스크톱에서는 슬라이드 점을 화면 하단 오른쪽으로 이동해 중앙의 스크롤 안내 아이콘과 분리했습니다.

수정 위치: `assets/css/style.css`

```css
.hero-slider-dots {
  right: clamp(24px, 4vw, 64px);
  bottom: 34px;
  left: auto;
  transform: none;
}
```

모바일에서는 스크롤 안내 아이콘이 숨겨지므로 슬라이드 점을 기존처럼 하단 중앙에 유지합니다.
