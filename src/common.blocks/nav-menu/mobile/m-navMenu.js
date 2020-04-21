const bottomNavMenu = document.getElementById('bottomNavMenu');

let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    bottomNavMenu.style.bottom = `${ prevScrollPos > currentScrollPos ? 24 : -96 }px`;
    prevScrollPos = currentScrollPos;
});

