// ===== COUNTDOWN TIMER =====
(function() {
  'use strict';

  const WEDDING_DATE = new Date('2026-11-06T17:00:00');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdownValue('cd-days', pad(days));
    setCountdownValue('cd-hours', pad(hours));
    setCountdownValue('cd-minutes', pad(minutes));
    setCountdownValue('cd-seconds', pad(seconds));
  }

  function setCountdownValue(id, newVal) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== newVal) {
      el.classList.add('flip');
      setTimeout(() => el.classList.remove('flip'), 300);
      el.textContent = newVal;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
