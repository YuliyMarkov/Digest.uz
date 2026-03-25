// =================== ВСПОМОГАТЕЛЬНЫЕ ===================

function $(id) {
  return document.getElementById(id);
}

function isMobileWidth() {
  return window.innerWidth <= 700;
}

// =================== ТЁМНАЯ ТЕМА ===================

const themeToggle = $("theme-toggle");
const savedTheme = localStorage.getItem("site-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  if (themeToggle) {
    themeToggle.checked = true;
  }
}

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    const isDark = themeToggle.checked;
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("site-theme", isDark ? "dark" : "light");
  });
}

// =================== ЯЗЫК ===================

const langButtons = document.querySelectorAll(".lang-btn");
const LANG_STORAGE_KEY = "site-language";
const DEFAULT_LANG = "ru";

function applyLanguage(lang) {
  const normalizedLang = lang === "uz" ? "uz" : "ru";

  document.documentElement.lang = normalizedLang;

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === normalizedLang);
  });

  localStorage.setItem(LANG_STORAGE_KEY, normalizedLang);
}

function initLanguage() {
  const savedLang = localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
  applyLanguage(savedLang);
}

if (langButtons.length) {
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.dataset.lang;
      applyLanguage(selectedLang);
    });
  });

  initLanguage();
}

// =================== БУРГЕР ===================

const burgerBtn = $("burgerBtn");
const navMenu = $("navMenu");

function closeBurgerMenu() {
  if (!navMenu || !burgerBtn) return;
  navMenu.classList.remove("active");
  burgerBtn.setAttribute("aria-expanded", "false");
}

function toggleBurgerMenu() {
  if (!navMenu || !burgerBtn) return;
  const isActive = navMenu.classList.toggle("active");
  burgerBtn.setAttribute("aria-expanded", String(isActive));
}

if (burgerBtn && navMenu) {
  burgerBtn.addEventListener("click", toggleBurgerMenu);
}

// =================== ПОИСК ===================

const searchToggle = $("searchToggle");
const desktopSearchBar = $("desktopSearchBar");
const desktopSearchForm = $("desktopSearchForm");
const desktopSearchInput = $("desktopSearchInput");
const mobileSearchForm = $("mobileSearchForm");
const mobileSearchInput = $("mobileSearchInput");

function openDesktopSearch() {
  if (!desktopSearchBar || !searchToggle) return;

  desktopSearchBar.classList.add("active");
  searchToggle.setAttribute("aria-expanded", "true");
  searchToggle.setAttribute("aria-label", "Закрыть поиск");

  if (desktopSearchInput) {
    setTimeout(() => desktopSearchInput.focus(), 180);
  }
}

function closeDesktopSearch() {
  if (!desktopSearchBar || !searchToggle) return;

  desktopSearchBar.classList.remove("active");
  searchToggle.setAttribute("aria-expanded", "false");
  searchToggle.setAttribute("aria-label", "Открыть поиск");
}

function toggleDesktopSearch() {
  if (!desktopSearchBar) return;

  const isActive = desktopSearchBar.classList.contains("active");
  if (isActive) {
    closeDesktopSearch();
  } else {
    openDesktopSearch();
  }
}

function handleSearch(query) {
  const value = String(query || "").trim();
  if (!value) return;

  console.log("Поисковый запрос:", value);

  const url = new URL(window.location.href);
  url.searchParams.set("search", value);
  window.location.href = url.toString();
}

if (searchToggle) {
  searchToggle.addEventListener("click", toggleDesktopSearch);
}

if (desktopSearchForm) {
  desktopSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(desktopSearchInput ? desktopSearchInput.value : "");
  });
}

if (mobileSearchForm) {
  mobileSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(mobileSearchInput ? mobileSearchInput.value : "");
  });
}

// =================== AUTH MODAL ===================

const authToggle = $("authToggle");
const mobileAuthTrigger = $("mobileAuthTrigger");
const authModal = $("authModal");
const authModalClose = $("authModalClose");
const authModalBackdrop = $("authModalBackdrop");
const loginTab = $("loginTab");
const registerTab = $("registerTab");
const loginPanel = $("loginPanel");
const registerPanel = $("registerPanel");
const loginForm = $("loginForm");
const registerForm = $("registerForm");

function switchAuthTab(tab) {
  if (!loginTab || !registerTab || !loginPanel || !registerPanel) return;

  const isLogin = tab === "login";
  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);
  loginPanel.classList.toggle("active", isLogin);
  registerPanel.classList.toggle("active", !isLogin);
}

function openAuthModal(tab = "login") {
  if (!authModal) return;

  authModal.classList.add("active");
  authModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  switchAuthTab(tab);
}

