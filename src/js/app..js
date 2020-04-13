const userImageEl    = document.getElementById('userImage');
const dropdownMenuEl = document.getElementById('accountDropdown');
const scrollToTopBtn = document.getElementById('scrollToTop');
const shortDescEls   = document.getElementsByClassName('question-card__content__short-desc');

let qTopDropdownEl;
let qBottomDropdownEl;

for (const elem of shortDescEls) {
    elem.addEventListener('click', () => {
        elem.nextElementSibling.style.display = 'block';
        elem.remove();
    });
}

function generateQTopDropdownEl(x, y) {
    const xPos = x - 195;
    const yPos = y + 55 + window.scrollY;

    qTopDropdownEl.style.transform = `translate3d(${ xPos }px, ${ yPos }px, 0px)`;
    qTopDropdownEl.style.display   = 'block';
}

function generateQBottomDropdownEl(x, y) {
    const xPos = x - 90;
    const yPos = y - 120 + window.scrollY;

    qBottomDropdownEl.style.transform = `translate3d(${ xPos }px, ${ yPos }px, 0px)`;
    qBottomDropdownEl.style.display   = 'block';
}

function toggleQuestionNotifications() {
    const notifyToggleEl = document.getElementById('notifyTogglerOption');
    const { checked } = notifyToggleEl.querySelector('input');

    notifyToggleEl.querySelector('input').checked = !checked;
}

window.addEventListener('click', event => {
    if (qTopDropdownEl && !qTopDropdownEl.contains(event.target)) {
        qTopDropdownEl.style.display = 'none';
    }

    if (qBottomDropdownEl && !qBottomDropdownEl.contains(event.target)) {
        qBottomDropdownEl.style.display = 'none';
    }

    dropdownMenuEl.style.display = 'none';

    if (userImageEl.contains(event.target) || dropdownMenuEl.contains(event.target)) {
        dropdownMenuEl.style.display = 'block';
    }

    if (event.target.classList.contains('question-header__dropdown-icon')) {
        const { x, y } = event.target.getBoundingClientRect();

        qTopDropdownEl = document.getElementById('qTopDropdown');
        generateQTopDropdownEl(x, y);

        qTopDropdownEl.querySelector('#notifyTogglerOption').addEventListener('click', toggleQuestionNotifications);
    }

    if (event.target.classList.contains('question-reviews__horizontal-dropdown')) {
        const { x, y } = event.target.getBoundingClientRect();

        qBottomDropdownEl = document.getElementById('qBottomDropdown');
        generateQBottomDropdownEl(x, y)
    }
});

scrollToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
