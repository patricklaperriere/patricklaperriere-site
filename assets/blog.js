/* ═══════════════════════════════════════════════════
   Blog scripts — shared by /blog/ and articles
   ═══════════════════════════════════════════════════ */

(function () {
  // ── Cursor glow ──
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  // ── Scroll progress + nav behavior ──
  const progressBar = document.getElementById('scrollProgress');
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && scrollHeight > 0) {
      progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';
    }
    if (nav) {
      if (scrollTop > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      if (scrollTop > lastScroll && scrollTop > 80) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
    }
    lastScroll = scrollTop;
  }, { passive: true });

  // ── Reveal on scroll ──
  // On individual article pages, render all .reveal elements visible immediately:
  // long-form copy needs to be readable on first paint and Intersection Observer
  // delays hurt scroll fluidity + Core Web Vitals (CLS) on 2000+ word articles.
  // Animations stay on for index.html and /blog/ listing.
  const isArticlePage = !!document.querySelector('main.article-page');
  if (isArticlePage) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ── Magnetic buttons ──
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ── Contact Modal ──
  const modal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('.open-modal');
  if (modal && modalClose) {
    function openModal(e) {
      if (e) e.preventDefault();
      modal.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('visible');
      document.body.style.overflow = '';
    }
    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && submitBtn && formSuccess) {
      contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const currentLang = localStorage.getItem('site-lang') || 'en';
        const sendingText = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
        submitBtn.innerHTML = `<span>${sendingText}</span>`;
        submitBtn.disabled = true;
        try {
          const formData = new FormData(this);
          const data = Object.fromEntries(formData);
          data._subject = `New dealer inquiry: ${data.dealership || data.name}`;
          data._captcha = 'false';
          await fetch('https://formsubmit.co/ajax/patricklaperriere819@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          });
          this.reset();
          submitBtn.style.display = 'none';
          formSuccess.classList.add('visible');
          setTimeout(() => {
            closeModal();
            setTimeout(() => {
              submitBtn.style.display = 'flex';
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<span data-en="Send message" data-fr="Envoyer le message">' +
                (currentLang === 'fr' ? 'Envoyer le message' : 'Send message') + '</span><span>→</span>';
              formSuccess.classList.remove('visible');
            }, 500);
          }, 4000);
        } catch (err) {
          const errorText = currentLang === 'fr'
            ? 'Erreur. Réessaie ou écris-moi directement à patricklaperriere819@gmail.com'
            : 'Error. Try again or email me directly at patricklaperriere819@gmail.com';
          alert(errorText);
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span data-en="Send message" data-fr="Envoyer le message">' +
            (currentLang === 'fr' ? 'Envoyer le message' : 'Send message') + '</span><span>→</span>';
        }
      });
    }
  }
})();

/* ═══════════════════════════════════════════════════
   setBlogLang — used by the blog index (bilingual list)
   For individual articles, use the per-file URL switcher
   in the nav (no JS toggle there).
   ═══════════════════════════════════════════════════ */
function setBlogLang(lang) {
  const isFr = lang === 'fr';
  document.documentElement.lang = isFr ? 'fr-CA' : 'en';

  document.querySelectorAll('[data-en], [data-fr]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text == null) return;
    const tag = el.tagName;
    if (tag === 'TITLE') {
      el.textContent = text;
      document.title = text;
    } else if (tag === 'META') {
      el.setAttribute('content', text);
    } else {
      el.innerHTML = text;
    }
  });

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  if (ogLocale) ogLocale.setAttribute('content', isFr ? 'fr_CA' : 'en_US');
  if (ogLocaleAlt) ogLocaleAlt.setAttribute('content', isFr ? 'en_US' : 'fr_CA');

  document.querySelectorAll('img[data-en-alt], img[data-fr-alt]').forEach(img => {
    const alt = img.getAttribute('data-' + lang + '-alt');
    if (alt) img.setAttribute('alt', alt);
  });

  document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
  });

  // Filter blog cards by language (only show cards matching active lang, or both/no data-lang)
  document.querySelectorAll('.blog-card[data-lang]').forEach(card => {
    const cardLang = card.getAttribute('data-lang');
    card.style.display = (cardLang === lang || cardLang === 'both') ? '' : 'none';
  });

  localStorage.setItem('site-lang', lang);
}

if (document.querySelectorAll('.lang-btn[data-lang]').length) {
  document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setBlogLang(btn.getAttribute('data-lang')));
  });
  const savedLang = localStorage.getItem('site-lang') || 'en';
  setBlogLang(savedLang);
}