function closeAuthModal() {
  if (!authModal) return;

  authModal.classList.remove("active");
  authModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (authToggle) {
  authToggle.addEventListener("click", () => openAuthModal("login"));
}

if (mobileAuthTrigger) {
  mobileAuthTrigger.addEventListener("click", () => openAuthModal("login"));
}

if (authModalClose) {
  authModalClose.addEventListener("click", closeAuthModal);
}

if (authModalBackdrop) {
  authModalBackdrop.addEventListener("click", closeAuthModal);
}

if (loginTab) {
  loginTab.addEventListener("click", () => switchAuthTab("login"));
}

if (registerTab) {
  registerTab.addEventListener("click", () => switchAuthTab("register"));
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Форма входа отправлена");
    closeAuthModal();
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Форма регистрации отправлена");
    closeAuthModal();
  });
}

// =================== SHARE DROPDOWN ===================

const shareBox = $("shareBox");
const shareToggleBtn = $("shareToggleBtn");
const shareDropdown = $("shareDropdown");
const shareTelegram = $("shareTelegram");
const shareFacebook = $("shareFacebook");

function closeShareDropdown() {
  if (!shareDropdown || !shareToggleBtn) return;
  shareDropdown.classList.remove("active");
  shareToggleBtn.setAttribute("aria-expanded", "false");
}

function openShareDropdown() {
  if (!shareDropdown || !shareToggleBtn) return;
  shareDropdown.classList.add("active");
  shareToggleBtn.setAttribute("aria-expanded", "true");
}

function toggleShareDropdown() {
  if (!shareDropdown) return;
  const isActive = shareDropdown.classList.contains("active");
  if (isActive) {
    closeShareDropdown();
  } else {
    openShareDropdown();
  }
}

if (shareToggleBtn) {
  shareToggleBtn.addEventListener("click", toggleShareDropdown);
}

if (shareTelegram || shareFacebook) {
  const currentUrl = encodeURIComponent(window.location.href);
  const currentTitle = encodeURIComponent(document.title);

  if (shareTelegram) {
    shareTelegram.href = `https://t.me/share/url?url=${currentUrl}&text=${currentTitle}`;
  }

  if (shareFacebook) {
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  }
}

// =================== КОММЕНТАРИИ ===================

const commentForm = $("commentForm");
const commentName = $("commentName");
const commentText = $("commentText");
const commentsList = $("commentsList");
const commentsCount = $("commentsCount");

function updateCommentsCount() {
  if (!commentsList || !commentsCount) return;
  const totalComments = commentsList.querySelectorAll(".comment-card").length;
  commentsCount.textContent = String(totalComments);
}

function formatCommentDate() {
  const now = new Date();
  return now.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createCommentCard(name, text) {
  const article = document.createElement("article");
  article.className = "comment-card";

  article.innerHTML = `
    <div class="comment-top">
      <h3>${escapeHtml(name)}</h3>
      <span>${formatCommentDate()}</span>
    </div>
    <p>${escapeHtml(text)}</p>
  `;

  return article;
}

if (commentForm && commentName && commentText && commentsList) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = commentName.value.trim();
    const textValue = commentText.value.trim();

    if (!nameValue || !textValue) return;

    const newComment = createCommentCard(nameValue, textValue);
    commentsList.prepend(newComment);

    commentForm.reset();
    updateCommentsCount();
  });

  updateCommentsCount();
}

// ================= TOP NEWS SLIDER =================

const topNewsTrack = document.getElementById("topNewsTrack");
const topNewsDots = document.querySelectorAll(".top-news-dot");
const topNewsPrev = document.getElementById("topNewsPrev");
const topNewsNext = document.getElementById("topNewsNext");

if (topNewsTrack && topNewsDots.length) {
  const slides = Array.from(topNewsTrack.children);
  let currentSlide = 0;
  let autoplayInterval = null;
  let touchStartX = 0;
  let touchEndX = 0;

  const updateSlider = () => {
    topNewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    topNewsDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateSlider();
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 4500);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  if (topNewsPrev) {
    topNewsPrev.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (topNewsNext) {
    topNewsNext.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  topNewsDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  // Свайп для мобильной версии
  topNewsTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: true }
  );

  topNewsTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      startAutoplay();
    },
    { passive: true }
  );

  // Пауза при наведении на десктопе
  topNewsTrack.addEventListener("mouseenter", stopAutoplay);
  topNewsTrack.addEventListener("mouseleave", startAutoplay);

  updateSlider();
  startAutoplay();
}

// =================== ГЛАВНАЯ: REELS ===================

const reelsViewport = $("reelsViewport");
const reelsTrack = $("reelsTrack");
const reelsPrev = $("reelsPrev");
const reelsNext = $("reelsNext");

