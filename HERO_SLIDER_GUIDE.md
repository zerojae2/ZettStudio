# HERO SLIDER 설정 가이드

## 변경된 동작

- 배경 이미지는 확대하거나 이동하지 않고 고정된 상태에서 교차 페이드만 적용됩니다.
- 이전/다음 버튼은 별도의 박스 없이 화면 좌우 가장자리에 투명 클릭 영역으로 존재합니다.
- 데스크톱에서는 히어로 영역에 마우스를 올렸을 때만 화살표가 은은하게 표시됩니다.
- 모바일에서는 좌우 스와이프로도 슬라이드를 넘길 수 있습니다.
- 하단에는 현재 슬라이드를 표시하는 작은 점만 노출됩니다.

## 자동 재생 시간

`assets/js/data.js`의 `heroSlider.interval` 값을 수정합니다.

```javascript
heroSlider: {
  interval: 6000,
  startProjectId: "gungeon-heroes"
}
```

## 이미지 위치

각 프로젝트의 아래 값을 수정합니다.

```javascript
heroImagePosition: "54% 36%",
heroImagePositionTablet: "60% 45%",
heroImagePositionMobile: "68% 48%"
```
