/* ============================================
   SAIL TO SPEAK & SCALE 2027
   Interactions: Scroll reveal, FAQ, Exit popup
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Exit-Intent Popup ---
  const popup = document.getElementById('exitPopup');
  const popupClose = popup.querySelector('.exit-popup-close');
  const popupDismiss = document.getElementById('exitPopupDismiss');
  const popupCta = document.getElementById('exitPopupCta');
  let popupShown = false;

  function showPopup() {
    if (popupShown) return;
    popupShown = true;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hidePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger on mouse leaving viewport (desktop)
  document.addEventListener('mouseout', (e) => {
    if (e.clientY <= 0 && !popupShown) {
      showPopup();
    }
  });

  popupClose.addEventListener('click', hidePopup);
  popupDismiss.addEventListener('click', hidePopup);
  popupCta.addEventListener('click', hidePopup);

  // Close on overlay click
  popup.addEventListener('click', (e) => {
    if (e.target === popup) hidePopup();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      hidePopup();
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
