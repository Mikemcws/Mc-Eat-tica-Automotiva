/* ========================
   MFM Estética Automotiva
   script.js
======================== */

/* ========================
   1. MENU MOBILE
======================== */
const menuBtn = document.getElementById('menu-btn');
const nav     = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});


/* ========================
   2. HEADER AO ROLAR
======================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});


/* ========================
   3. LINK ATIVO NO NAV
======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


/* ========================
   4. ANIMAÇÃO AO APARECER
   (Intersection Observer)
======================== */
const animatedEls = document.querySelectorAll(
  '.service-card, .dep-card, .about-num-item, .gallery-item, .contact-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});


/* ========================
   5. CONTADOR ANIMADO (STATS)
======================== */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isPlus  = String(target).includes('+');
  const isStar  = String(target).includes('★');
  const isPerc  = String(target).includes('%');
  const numOnly = parseInt(target);

  const step = Math.ceil(numOnly / (duration / 16));

  const timer = setInterval(() => {
    start += step;
    if (start >= numOnly) {
      start = numOnly;
      clearInterval(timer);
    }
    el.textContent = start + (isPlus ? '+' : isPerc ? '%' : isStar ? '★' : '');
  }, 16);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => {
        const original = el.textContent.trim();
        animateCounter(el, original);
      });
    }
  });
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);


/* ========================
   6. FORMULÁRIO → WHATSAPP
======================== */
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome    = document.getElementById('nome').value.trim();
    const tel     = document.getElementById('tel').value.trim();
    const servico = document.getElementById('servico').value;
    const msg     = document.getElementById('msg').value.trim();

    // Validação básica
    if (!nome || !tel || !servico) {
      alert('Por favor, preencha nome, telefone e serviço.');
      return;
    }

    // ⚠️ ALTERE o número abaixo: DDI(55) + DDD + número sem espaços
    const numero = '5516999999999';

    const texto = [
      `Olá! Vim pelo site da MFM 😊`,
      ``,
      `*Nome:* ${nome}`,
      `*Telefone:* ${tel}`,
      `*Serviço:* ${servico}`,
      msg ? `*Mensagem:* ${msg}` : null,
    ].filter(Boolean).join('\n');

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
      '_blank'
    );
  });
}


/* ========================
   7. GALERIA — LIGHTBOX SIMPLES
======================== */
// Só ativa se houver imagens reais na galeria
const galleryItems = document.querySelectorAll('.gallery-item img');

if (galleryItems.length > 0) {

  // Cria o overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <button class="lb-close"><i class="fa-solid fa-xmark"></i></button>
    <button class="lb-prev"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="lb-next"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>
  `;
  document.body.appendChild(overlay);

  const lbImg      = overlay.querySelector('.lb-img');
  const lbClose    = overlay.querySelector('.lb-close');
  const lbPrev     = overlay.querySelector('.lb-prev');
  const lbNext     = overlay.querySelector('.lb-next');
  const lbBackdrop = overlay.querySelector('.lb-backdrop');

  const images = [...galleryItems];
  let current = 0;

  function openLightbox(index) {
    current = index;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  images.forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    lbImg.src = images[current].src;
  });

  lbNext.addEventListener('click', () => {
    current = (current + 1) % images.length;
    lbImg.src = images[current].src;
  });

  // Fechar com ESC, navegar com setas
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lbPrev.click();
    if (e.key === 'ArrowRight')  lbNext.click();
  });

  // Estilos do lightbox injetados dinamicamente
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    #lightbox { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
    #lightbox.active { display: flex; }
    .lb-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.92); }
    .lb-img-wrap { position: relative; z-index: 1; max-width: 90vw; max-height: 85vh; }
    .lb-img { max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: 3px; display: block; }
    .lb-close, .lb-prev, .lb-next {
      position: absolute; z-index: 2; background: rgba(245,195,21,0.15);
      border: 1px solid #F5C315; color: #F5C315; cursor: pointer;
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; transition: background 0.2s;
    }
    .lb-close:hover, .lb-prev:hover, .lb-next:hover { background: rgba(245,195,21,0.35); }
    .lb-close { top: 20px; right: 20px; }
    .lb-prev  { left: 20px;  top: 50%; transform: translateY(-50%); }
    .lb-next  { right: 20px; top: 50%; transform: translateY(-50%); }
  `;
  document.head.appendChild(lbStyle);
}


/* ========================
   8. SCROLL SUAVE PARA ÂNCORAS
   (fallback para browsers antigos)
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 65; // altura do header fixo
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ========================
   9. CSS DAS ANIMAÇÕES
   (injetado via JS para não depender do CSS)
======================== */
const animStyle = document.createElement('style');
animStyle.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav a.active {
    color: #F5C315;
  }
  .nav a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(animStyle);