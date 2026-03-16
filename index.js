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
    nav.classList.toggle("active");
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
  }
});