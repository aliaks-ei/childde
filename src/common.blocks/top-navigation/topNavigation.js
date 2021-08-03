const signInLink             = document.querySelector('.top-navigation__link--highlighted');
const hamburgerMenu          = document.getElementById('hamburgerMenu');
const hamburgerMenuActivator = document.querySelector('[data-target="hamburgerMenu"]');

function animateSignInLink(el, dashoffset) {
  dashoffset -= 2;

  if (dashoffset < 0) {
    dashoffset = 0;
  }

  el.style.strokeDashoffset = dashoffset + 'px';

  if (dashoffset > 0) {
    setTimeout(() => animateSignInLink(el, dashoffset), Math.abs(dashoffset) * 2);
  }
}

signInLink && signInLink.addEventListener('mouseenter', () => {
  for (let line of signInLink.querySelectorAll('.sign-in-line')) {
    setTimeout(animateSignInLink(line, 22), 10);
  }
});

hamburgerMenuActivator && hamburgerMenuActivator.addEventListener('click', function () {
  this.classList.toggle('top-navigation__hamburger-icon--open');
  hamburgerMenu.classList.toggle('hamburger-menu--visible');
  document.documentElement.classList.toggle('app-no-scroll');
  document.body.classList.toggle('app-no-scroll');
});
