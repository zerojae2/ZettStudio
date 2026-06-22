# 파비콘 교체 가이드

현재 포트폴리오에는 네이비 배경과 청록·골드 별 모양을 사용한 파비콘 세트가 적용되어 있습니다.

## 적용 파일

- `favicon.ico`: 구형 브라우저 및 기본 파비콘
- `assets/images/favicon.svg`: 최신 브라우저용 벡터 파비콘
- `assets/images/favicon-32x32.png`: 일반 브라우저 탭
- `assets/images/favicon-16x16.png`: 작은 탭 아이콘
- `assets/images/apple-touch-icon.png`: iPhone/iPad 홈 화면 아이콘
- `assets/images/favicon-192x192.png`: 모바일/PWA 아이콘
- `assets/images/favicon-512x512.png`: 고해상도/PWA 아이콘
- `site.webmanifest`: 모바일 설치 정보

## 다른 이미지로 교체하는 방법

동일한 파일명으로 새 아이콘을 덮어쓰면 HTML을 수정하지 않아도 됩니다. 정사각형 이미지를 권장하며, 원본은 최소 512×512px가 좋습니다.

브라우저가 이전 아이콘을 캐시하는 경우 강력 새로고침을 실행하거나 브라우저 캐시를 삭제하세요.

- Windows Chrome/Edge: `Ctrl + F5`
- macOS Chrome: `Command + Shift + R`
