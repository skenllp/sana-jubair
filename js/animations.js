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


  /* ---- RSVP form ---- */
  function initRSVP() {
    const form   = document.getElementById('rsvp-form');
    const status = document.getElementById('rsvp-status');
    if (!form) return;

    // ⚠️ Paste your Google Apps Script Web App URL here after deploying
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-OirAHaQ4pnc4X4qgGyZ8aA17CKp4DgonCjLrpeQzB3Kj-b2lOVir02gHh5TJGmEF1w/exec';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn  = document.getElementById('rsvp-submit');
      const name = document.getElementById('rsvp-name').value.trim();

      if (!name) {
        status.textContent = 'Please enter your name.';
        status.className   = 'rsvp-status error';
        return;
      }

      btn.disabled       = true;
      btn.innerHTML      = '<i class="fas fa-spinner fa-spin"></i><span>Sending…</span>';
      status.textContent = '';
      status.className   = 'rsvp-status';

      const params = new URLSearchParams();
      params.append('name',    name);
      params.append('guests',  document.getElementById('rsvp-guests').value);
      params.append('message', document.getElementById('rsvp-message').value.trim());

      try {
        await fetch(SCRIPT_URL, {
          method:  'POST',
          mode:    'no-cors',
          body:    params
        });

        btn.innerHTML      = '<i class="fas fa-check"></i><span>Jazakallah Khair!</span>';
        status.textContent = '✓ We have received your RSVP. May Allah bless you!';
        status.className   = 'rsvp-status success';
        form.reset();

        setTimeout(() => {
          btn.disabled  = false;
          btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Confirm Attendance</span>';
        }, 4000);

      } catch (err) {
        btn.disabled       = false;
        btn.innerHTML      = '<i class="fas fa-paper-plane"></i><span>Confirm Attendance</span>';
        status.textContent = 'Something went wrong. Please try again.';
        status.className   = 'rsvp-status error';
      }
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
