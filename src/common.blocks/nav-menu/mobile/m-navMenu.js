const bottomNav           = document.getElementById('bottomNav');
const bottomMenuActivator = bottomNav.querySelector('[data-target="bottomMenu"]');
const mainContent         = document.body.firstElementChild;

let prevScrollPos = mainContent.scrollTop;

mainContent.addEventListener('scroll', function () {
    const currentScrollPos = mainContent.scrollTop;

    bottomNav.style.bottom = `${ prevScrollPos > currentScrollPos ? 24 : -96 }px`;
    prevScrollPos = currentScrollPos;
});

bottomMenuActivator.addEventListener('click', function () {
    const bottomMenu = document.getElementById(this.dataset.target);

    bottomMenu.style.display = 'block';
    
    showBottomSheet();
});

