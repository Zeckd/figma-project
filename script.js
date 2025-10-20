const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
    btnDarkMode.classList.add("dark-mode-btn--active");
	document.body.classList.add("dark");
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Если меняются системные настройки, меняем тему
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
			btnDarkMode.classList.add("dark-mode-btn--active");
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "dark");
		} else {
			btnDarkMode.classList.remove("dark-mode-btn--active");
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "light");
		}
    });

// Включение ночного режима по кнопке
if (btnDarkMode) {
    btnDarkMode.onclick = function () {
        btnDarkMode.classList.toggle("dark-mode-btn--active");
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", isDark ? "dark" : "light");
    };
}

// ====== Burger menu ======
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

function openMenu() {
  if (!burger || !menu) return;
  burger.setAttribute('aria-expanded', 'true');
  menu.classList.add('open');
}

function closeMenu() {
  if (!burger || !menu) return;
  burger.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
}

function toggleMenu() {
  if (!burger || !menu) return;
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  if (expanded) closeMenu(); else openMenu();
}

if (burger) {
  burger.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  if (expanded) closeMenu(); else openMenu();
}

// Close on menu item click (mobile)
if (menu) {
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
      closeMenu();
    }
  });
}

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burger && burger.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});






// Приветствие
(function initGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  let userName = localStorage.getItem('userName');
  if (!userName) {
    const input = prompt("Как тебя зовут?");
    userName = (input || '').trim();
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }

  greetingEl.textContent = userName
    ? `Привет, ${userName}! Добро пожаловать на мой сайт.`
    : "Привет!";

  // Плавный скролл к началу страницы при клике по приветствию на главной
  greetingEl.addEventListener('click', (e) => {
    // Если мы уже на главной, отменяем переход и скроллим вверх
    const onHome = /index\.html?$/.test(location.pathname) || location.pathname.endsWith('/')
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();




// Кнопка «Наверх»
(function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;
  const SHOW_AFTER = 300;
  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_AFTER) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();




// Отзывы (testimonials)
function renderTestimonials(items) {
  const list = document.getElementById('testimonialsList');
  if (!list || !Array.isArray(items)) return;

  list.innerHTML = items.map((t) => `
    <article class="testimonial">
      <p>“${t.quote}”</p>
      <cite>${t.author}${t.role ? `, ${t.role}` : ''}</cite>
    </article>
  `).join('');
}

if (window.PORTFOLIO_DATA && Array.isArray(window.PORTFOLIO_DATA.testimonials)) {
  renderTestimonials(window.PORTFOLIO_DATA.testimonials);
}

// Плавная прокрутка к проектам при клике в навигации, если мы на главной
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  const isProjectsAnchor = url.hash === '#projects';
  const isSamePage = url.pathname.replace(/\/index\.html?$/, '/') === location.pathname.replace(/\/index\.html?$/, '/');
  if (isProjectsAnchor && isSamePage) {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});



// contact

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась

    status.textContent = "Сообщение отправлено!";
    status.style.color = "green";

    // Очистим поля после отправки
    form.reset();
  });
});
