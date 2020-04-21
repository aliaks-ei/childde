const shortDescEls = document.getElementsByClassName('question-card__content__short-desc');

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

window.addEventListener('click', event => {
    if (qTopDropdownEl && !qTopDropdownEl.contains(event.target)) {
        qTopDropdownEl.style.display = 'none';
    }

    if (qBottomDropdownEl && !qBottomDropdownEl.contains(event.target)) {
        qBottomDropdownEl.style.display = 'none';
    }

    if (event.target.dataset && event.target.dataset.target === 'qcTopDropdown') {
        const { x, y } = event.target.getBoundingClientRect();

        qTopDropdownEl = document.getElementById('qTopDropdown');
        generateQTopDropdownEl(x, y);
    }
    else if (event.target.dataset && event.target.dataset.target === 'qcBottomDropdown') {
        const { x, y } = event.target.getBoundingClientRect();

        qBottomDropdownEl = document.getElementById('qBottomDropdown');
        generateQBottomDropdownEl(x, y)
    }
});
