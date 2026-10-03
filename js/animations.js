// ==========================================================================
//  ANIMATIONS.JS — Scroll reveal (AOS-like) + section utilities
// ==========================================================================
(function () {
  'use strict';

  /* ---- Scroll reveal ---- */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(() => el.classList.add('aos-animate'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }


  /* ---- RSVP form (kept for when section is re-enabled) ---- */
  function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.rsvp-btn');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML  = '<span>&#10003;</span><span>Jazakallah Khair!</span>';
      btn.style.background = '#2E5D50';
      btn.disabled   = true;
      setTimeout(() => {
        btn.innerHTML  = original;
        btn.style.background = '';
        btn.disabled   = false;
        form.reset();
      }, 3000);
    });
  }

  /* ---- Init all ---- */
  function init() {
    initAOS();
    initRSVP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
