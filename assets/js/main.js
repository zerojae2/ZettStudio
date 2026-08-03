(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA를 불러오지 못했습니다.");
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const hero = $(".hero");
  const heroSlider = $("#hero-slider");
  const heroSliderControls = $("#hero-slider-controls");
  const heroSliderDots = $("#hero-slider-dots");
  const heroSlideNumber = $("#hero-slide-number");
  const heroSlideTitle = $("#hero-slide-title");
  const projectGrid = $("#project-grid");
  const videoGrid = $("#video-grid");
  const projectModal = $("#project-modal");
  const viewerModal = $("#viewer-modal");
  const projectModalBody = $(".project-modal-body");
  const toast = $("#toast");
  let toastTimer;
  let heroProjects = [];
  let heroSlideIndex = 0;
  let heroSlideTimer = null;
  let heroPointerStartX = null;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeDocumentFilter = "all";

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function getProject(projectId) {
    return data.projects.find((project) => project.id === projectId);
  }

  function getProjectVideo(projectId) {
    return data.videos.find((video) => video.projectId === projectId);
  }

  function getDocumentType(documentItem) {
    const explicitType = String(documentItem.type || "").toLowerCase().trim();
    if (explicitType === "svg" || explicitType === "pdf") return explicitType;

    const file = String(documentItem.file || "").split("?")[0].toLowerCase();
    if (file.endsWith(".svg")) return "svg";
    return "pdf";
  }

  function getDocumentTypeLabel(type) {
    return type === "svg" ? "SVG" : "PDF";
  }

  function getDocumentDefaultDescription(type) {
    return type === "svg" ? "SVG 기획 자료" : "PDF 기획 문서";
  }

  function getHeroImage(project) {
    return project.heroImage || project.image || "";
  }

  function setHeroSlide(nextIndex, restartTimer = true) {
    if (!heroProjects.length) return;

    const total = heroProjects.length;
    heroSlideIndex = (nextIndex + total) % total;
    const activeProject = heroProjects[heroSlideIndex];

    $$(".hero-slide", heroSlider).forEach((slide, index) => {
      slide.classList.toggle("is-active", index === heroSlideIndex);
    });

    $$(".hero-slider-dot", heroSliderDots).forEach((dot, index) => {
      const active = index === heroSlideIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
      dot.tabIndex = active ? 0 : -1;
    });

    heroSlideNumber.textContent = `${String(heroSlideIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    heroSlideTitle.textContent = activeProject.title;

    if (restartTimer) startHeroAutoplay();
  }

  function stopHeroAutoplay() {
    window.clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    if (heroProjects.length < 2 || reducedMotionQuery.matches || document.hidden) return;

    const configuredInterval = Number(data.heroSlider?.interval);
    const interval = Number.isFinite(configuredInterval) ? Math.max(3500, configuredInterval) : 6000;
    heroSlideTimer = window.setInterval(() => setHeroSlide(heroSlideIndex + 1, false), interval);
  }

  function renderHeroSlider() {
    heroProjects = data.projects.filter((project) => project.heroVisible !== false && getHeroImage(project));

    if (!heroProjects.length) {
      heroSliderControls.hidden = true;
      return;
    }

    const configuredStartId = data.heroSlider?.startProjectId;
    const configuredStartIndex = heroProjects.findIndex((project) => project.id === configuredStartId);
    heroSlideIndex = configuredStartIndex >= 0 ? configuredStartIndex : 0;

    heroSlider.innerHTML = heroProjects.map((project, index) => `
      <div
        class="hero-slide ${index === heroSlideIndex ? "is-active" : ""}"
        data-direction="${index % 2 ? "reverse" : "forward"}"
        style="
          --hero-image-position-desktop:${escapeHTML(project.heroImagePosition || project.imagePosition || "50% 50%")} ;
          --hero-image-position-tablet:${escapeHTML(project.heroImagePositionTablet || project.heroImagePosition || project.imagePosition || "50% 50%")} ;
          --hero-image-position-mobile:${escapeHTML(project.heroImagePositionMobile || project.heroImagePositionTablet || project.heroImagePosition || project.imagePosition || "50% 50%")} ;
          --hero-image-size:${escapeHTML(project.heroImageSize || "cover")};
        ">
        <img
          src="${escapeHTML(getHeroImage(project))}"
          alt=""
          ${index === heroSlideIndex ? 'fetchpriority="high"' : 'loading="lazy"'}
          decoding="async">
      </div>
    `).join("");

    heroSliderDots.innerHTML = heroProjects.map((project, index) => `
      <button
        class="hero-slider-dot ${index === heroSlideIndex ? "is-active" : ""}"
        type="button"
        role="tab"
        aria-label="${escapeHTML(project.title)} 이미지 보기"
        aria-selected="${index === heroSlideIndex}"
        data-hero-slide="${index}"
        tabindex="${index === heroSlideIndex ? 0 : -1}"></button>
    `).join("");

    setHeroSlide(heroSlideIndex, false);
    startHeroAutoplay();
  }

  function initHeroSlider() {
    renderHeroSlider();
    if (heroProjects.length < 2) return;

    hero.addEventListener("mouseenter", stopHeroAutoplay);
    hero.addEventListener("mouseleave", startHeroAutoplay);
    hero.addEventListener("focusin", stopHeroAutoplay);
    hero.addEventListener("focusout", (event) => {
      if (!hero.contains(event.relatedTarget)) startHeroAutoplay();
    });

    hero.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, a")) return;
      heroPointerStartX = event.clientX;
    });

    hero.addEventListener("pointerup", (event) => {
      if (heroPointerStartX === null) return;
      const distance = event.clientX - heroPointerStartX;
      heroPointerStartX = null;
      if (Math.abs(distance) < 55) return;
      setHeroSlide(heroSlideIndex + (distance < 0 ? 1 : -1));
    });

    hero.addEventListener("pointercancel", () => {
      heroPointerStartX = null;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHeroAutoplay();
      else startHeroAutoplay();
    });

    reducedMotionQuery.addEventListener?.("change", startHeroAutoplay);
  }

  function renderProjects() {
    projectGrid.innerHTML = data.projects.map((project, index) => {
      const documentCount = Array.isArray(project.documents) ? project.documents.length : 0;
      const registeredCount = Array.isArray(project.documents)
        ? project.documents.filter((document) => Boolean(document.file)).length
        : 0;
      const projectPeriod = project.period || "2026년";
      const projectCategory = project.category || (project.type === "TEAM PROJECT" ? "팀 프로젝트" : "개인 프로젝트");

      return `
        <article class="project-card reveal" style="--accent:${escapeHTML(project.accent)}; --delay:${index * 80}ms">
          <div class="project-card-media">
            <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} 프로젝트 대표 이미지" loading="lazy" style="object-position:${escapeHTML(project.cardImagePosition || project.imagePosition || "50% 50%")} ">
          </div>

          <div class="project-card-body">
            <div class="project-title-row">
              <span class="project-title-icon" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
              <h3>${escapeHTML(project.title)}</h3>
            </div>

            <p class="project-period">${escapeHTML(projectPeriod)}</p>
            <span class="project-category ${escapeHTML(project.typeClass)}">${escapeHTML(projectCategory)}</span>
            <p class="project-summary">${escapeHTML(project.summary)}</p>

            <ul class="tag-list" aria-label="프로젝트 태그">
              ${project.tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join("")}
            </ul>

            <div class="project-card-footer">
              <p class="project-document-summary">
                <span aria-hidden="true">▤</span>
                프로젝트 문서 ${registeredCount}/${documentCount} 등록
              </p>
              <button class="card-button" type="button" data-open-project="${escapeHTML(project.id)}">상세 보기 <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderProjectDocuments(project, filter = activeDocumentFilter) {
    const documents = Array.isArray(project.documents) ? project.documents : [];
    const normalizedDocuments = documents.map((document) => ({
      ...document,
      normalizedType: getDocumentType(document)
    }));

    const registeredCount = normalizedDocuments.filter((document) => Boolean(document.file)).length;
    const typeCounts = normalizedDocuments.reduce((acc, document) => {
      const type = document.normalizedType;
      acc[type] = acc[type] || { total: 0, registered: 0 };
      acc[type].total += 1;
      if (document.file) acc[type].registered += 1;
      return acc;
    }, {});

    const validTypes = Object.keys(typeCounts).filter((type) => typeCounts[type].total > 0);
    if (filter !== "all" && !validTypes.includes(filter)) {
      activeDocumentFilter = "all";
    } else {
      activeDocumentFilter = filter;
    }

    $("#project-document-count").textContent = `등록 ${registeredCount} / ${normalizedDocuments.length}`;

    const filterButtons = [
      {
        id: "all",
        label: "전체",
        total: normalizedDocuments.length,
        registered: registeredCount
      },
      ...validTypes.map((type) => ({
        id: type,
        label: getDocumentTypeLabel(type),
        total: typeCounts[type].total,
        registered: typeCounts[type].registered
      }))
    ];

    const filterWrap = $("#project-document-filters");
    if (filterWrap) {
      filterWrap.innerHTML = filterButtons.map((item) => {
        const active = activeDocumentFilter === item.id;
        return `
          <button
            class="document-filter-button ${active ? "is-active" : ""}"
            type="button"
            role="tab"
            aria-selected="${active}"
            data-document-filter="${escapeHTML(item.id)}">
            <span>${escapeHTML(item.label)}</span>
            <em>${item.registered}/${item.total}</em>
          </button>
        `;
      }).join("");
    }

    const filteredDocuments = activeDocumentFilter === "all"
      ? normalizedDocuments
      : normalizedDocuments.filter((document) => document.normalizedType === activeDocumentFilter);

    if (!normalizedDocuments.length) {
      $("#project-modal-documents").innerHTML = `
        <div class="project-documents-empty">
          등록된 문서 항목이 없습니다. assets/js/data.js의 해당 프로젝트 documents 배열에 문서를 추가해 주세요.
        </div>
      `;
      return;
    }

    if (!filteredDocuments.length) {
      $("#project-modal-documents").innerHTML = `
        <div class="project-documents-empty">
          이 형식에 해당하는 문서가 없습니다.
        </div>
      `;
      return;
    }

    $("#project-modal-documents").innerHTML = filteredDocuments.map((document, index) => {
      const available = Boolean(document.file);
      const type = document.normalizedType;
      const typeLabel = getDocumentTypeLabel(type);
      return `
        <button
          class="project-document-item project-document-item--${escapeHTML(type)} ${available ? "is-available" : "is-pending"}"
          type="button"
          data-document-file="${escapeHTML(document.file)}"
          data-document-title="${escapeHTML(document.title)}"
          data-document-type="${escapeHTML(type)}"
          data-project-title="${escapeHTML(project.title)}"
          style="--item-delay:${index * 35}ms"
          aria-label="${escapeHTML(document.title)} ${available ? "열기" : "준비 중"}">
          <span class="project-document-icon" aria-hidden="true">${typeLabel}</span>
          <span class="project-document-copy">
            <strong>${escapeHTML(document.title)}</strong>
            <small>${escapeHTML(document.description || getDocumentDefaultDescription(type))}</small>
          </span>
          <span class="project-document-state">${available ? "열기 ↗" : "준비 중"}</span>
        </button>
      `;
    }).join("");
  }

  function renderVideos() {
    videoGrid.innerHTML = data.videos.map((video, index) => {
      const project = getProject(video.projectId);
      if (!project) return "";

      return `
        <article class="video-card reveal" style="--accent:${escapeHTML(project.accent)}; --delay:${index * 80}ms">
          <button type="button" class="video-trigger" data-youtube-id="${escapeHTML(video.youtubeId)}" data-video-title="${escapeHTML(video.title)}">
            <img src="${escapeHTML(video.thumbnail)}" alt="${escapeHTML(video.title)} 영상 썸네일" loading="lazy" style="object-position:${escapeHTML(video.imagePosition || project.videoImagePosition || project.cardImagePosition || project.imagePosition || "50% 50%")} ">
            <span class="video-overlay" aria-hidden="true"></span>
            <span class="play-button" aria-hidden="true">▶</span>
            <span class="duration">${escapeHTML(video.duration)}</span>
          </button>
          <div class="video-meta">
            <span class="project-dot" style="background:${escapeHTML(project.accent)}"></span>
            <h3>${escapeHTML(video.title)}</h3>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderContact() {
    const actions = [
      { label: "Email", href: `mailto:${data.owner.email}`, icon: "✉" },
      { label: "GitHub", href: data.owner.github, icon: "◈" },
      { label: "Notion", href: data.owner.notion, icon: "N" },
      { label: "LinkedIn", href: data.owner.linkedin, icon: "in" }
    ];

    $("#contact-actions").innerHTML = actions.map((item) => `
      <a href="${escapeHTML(item.href)}" ${item.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
        <span aria-hidden="true">${escapeHTML(item.icon)}</span>${escapeHTML(item.label)}
      </a>
    `).join("");

    $("#youtube-channel-link").href = data.owner.youtube;
  }

  function openProjectModal(projectId) {
    const project = getProject(projectId);
    if (!project) return;

    const visual = $("#project-modal-visual");
    visual.style.backgroundImage = `linear-gradient(180deg, transparent 18%, rgba(4, 10, 19, .86)), url("${project.image}")`;
    // 프로젝트마다 상세 이미지의 초점 위치와 확대 비율을 data.js에서 개별 조절합니다.
    visual.style.setProperty("--modal-image-position-desktop", project.modalImagePosition || project.imagePosition || "50% 50%");
    visual.style.setProperty("--modal-image-position-tablet", project.modalImagePositionTablet || project.modalImagePosition || project.imagePosition || "50% 50%");
    visual.style.setProperty("--modal-image-position-mobile", project.modalImagePositionMobile || project.modalImagePositionTablet || project.modalImagePosition || project.imagePosition || "50% 50%");
    visual.style.setProperty("--modal-image-size-desktop", project.modalImageSize || "cover");
    visual.style.setProperty("--modal-image-size-tablet", project.modalImageSizeTablet || project.modalImageSize || "cover");
    visual.style.setProperty("--modal-image-size-mobile", project.modalImageSizeMobile || project.modalImageSizeTablet || project.modalImageSize || "cover");

    $("#project-modal-type").textContent = project.type;
    $("#project-modal-title").textContent = project.title;
    $("#project-modal-description").textContent = project.description;
    $("#project-modal-facts").innerHTML = Object.entries(project.facts).map(([label, value]) => `
      <div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>
    `).join("");

    activeDocumentFilter = "all";
    projectModal.dataset.activeProject = project.id;
    renderProjectDocuments(project);

    const projectVideoButton = $("#project-video-button");
    projectVideoButton.dataset.projectVideo = project.id;

    let projectSimulatorButton = $("#project-simulator-button");

    if (!projectSimulatorButton) {
      projectSimulatorButton = document.createElement("a");
      projectSimulatorButton.id = "project-simulator-button";
      projectSimulatorButton.className = "project-simulator-button";
      projectSimulatorButton.textContent = "HTML 시뮬레이터 보기 ↗";
      projectSimulatorButton.target = "_blank";
      projectSimulatorButton.rel = "noopener noreferrer";

      projectVideoButton.insertAdjacentElement("afterend", projectSimulatorButton);
    }

    if (project.simulatorUrl) {
      projectSimulatorButton.href = project.simulatorUrl;
      projectSimulatorButton.hidden = false;
      projectSimulatorButton.setAttribute("aria-label", `${project.title} HTML 시뮬레이터 보기`);
    } else {
      projectSimulatorButton.href = "#";
      projectSimulatorButton.hidden = true;
    }

    projectModal.style.setProperty("--accent", project.accent);
    projectModalBody.scrollTop = 0;
    projectModal.showModal();
    document.body.classList.add("modal-open");
  }

  function openDocument(file, title, projectTitle, type = "pdf") {
    const normalizedType = type === "svg" ? "svg" : "pdf";
    if (!file) {
      showToast(`${getDocumentTypeLabel(normalizedType)} 파일이 아직 연결되지 않았습니다. assets/js/data.js에서 해당 문서의 file 경로를 등록해 주세요.`);
      return;
    }

    const typeLabel = getDocumentTypeLabel(normalizedType);
    $("#viewer-kicker").textContent = `${projectTitle} · ${typeLabel}`;
    $("#viewer-title").textContent = title;
    $("#viewer-external").href = file;
    const frameTitle = `${escapeHTML(title)} ${typeLabel} 뷰어`;
    $("#viewer-frame-wrap").classList.toggle("is-svg-viewer", normalizedType === "svg");
    $("#viewer-frame-wrap").innerHTML = `<iframe src="${escapeHTML(file)}" title="${frameTitle}"></iframe>`;
    viewerModal.showModal();
    document.body.classList.add("modal-open");
  }

  function openVideo(youtubeId, title) {
    if (!youtubeId) {
      showToast("YouTube 영상 ID가 아직 등록되지 않았습니다. assets/js/data.js에서 youtubeId를 입력해 주세요.");
      return;
    }

    $("#viewer-kicker").textContent = "GAMEPLAY VIDEO";
    $("#viewer-title").textContent = title;
    $("#viewer-external").href = `https://www.youtube.com/watch?v=${youtubeId}`;
    $("#viewer-frame-wrap").innerHTML = `
      <iframe class="youtube-frame" src="https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0"
        title="${escapeHTML(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
    viewerModal.showModal();
    document.body.classList.add("modal-open");
  }

  function openProjectVideo(projectId) {
    const video = getProjectVideo(projectId);
    if (!video) {
      showToast("이 프로젝트의 영상 항목이 아직 등록되지 않았습니다.");
      return;
    }
    openVideo(video.youtubeId, video.title);
  }

  function closeDialog(dialog) {
    if (!dialog.open) return;
    dialog.close();
    if (dialog === viewerModal) {
      $("#viewer-frame-wrap").innerHTML = "";
      $("#viewer-frame-wrap").classList.remove("is-svg-viewer");
    }
    if (![projectModal, viewerModal].some((item) => item.open)) {
      document.body.classList.remove("modal-open");
    }
  }

  function initNavigation() {
    const menuToggle = $(".menu-toggle");
    const nav = $(".primary-nav");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
      nav.classList.toggle("is-open", !isOpen);
    });

    $$("a", nav).forEach((link) => link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "메뉴 열기");
      nav.classList.remove("is-open");
    }));

    const sections = $$("main section[id]");
    const navLinks = $$("a[href^='#']", nav);
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -45%", threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  function initTheme() {
    const button = $(".theme-toggle");
    const saved = localStorage.getItem("portfolio-theme");
    const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (saved === "light" || (!saved && preferredLight)) {
      document.documentElement.dataset.theme = "light";
    }

    const syncIcon = () => {
      const light = document.documentElement.dataset.theme === "light";
      button.innerHTML = `<span aria-hidden="true">${light ? "☾" : "☼"}</span>`;
      button.setAttribute("aria-label", light ? "다크 테마로 전환" : "라이트 테마로 전환");
    };

    syncIcon();

    button.addEventListener("click", () => {
      const light = document.documentElement.dataset.theme === "light";
      document.documentElement.dataset.theme = light ? "dark" : "light";
      localStorage.setItem("portfolio-theme", light ? "dark" : "light");
      syncIcon();
    });
  }

  let revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .12 });
    }

    $$(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
  }

  function initEvents() {
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-hero-prev]")) {
        setHeroSlide(heroSlideIndex - 1);
        return;
      }

      if (event.target.closest("[data-hero-next]")) {
        setHeroSlide(heroSlideIndex + 1);
        return;
      }

      const heroDot = event.target.closest("[data-hero-slide]");
      if (heroDot) {
        setHeroSlide(Number(heroDot.dataset.heroSlide));
        return;
      }

      const projectButton = event.target.closest("[data-open-project]");
      if (projectButton) {
        openProjectModal(projectButton.dataset.openProject);
        return;
      }

      const documentFilterButton = event.target.closest("[data-document-filter]");
      if (documentFilterButton) {
        const project = getProject(projectModal.dataset.activeProject);
        if (project) renderProjectDocuments(project, documentFilterButton.dataset.documentFilter);
        return;
      }

      const documentButton = event.target.closest("[data-document-file]");
      if (documentButton) {
        openDocument(
          documentButton.dataset.documentFile,
          documentButton.dataset.documentTitle,
          documentButton.dataset.projectTitle,
          documentButton.dataset.documentType
        );
        return;
      }

      const videoButton = event.target.closest("[data-youtube-id]");
      if (videoButton) {
        openVideo(videoButton.dataset.youtubeId, videoButton.dataset.videoTitle);
        return;
      }

      const projectVideoButton = event.target.closest("[data-project-video]");
      if (projectVideoButton) {
        openProjectVideo(projectVideoButton.dataset.projectVideo);
        return;
      }

      if (event.target.closest("[data-show-all-projects]")) {
        $("#projects").scrollIntoView({ behavior: "smooth" });
        $$(".project-card").forEach((card, index) => {
          setTimeout(() => card.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(0)" }
          ], { duration: 420, easing: "ease" }), index * 100);
        });
        return;
      }

      if (event.target.closest("[data-close-modal]")) {
        closeDialog(projectModal);
        return;
      }

      if (event.target.closest("[data-close-viewer]")) {
        closeDialog(viewerModal);
      }
    });

    [projectModal, viewerModal].forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });

      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeDialog(dialog);
      });
    });
  }

  function init() {
    initHeroSlider();
    renderProjects();
    renderVideos();
    renderContact();
    initNavigation();
    initTheme();
    initEvents();
    observeReveals();
    $("#current-year").textContent = new Date().getFullYear();
  }

  init();
})();