if (reelsViewport && reelsTrack && reelsPrev && reelsNext) {
  let reelsIndex = 0;

  function getReelsItems() {
    return reelsTrack.querySelectorAll(
      ".reels-list-item, .reels-list-item-more",
    );
  }

  function getReelsStep() {
    const firstItem = reelsTrack.querySelector(
      ".reels-list-item, .reels-list-item-more",
    );
    if (!firstItem) return 0;

    const itemWidth = firstItem.getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(reelsTrack);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;

    return itemWidth + gap;
  }

  function getVisibleReelsCount() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function getMaxReelsIndex() {
    const items = getReelsItems().length;
    return Math.max(0, items - getVisibleReelsCount());
  }

  function updateReelsButtons() {
    const maxIndex = getMaxReelsIndex();
    reelsPrev.disabled = reelsIndex <= 0;
    reelsNext.disabled = reelsIndex >= maxIndex;
  }

  function renderReels() {
    if (window.innerWidth <= 700) {
      reelsTrack.style.transform = "none";
      updateReelsButtons();
      return;
    }

    const step = getReelsStep();
    reelsTrack.style.transform = `translateX(-${reelsIndex * step}px)`;
    updateReelsButtons();
  }

  reelsPrev.addEventListener("click", () => {
    reelsIndex = Math.max(0, reelsIndex - 1);
    renderReels();
  });

  reelsNext.addEventListener("click", () => {
    reelsIndex = Math.min(getMaxReelsIndex(), reelsIndex + 1);
    renderReels();
  });

  window.addEventListener("resize", () => {
    reelsIndex = Math.min(reelsIndex, getMaxReelsIndex());
    renderReels();
  });

  renderReels();
}

// =================== REELS MODAL ===================

const reelsModal = $("reelsModal");
const reelsModalBackdrop = $("reelsModalBackdrop");
const reelsModalClose = $("reelsModalClose");
const reelsModalContent = $("reelsModalContent");
const reelsPreviewButtons = document.querySelectorAll(
  ".reels-card-preview[data-video]",
);

function openReelsModal(videoUrl) {
  if (!reelsModal || !reelsModalContent || !videoUrl) return;

  reelsModalContent.innerHTML = `
    <iframe
      src="${videoUrl}"
      title="Instagram Reel"
      allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
      allowfullscreen
      loading="eager"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  `;

  reelsModal.classList.add("active");
  reelsModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReelsModal() {
  if (!reelsModal || !reelsModalContent) return;

  reelsModal.classList.remove("active");
  reelsModal.setAttribute("aria-hidden", "true");
  reelsModalContent.innerHTML = "";
  document.body.style.overflow = "";
}

reelsPreviewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const video = button.dataset.video;
    if (video) openReelsModal(video);
  });
});

if (reelsModalBackdrop) {
  reelsModalBackdrop.addEventListener("click", closeReelsModal);
}

if (reelsModalClose) {
  reelsModalClose.addEventListener("click", closeReelsModal);
}

// =================== БОЛЬШЕ НОВОСТЕЙ: УНИВЕРСАЛЬНО ===================

const loadMoreNewsBtn = $("loadMoreNews");
const moreNewsGrid = $("moreNewsGrid");
const categoryNewsGrid = $("categoryNewsGrid");

const pageType = document.querySelector(".article-page")
  ? "article"
  : document.querySelector(".category-news-section")
    ? "category"
    : "home";

const homeMoreNewsData = [
  {
    image: "Photos-for-Site/photo_2026-03-16_11-58-02.jpg",
    title:
      "В столице начали обновлять общественные пространства в нескольких районах",
    text: "Новые проекты затрагивают благоустройство улиц, озеленение и модернизацию городской среды.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_13-50-12.jpg",
    title:
      "В Узбекистане усилили внимание к вопросам транспортной инфраструктуры",
    text: "Речь идёт о развитии магистралей, обновлении узлов и повышении удобства для жителей.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-10-58.jpg",
    title:
      "В ряде регионов страны продолжают запускать новые городские инициативы",
    text: "Местные проекты направлены на повышение качества жизни и развитие общественных пространств.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-24-06.jpg",
    title:
      "Синоптики рассказали, какой будет погода в Узбекистане в ближайшие дни",
    text: "По прогнозу, в отдельных районах возможны осадки и постепенное изменение температуры.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_13-43-45.jpg",
    title: "В Ташкенте обсуждают новые подходы к регулированию трафика",
    text: "Городские службы рассматривают дополнительные меры для снижения нагрузки на центр столицы.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_04-50-32.jpg",
    title: "Цифровые сервисы для жителей страны продолжают расширять",
    text: "Новые решения должны сделать доступ к информации и услугам более удобным и быстрым.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/file_69b7e2a2c8865_avif.avif",
    title:
      "В регионах наметился рост интереса к локальным общественным проектам",
    text: "Инициативы всё чаще ориентированы на комфортную городскую среду и вовлечение жителей.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/file_69b7ecdda2a38_avif.avif",
    title:
      "В стране продолжают обсуждать меры по улучшению городской логистики",
    text: "Эксперты отмечают важность комплексного подхода к транспортным и инфраструктурным решениям.",
    link: "News.html",
  },
];

