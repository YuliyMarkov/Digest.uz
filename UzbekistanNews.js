// =================== ТЁМНАЯ ТЕМА ===================

const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggleBtn.checked);
  });
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
    closeAuthModal();
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

// =================== БОЛЬШЕ НОВОСТЕЙ ===================

const loadMoreNewsBtn = document.getElementById("loadMoreNews");
const categoryNewsGrid = document.getElementById("categoryNewsGrid");

const moreNewsData = [
  {
    image: "Photos-for-Site/photo_2026-03-16_11-58-02.jpg",
    title: "В столице начали обновлять общественные пространства в нескольких районах",
    text: "Новые проекты затрагивают благоустройство улиц, озеленение и модернизацию городской среды.",
    link: "#",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_13-50-12.jpg",
    title: "В Узбекистане усилили внимание к вопросам транспортной инфраструктуры",
    text: "Речь идёт о развитии магистралей, обновлении узлов и повышении удобства для жителей.",
    link: "#",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-10-58.jpg",
    title: "В ряде регионов страны продолжают запускать новые городские инициативы",
    text: "Местные проекты направлены на повышение качества жизни и развитие общественных пространств.",
    link: "#",
  },
  {
    image: "Photos-for-Site/photo_2026-03-16_17-24-06.jpg",
    title: "Синоптики рассказали, какой будет погода в Узбекистане в ближайшие дни",
    text: "По прогнозу, в отдельных районах возможны осадки и постепенное изменение температуры.",
    link: "#",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_13-43-45.jpg",
    title: "В Ташкенте обсуждают новые подходы к регулированию трафика",
    text: "Городские службы рассматривают дополнительные меры для снижения нагрузки на центр столицы.",
    link: "#",
  },
  {
    image: "Photos-for-Site/photo_2026-03-15_04-50-32.jpg",
    title: "Цифровые сервисы для жителей страны продолжают расширять",
    text: "Новые решения должны сделать доступ к информации и услугам более удобным и быстрым.",
    link: "#",
  },
  {
    image: "Photos-for-Site/file_69b7e2a2c8865_avif.avif",
    title: "В регионах наметился рост интереса к локальным общественным проектам",
    text: "Инициативы всё чаще ориентированы на комфортную городскую среду и вовлечение жителей.",
    link: "#",
  },
  {
    image: "Photos-for-Site/file_69b7ecdda2a38_avif.avif",
    title: "В стране продолжают обсуждать меры по улучшению городской логистики",
    text: "Эксперты отмечают важность комплексного подхода к транспортным и инфраструктурным решениям.",
    link: "#",
  },
];

let loadedNewsCount = 0;
const newsBatchSize = 4;

function createMoreNewsCard(item) {
  const article = document.createElement("article");
  article.className = "category-news-card";

  article.innerHTML = `
    <a href="${item.link}" class="category-news-card-link" aria-label="Открыть новость">
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </a>
  `;

  return article;
}

function loadMoreNews() {
  if (!categoryNewsGrid || !loadMoreNewsBtn) return;

  const nextItems = moreNewsData.slice(
    loadedNewsCount,
    loadedNewsCount + newsBatchSize
  );

  nextItems.forEach((item) => {
    const card = createMoreNewsCard(item);
    categoryNewsGrid.appendChild(card);
  });

  loadedNewsCount += nextItems.length;

  if (loadedNewsCount >= moreNewsData.length) {
    loadMoreNewsBtn.style.display = "none";
  }
}

if (loadMoreNewsBtn) {
  loadMoreNewsBtn.addEventListener("click", loadMoreNews);
}