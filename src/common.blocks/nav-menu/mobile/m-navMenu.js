const bottomNav = document.getElementById('bottomNav');
const bottomMenuActivator = bottomNav.querySelector('[data-target="bottomMenu"]');

let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    bottomNav.style.bottom = `${ prevScrollPos > currentScrollPos ? 24 : -96 }px`;
    prevScrollPos = currentScrollPos;
});

bottomMenuActivator.addEventListener('click', function () {
    const bottomMenu = document.getElementById(this.dataset.target);

    bottomMenu.style.display = 'block';
    
    showBottomSheet();
});