const categoryMoreNewsData = [
  {
    image: "Photos-for-Site/photo_2026-03-16_11-58-02.jpg",
    title:
      "В столице начали обновлять общественные пространства в нескольких районах",
    text: "Новые проекты затрагивают благоустройство улиц, озеленение и модернизацию городской среды.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_13-50-12.jpg",
    title:
      "В Узбекистане усилили внимание к вопросам транспортной инфраструктуры",
    text: "Речь идёт о развитии магистралей, обновлении узлов и повышении удобства для жителей.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-10-58.jpg",
    title:
      "В ряде регионов страны продолжают запускать новые городские инициативы",
    text: "Местные проекты направлены на повышение качества жизни и развитие общественных пространств.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-24-06.jpg",
    title:
      "Синоптики рассказали, какой будет погода в Узбекистане в ближайшие дни",
    text: "По прогнозу, в отдельных районах возможны осадки и постепенное изменение температуры.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_13-43-45.jpg",
    title: "В Ташкенте обсуждают новые подходы к регулированию трафика",
    text: "Городские службы рассматривают дополнительные меры для снижения нагрузки на центр столицы.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_04-50-32.jpg",
    title: "Цифровые сервисы для жителей страны продолжают расширять",
    text: "Новые решения должны сделать доступ к информации и услугам более удобным и быстрым.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/file_69b7e2a2c8865_avif.avif",
    title:
      "В регионах наметился рост интереса к локальным общественным проектам",
    text: "Инициативы всё чаще ориентированы на комфортную городскую среду и вовлечение жителей.",
    link: "News.html",
  },
  {
    image: "Photos-for-Site/file_69b7ecdda2a38_avif.avif",
    title:
      "В стране продолжают обсуждать меры по улучшению городской логистики",
    text: "Эксперты отмечают важность комплексного подхода к транспортным и инфраструктурным решениям.",
    link: "News.html",
  },
];

let loadedNewsCount = 0;
const newsBatchSize = 4;

function createHomeOrArticleMoreNewsCard(item) {
  const article = document.createElement("article");
  article.className = "more-news-card";

  article.innerHTML = `
    <a href="${item.link}" class="more-news-card-link" aria-label="Открыть новость">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" />
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </a>
  `;

  return article;
}

function createCategoryNewsCard(item) {
  const article = document.createElement("article");
  article.className = "category-news-card";

  article.innerHTML = `
    <a href="${item.link}" class="category-news-card-link" aria-label="Открыть новость">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" />
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </a>
  `;

  return article;
}

function loadMoreNews() {
  if (!loadMoreNewsBtn) return;

  if ((pageType === "home" || pageType === "article") && moreNewsGrid) {
    const nextItems = homeMoreNewsData.slice(
      loadedNewsCount,
      loadedNewsCount + newsBatchSize,
    );

    nextItems.forEach((item) => {
      moreNewsGrid.appendChild(createHomeOrArticleMoreNewsCard(item));
    });

    loadedNewsCount += nextItems.length;

    if (loadedNewsCount >= homeMoreNewsData.length) {
      loadMoreNewsBtn.style.display = "none";
    }

    return;
  }

  if (pageType === "category" && categoryNewsGrid) {
    const nextItems = categoryMoreNewsData.slice(
      loadedNewsCount,
      loadedNewsCount + newsBatchSize,
    );

    nextItems.forEach((item) => {
      categoryNewsGrid.appendChild(createCategoryNewsCard(item));
    });

    loadedNewsCount += nextItems.length;

    if (loadedNewsCount >= categoryMoreNewsData.length) {
      loadMoreNewsBtn.style.display = "none";
    }
  }
}

if (loadMoreNewsBtn) {
  loadMoreNewsBtn.addEventListener("click", loadMoreNews);
}

// =================== ОБЩИЕ СЛУШАТЕЛИ ===================

document.addEventListener("click", (e) => {
  if (
    !isMobileWidth() &&
    desktopSearchBar &&
    searchToggle &&
    desktopSearchBar.classList.contains("active") &&
    !desktopSearchBar.contains(e.target) &&
    !searchToggle.contains(e.target)
  ) {
    closeDesktopSearch();
  }

  if (shareBox && !shareBox.contains(e.target)) {
    closeShareDropdown();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    closeBurgerMenu();
  }

  if (window.innerWidth <= 700) {
    closeDesktopSearch();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDesktopSearch();
    closeAuthModal();
    closeShareDropdown();
    closeReelsModal();
  }
});
