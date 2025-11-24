// Smooth scroll for nav links
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth'
            });
            navList.classList.remove('open');
        }
    });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

// Active link on scroll (simple version)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const offsetTop = sec.offsetTop - 120;
        if (pageYOffset >= offsetTop) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Back to top visibility
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (demo only)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    formNote.textContent = "Thanks for your message. This demo form doesn’t actually send email, but it shows I can handle forms and validation.";
});

// Theme toggle (light / dark)
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
});

// Simple "What I learned" modal
const modalData = {
    weather: [
        "Handling API errors and empty states.",
        "Working with async/await and fetch.",
        "Keeping UI usable even when data is loading."
    ],
    "friend-portfolio": [
        "Talking with a non-technical client.",
        "Keeping the layout simple and focused on content.",
        "Exporting assets from Figma and optimising images."
    ],
    "task-tracker": [
        "Using localStorage for data persistence.",
        "Keeping JS modular and readable.",
        "Thinking about small details like keyboard usage."
    ]
};

const backdrop = document.createElement('div');
backdrop.className = 'modal-backdrop';
backdrop.innerHTML = `
    <div class="modal">
        <h3 id="modalTitle">What I learned</h3>
        <ul id="modalList"></ul>
        <button class="btn ghost" id="modalClose">Close</button>
    </div>
`;
document.body.appendChild(backdrop);

const modalList = backdrop.querySelector('#modalList');
const modalClose = backdrop.querySelector('#modalClose');

document.querySelectorAll('.project-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.project;
        const items = modalData[key] || [];
        modalList.innerHTML = items.map(i => `<li>${i}</li>`).join('');
        backdrop.style.display = 'flex';
    });
});

modalClose.addEventListener('click', () => {
    backdrop.style.display = 'none';
});

backdrop.addEventListener('click', e => {
    if (e.target === backdrop) backdrop.style.display = 'none';
});
