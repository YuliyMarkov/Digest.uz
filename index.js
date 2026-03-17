// =================== ТЁМНАЯ ТЕМА ===================

const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggleBtn.checked);
  });
}

// =================== СЛАЙДЕР ГЛАВНЫХ НОВОСТЕЙ ===================

const track = document.getElementById("topNewsTrack");
const prevBtn = document.getElementById("topNewsPrev");
const nextBtn = document.getElementById("topNewsNext");
const dots = document.querySelectorAll(".top-news-dot");
const slides = document.querySelectorAll(".top-slide");
const sliderViewport = document.querySelector(".top-news-viewport");

let index = 0;
let autoSlideInterval = null;

function updateSlider() {
  if (!track) return;

  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToNextSlide() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  updateSlider();
}

function goToPrevSlide() {
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  updateSlider();
}

function startAutoSlide() {
  if (slides.length <= 1) return;
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    goToNextSlide();
  }, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

if (track && slides.length) {
  updateSlider();
  startAutoSlide();
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    goToNextSlide();
    startAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    goToPrevSlide();
    startAutoSlide();
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    index = Number(dot.dataset.slide);
    updateSlider();
    startAutoSlide();
  });
});

// =================== СВАЙП ГЛАВНЫХ НОВОСТЕЙ ===================

let startX = 0;
let endX = 0;

if (sliderViewport) {
  sliderViewport.addEventListener("touchstart", (e) => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
    endX = startX;
  });

  sliderViewport.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  sliderViewport.addEventListener("touchend", () => {
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }

    startAutoSlide();
  });

  sliderViewport.addEventListener("mouseenter", stopAutoSlide);
  sliderViewport.addEventListener("mouseleave", startAutoSlide);
}

// =================== БУРГЕР МЕНЮ ===================

const burger = document.getElementById("burgerBtn");
const nav = document.getElementById("navMenu");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isActive = nav.classList.toggle("active");
    burger.setAttribute("aria-expanded", String(isActive));
  });
}

// =================== ПОИСК ===================

const searchToggle = document.getElementById("searchToggle");
const desktopSearchBar = document.getElementById("desktopSearchBar");
const desktopSearchForm = document.getElementById("desktopSearchForm");
const desktopSearchInput = document.getElementById("desktopSearchInput");
const mobileSearchForm = document.getElementById("mobileSearchForm");
const mobileSearchInput = document.getElementById("mobileSearchInput");

function isMobileSearchMode() {
  return window.innerWidth <= 700;
}

function openDesktopSearch() {
  if (!desktopSearchBar || !searchToggle) return;

  desktopSearchBar.classList.add("active");
  searchToggle.setAttribute("aria-expanded", "true");
  searchToggle.setAttribute("aria-label", "Закрыть поиск");

  if (desktopSearchInput) {
    setTimeout(() => {
      desktopSearchInput.focus();
    }, 180);
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
  const value = query.trim();

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

document.addEventListener("click", (e) => {
  if (
    !isMobileSearchMode() &&
    desktopSearchBar &&
    searchToggle &&
    desktopSearchBar.classList.contains("active") &&
    !desktopSearchBar.contains(e.target) &&
    !searchToggle.contains(e.target)
  ) {
    closeDesktopSearch();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    if (nav) {
      nav.classList.remove("active");
    }

    if (burger) {
      burger.setAttribute("aria-expanded", "false");
    }
  }

  if (window.innerWidth <= 700) {
    closeDesktopSearch();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDesktopSearch();
  }
});

// =================== AUTH MODAL ===================

const authToggle = document.getElementById("authToggle");
const mobileAuthTrigger = document.getElementById("mobileAuthTrigger");
const authModal = document.getElementById("authModal");
const authModalClose = document.getElementById("authModalClose");
const authModalBackdrop = document.getElementById("authModalBackdrop");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

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

function switchAuthTab(tab) {
  if (!loginTab || !registerTab || !loginPanel || !registerPanel) return;

  const isLogin = tab === "login";

  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);
  loginPanel.classList.toggle("active", isLogin);
  registerPanel.classList.toggle("active", !isLogin);
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

// =================== REELS SLIDER ===================

const reelsTrack = document.getElementById("reelsTrack");
const reelsPrev = document.getElementById("reelsPrev");
const reelsNext = document.getElementById("reelsNext");
const reelsItems = document.querySelectorAll(".reels-list-item");
const reelsViewport = document.getElementById("reelsViewport");

let reelsIndex = 0;

function isMobileReels() {
  return window.innerWidth <= 700;
}

function getReelsVisibleCount() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

function getReelsStep() {
  if (!reelsItems.length || !reelsTrack) return 0;

  const itemWidth = reelsItems[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(reelsTrack).gap, 10) || 0;

  return itemWidth + gap;
}

function getMaxReelsIndex() {
  return Math.max(0, reelsItems.length - getReelsVisibleCount());
}

function updateReelsSlider() {
  if (!reelsTrack || !reelsItems.length) return;

  if (isMobileReels()) {
    reelsTrack.style.transform = "none";
    return;
  }

  const maxIndex = getMaxReelsIndex();

  if (reelsIndex > maxIndex) reelsIndex = 0;
  if (reelsIndex < 0) reelsIndex = 0;

  reelsTrack.style.transform = `translateX(-${reelsIndex * getReelsStep()}px)`;
}

if (reelsNext) {
  reelsNext.addEventListener("click", () => {
    const maxIndex = getMaxReelsIndex();

    if (reelsIndex >= maxIndex) {
      reelsIndex = 0;
    } else {
      reelsIndex++;
    }

    updateReelsSlider();
  });
}

if (reelsPrev) {
  reelsPrev.addEventListener("click", () => {
    const maxIndex = getMaxReelsIndex();

    if (reelsIndex <= 0) {
      reelsIndex = maxIndex;
    } else {
      reelsIndex--;
    }

    updateReelsSlider();
  });
}

window.addEventListener("load", updateReelsSlider);
window.addEventListener("resize", updateReelsSlider);

// =================== REELS MODAL ===================

const reelsModal = document.getElementById("reelsModal");
const reelsModalFrame = document.getElementById("reelsModalFrame");
const reelsModalClose = document.getElementById("reelsModalClose");
const reelsModalBackdrop = document.getElementById("reelsModalBackdrop");
const reelsPreviewButtons = document.querySelectorAll(".reels-card-preview");

function openReelsModal(src) {
  if (!reelsModal || !reelsModalFrame || !src) return;

  reelsModalFrame.src = src;
  reelsModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReelsModal() {
  if (!reelsModal || !reelsModalFrame) return;

  reelsModal.classList.remove("active");
  reelsModalFrame.src = "";
  document.body.style.overflow = "";
}

reelsPreviewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.video;
    openReelsModal(src);
  });
});

if (reelsModalClose) {
  reelsModalClose.addEventListener("click", closeReelsModal);
}

if (reelsModalBackdrop) {
  reelsModalBackdrop.addEventListener("click", closeReelsModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeReelsModal();
    closeAuthModal();
  }
});

