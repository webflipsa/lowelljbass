// [BASSIST NAME] site — shared behavior
// Mobile nav toggle + a friendly no-backend confirmation for forms.
// Replace the form handling once a real endpoint (Formspree, Netlify
// Forms, Calendly, etc.) is wired up — see README.md.

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var mobileNav = document.querySelector('.nav__mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after a link is chosen
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Demo-mode form handling. This site has no backend yet, so we
  // intercept submission and show a confirmation instead of a 404.
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.hidden = false;
        status.focus({ preventScroll: false });
      }
      form.reset();
    });
  });
});
