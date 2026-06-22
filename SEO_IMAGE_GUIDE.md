# SEO 공유 이미지 설정 가이드

사이트 링크를 카카오톡, 디스코드, 페이스북, 링크드인, X(Twitter) 등에 공유했을 때 표시되는 대표 이미지를 설정한 버전입니다.

## 기본 파일

```text
assets/images/og-image.jpg
```

현재 파일 크기는 표준 권장 비율인 **1200 × 630px**입니다.

## 가장 중요한 설정

`index.html`의 `<head>`에서 아래 임시 주소를 실제 배포 주소로 바꿔야 합니다.

```html
<link rel="canonical" href="https://your-domain.com/">
<meta property="og:url" content="https://your-domain.com/">
<meta property="og:image" content="https://your-domain.com/assets/images/og-image.jpg">
<meta property="og:image:secure_url" content="https://your-domain.com/assets/images/og-image.jpg">
<meta name="twitter:image" content="https://your-domain.com/assets/images/og-image.jpg">
```

예를 들어 실제 주소가 `https://zerojae2.github.io/portfolio/`라면 다음처럼 수정합니다.

```html
<link rel="canonical" href="https://zerojae2.github.io/portfolio/">
<meta property="og:url" content="https://zerojae2.github.io/portfolio/">
<meta property="og:image" content="https://zerojae2.github.io/portfolio/assets/images/og-image.jpg">
<meta property="og:image:secure_url" content="https://zerojae2.github.io/portfolio/assets/images/og-image.jpg">
<meta name="twitter:image" content="https://zerojae2.github.io/portfolio/assets/images/og-image.jpg">
```

## 이미지 교체 방법

새 이미지를 `1200 × 630px` JPG 또는 PNG로 제작한 뒤 다음 파일을 덮어씁니다.

```text
assets/images/og-image.jpg
```

파일명을 바꾼다면 `index.html`의 `og:image`, `og:image:secure_url`, `twitter:image` 경로도 함께 바꿔야 합니다.

## 주의사항

- SEO 공유 이미지는 브라우저 탭 안에 표시되는 이미지가 아니라, 사이트 링크를 외부 서비스에 공유할 때 표시되는 미리보기 이미지입니다.
- 로컬 주소인 `file:///...` 또는 `localhost`에서는 외부 서비스가 이미지를 읽을 수 없습니다.
- 반드시 인터넷에 배포한 뒤 **절대 URL**을 사용해야 합니다.
- 이미지 교체 후에도 이전 이미지가 보이면 서비스의 링크 미리보기 캐시가 남아 있는 경우가 있습니다.
- 안전 영역을 고려하여 중요한 텍스트와 로고는 이미지 가장자리에서 최소 60px 이상 떨어뜨리는 것이 좋습니다.
