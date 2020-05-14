let qTopDropdownEl;
let qBottomDropdownEl;

function generateQTopDropdownEl(x, y) {
    const xPos = x - 195;
    const yPos = y + 55 + window.scrollY;

    qTopDropdownEl.style.transform = `translate3d(${ xPos }px, ${ yPos }px, 0px)`;
    qTopDropdownEl.style.display   = 'block';

    qTopDropdownEl.querySelector('input[type="checkbox"]').addEventListener('click', toggleQuestionNotifications);
}

function generateQBottomDropdownEl(x, y) {
    const xPos = x - 90;
    const yPos = y - 120 + window.scrollY;

    qBottomDropdownEl.style.transform = `translate3d(${ xPos }px, ${ yPos }px, 0px)`;
    qBottomDropdownEl.style.display   = 'block';
}

function toggleQuestionNotifications() {
    const bellIcon = qTopDropdownEl.querySelector('.question-dropdown__item__icon .bell');
    const bellCrossedIcon = qTopDropdownEl.querySelector('.question-dropdown__item__icon .bell-crossed');

    if (this.checked) {
        bellCrossedIcon.style.display = 'none';
        bellIcon.style.display = 'block';
    }
    else {
        bellIcon.style.display = 'none';
        bellCrossedIcon.style.display = 'block';
    }
}

window.addEventListener('click', event => {
    if (qTopDropdownEl && !qTopDropdownEl.contains(event.target)) {
        qTopDropdownEl.style.display = 'none';

        document.getElementById('notifyTogglerOption').querySelector('input[type="checkbox"]').addEventListener('click', toggleQuestionNotifications);
    }

    if (qBottomDropdownEl && !qBottomDropdownEl.contains(event.target)) {
        qBottomDropdownEl.style.display = 'none';
    }

    if (event.target.dataset.target === 'qcTopDropdown') {
        const { left, top } = event.target.getBoundingClientRect();

        qTopDropdownEl = document.getElementById('qTopDropdown');
        generateQTopDropdownEl(left, top);
    }
    else if (event.target.dataset.target === 'qcBottomDropdown') {
        const { left, top } = event.target.getBoundingClientRect();

        qBottomDropdownEl = document.getElementById('qBottomDropdown');
        generateQBottomDropdownEl(left, top)
    }

    if (event.target.dataset.target === 'qcTopMenu') {
        document.getElementById('qcTopMenu').style.display = 'block';

        showBottomSheet();
    }
    else if (event.target.dataset.target === 'qcBottomMenu') {
        document.getElementById('qcBottomMenu').style.display = 'block';

        showBottomSheet();
    }
});
