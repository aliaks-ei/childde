const bottomMenu = document.getElementById('bottomMenu');
const input      = bottomMenu.querySelector('input');

input.addEventListener('focus', () => {
    const topPosition = window.scrollY + (window.innerHeight - bottomSheet.offsetHeight) + 95 + 'px';

    bottomSheet.classList.add('bs--keyboard-active');
    bottomSheet.style.setProperty('top', topPosition, 'important');
});

input.addEventListener('blur', () => {
    bottomSheet.classList.remove('bs--keyboard-active');
    bottomSheet.style.setProperty('top', 'auto', 'important');
});
