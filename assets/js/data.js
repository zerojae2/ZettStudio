/*
  포트폴리오 콘텐츠 수정 파일

  [프로젝트별 PDF 등록 방법]
  1. documents/<프로젝트 폴더>/ 안에 PDF 파일을 넣습니다.
  2. 아래 각 프로젝트의 documents 배열에서 해당 항목의 file 값을 수정합니다.

  예시:
  {
    id: "proposal",
    title: "개발제안서",
    description: "프로젝트 목표와 개발 방향",
    file: "documents/gungeon-heroes/Gungeon_Heroes_개발제안서.pdf"
  }

  - file이 빈 문자열이면 상세 창에 '준비 중'으로 표시됩니다.
  - 문서를 더 추가하려면 documents 배열 안에 같은 형식의 객체를 복사해서 넣으세요.

  [프로젝트 카드 수정]
  - period: 카드에 표시되는 프로젝트 기간
  - category: 카드에 표시되는 분류 배지
  - cardImagePosition: 카드 상단 이미지의 초점 위치

  [상단 히어로 자동 슬라이드]
  - heroImage: 상단 슬라이드 전용 이미지. 비워 두면 image 값을 사용합니다.
  - heroImagePosition: 데스크톱 이미지 초점 위치
  - heroImagePositionTablet: 태블릿 이미지 초점 위치
  - heroImagePositionMobile: 모바일 이미지 초점 위치
  - heroImageSize: 이미지 표시 방식. 기본값은 "cover"
  - heroVisible: false로 지정하면 상단 슬라이드에서 제외됩니다.

  [상세 창 이미지 수정]
  - modalImagePosition: 데스크톱 상세 이미지 위치
  - modalImagePositionTablet: 태블릿 상세 이미지 위치
  - modalImagePositionMobile: 모바일 상세 이미지 위치
  - modalImageSize: 이미지 확대 방식. 기본값은 "cover"

  위치 예시: "50% 50%" = 중앙, "75% 40%" = 오른쪽·위쪽 강조
  - 프로젝트 설명, 이미지, YouTube 영상 ID, 연락처도 이 파일에서 관리합니다.
*/
window.PORTFOLIO_DATA = {
  heroSlider: {
    interval: 6000,
    startProjectId: "gungeon-heroes"
  },

  owner: {
    name: "이영재",
    email: "zerojae2@gmail.com",
    location: "Seoul, Korea",
    github: "https://github.com/",
    notion: "https://www.notion.so/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/"
  },

  projects: [
    {
      id: "dragon-ascension",
      title: "구천을 기는 용",
      type: "TEAM PROJECT",
      typeClass: "team",
      image: "assets/images/dragon-ascension.svg",
      heroImage: "assets/images/dragon-ascension.svg",
      heroImagePosition: "50% 50%",
      heroImagePositionTablet: "50% 46%",
      heroImagePositionMobile: "50% 44%",
      heroImageSize: "cover",
      period: "2026년 진행 프로젝트",
      category: "팀 프로젝트",
      cardImagePosition: "50% 50%",
      modalImagePosition: "50% 50%",
      modalImagePositionTablet: "50% 45%",
      modalImagePositionMobile: "50% 42%",
      modalImageSize: "cover",
      summary: "이무기가 용이 되기 위한 여정을 떠나 승천에 감춰진 비밀을 추적하는 한국형 다크 판타지 로그라이트.",
      description: "한국 설화의 이무기와 승천 모티프를 기반으로, 선택형 룸 진행과 전투·성장·서사 구조를 결합한 팀 프로젝트입니다.",
      tags: ["ROGUELITE", "DARK FANTASY", "ACTION"],
      facts: {
        "담당": "레벨 디자인 · 시스템 기획 · 문서 통합",
        "엔진": "Unreal Engine 5",
        "핵심 경험": "승천을 향한 압박감과 선택의 누적",
        "플랫폼": "PC"
      },
      accent: "#ae78dc",
      documents: [
        { id: "proposal", title: "개발제안서", description: "프로젝트 목표와 개발 방향", file: "" },
        { id: "character", title: "캐릭터컨셉기획서", description: "캐릭터 설정과 비주얼 콘셉트", file: "" },
        { id: "environment", title: "배경컨셉기획서", description: "챕터별 공간과 아트 방향", file: "" },
        { id: "system", title: "게임시스템기획서", description: "핵심 루프와 성장·전투 시스템", file: "" },
        { id: "level", title: "레벨디자인기획서", description: "룸 구성과 전투·동선 설계", file: "" },
        { id: "ui", title: "게임UI디자인기획서", description: "HUD와 메뉴 정보 구조", file: "" },
        { id: "service", title: "게임서비스기획서", description: "운영과 업데이트 구조", file: "" }
      ]
    },

    {
      id: "gungeon-heroes",
      title: "Gungeon Heroes",
      type: "PERSONAL PROJECT",
      typeClass: "personal-blue",
      image: "assets/images/gungeon-heroes-hero.png",
      heroImage: "assets/images/gungeon-heroes-hero.png",
      heroImagePosition: "54% 36%",
      heroImagePositionTablet: "60% 45%",
      heroImagePositionMobile: "68% 48%",
      heroImageSize: "cover",
      period: "2026년 진행 프로젝트",
      category: "개인 프로젝트",
      cardImagePosition: "68% 50%",
      modalImagePosition: "58% 50%",
      modalImagePositionTablet: "64% 48%",
      modalImagePositionMobile: "70% 45%",
      modalImageSize: "cover",
      summary: "일곱 감정이 탑으로 분리된 세계에서 파티를 구성하고 감정을 되찾는 액션 어드벤처 수집형 로그라이트 RPG.",
      description: "귀여운 캐릭터 수집과 3인 파티 조합, 실시간 전투, 로그라이트 빌드 설계를 결합한 개인 프로젝트입니다.",
      tags: ["ROGUELITE", "ACTION RPG", "ANIME"],
      facts: {
        "담당": "전체 게임 기획 · 시스템 · 데이터 설계",
        "엔진": "Unreal Engine 5",
        "핵심 경험": "캐릭터 조합과 빌드 완성의 쾌감",
        "플랫폼": "PC · Mobile"
      },
      accent: "#4ebcff",
      documents: [
        { id: "proposal", title: "개발제안서", description: "프로젝트 비전과 시장 포지셔닝", file: "" },
        { id: "character", title: "캐릭터컨셉기획서", description: "수집 캐릭터와 파티 역할 설계", file: "" },
        { id: "environment", title: "배경컨셉기획서", description: "일곱 감정의 탑과 세계관 비주얼", file: "" },
        { id: "system", title: "게임시스템기획서", description: "전투·수집·성장·빌드 시스템", file: "" },
        { id: "level", title: "레벨디자인기획서", description: "탑 공략과 로그라이트 룸 구성", file: "" },
        { id: "ui", title: "게임UI디자인기획서", description: "파티 전투 HUD와 메뉴 UX", file: "" },
        { id: "service", title: "게임서비스기획서", description: "캐릭터 업데이트와 라이브 운영", file: "" }
      ]
    },

    {
      id: "familia-chronicle",
      title: "Familia Chronicle",
      type: "PERSONAL PROJECT",
      typeClass: "personal-green",
      image: "assets/images/familia-chronicle.svg",
      heroImage: "assets/images/familia-chronicle.svg",
      heroImagePosition: "50% 50%",
      heroImagePositionTablet: "50% 46%",
      heroImagePositionMobile: "50% 44%",
      heroImageSize: "cover",
      period: "2026년 진행 프로젝트",
      category: "개인 프로젝트",
      cardImagePosition: "50% 50%",
      modalImagePosition: "50% 50%",
      modalImagePositionTablet: "50% 45%",
      modalImagePositionMobile: "50% 42%",
      modalImageSize: "cover",
      summary: "던전을 중심으로 성장한 도시에서 모험가가 동료와 함께 심층을 공략하는 판타지 MMORPG.",
      description: "도시 생활과 파티 플레이, 길드 커뮤니티, 던전 탐험이 순환하는 장기 성장형 MMORPG 개인 프로젝트입니다.",
      tags: ["MMORPG", "FANTASY", "SOCIAL"],
      facts: {
        "담당": "세계관 · 시스템 · 콘텐츠 구조 기획",
        "엔진": "Unreal Engine 5",
        "핵심 경험": "도시와 던전을 오가는 모험가 생활",
        "플랫폼": "PC"
      },
      accent: "#6fd49a",
      documents: [
        { id: "proposal", title: "개발제안서", description: "MMORPG 목표와 핵심 차별점", file: "" },
        { id: "character", title: "캐릭터컨셉기획서", description: "모험가와 파밀리아 설정", file: "" },
        { id: "environment", title: "배경컨셉기획서", description: "던전 도시와 탐험 지역 콘셉트", file: "" },
        { id: "system", title: "게임시스템기획서", description: "성장·파티·길드·경제 시스템", file: "" },
        { id: "level", title: "레벨디자인기획서", description: "던전 층과 필드 동선 설계", file: "" },
        { id: "ui", title: "게임UI디자인기획서", description: "MMORPG HUD와 커뮤니티 UX", file: "" },
        { id: "service", title: "게임서비스기획서", description: "시즌·이벤트·운영 정책", file: "" }
      ]
    }
  ],

  videos: [
    {
      projectId: "dragon-ascension",
      title: "구천을 기는 용 | UE5 Prototype",
      duration: "2:15",
      youtubeId: "",
      thumbnail: "assets/images/dragon-ascension.svg",
      imagePosition: "50% 50%"
    },
    {
      projectId: "gungeon-heroes",
      title: "Gungeon Heroes | UE5 Prototype",
      duration: "2:26",
      youtubeId: "",
      thumbnail: "assets/images/gungeon-heroes-hero.png",
      imagePosition: "65% 50%"
    },
    {
      projectId: "familia-chronicle",
      title: "Familia Chronicle | UE5 Prototype",
      duration: "2:18",
      youtubeId: "",
      thumbnail: "assets/images/familia-chronicle.svg",
      imagePosition: "50% 50%"
    }
  ]
};
