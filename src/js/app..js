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

    return `
        <div class="question-card__dropdown question-dropdown" id="qTopDropdown" style="transform: translate3d(${ xPos }px, ${ yPos }px, 0px)">
            <div class="question-dropdown-wrapper">
                <a class="question-dropdown__item">
                    <div class="question-dropdown__item__icon"><img src="./assets/icons/share.svg" /></div><span>Teilen</span>
                </a>
                <a class="question-dropdown__item">
                    <div class="question-dropdown__item__icon"><img src="./assets/icons/paintbrush.svg" /></div><span>Bearbeiten</span>
                </a>
                <a class="question-dropdown__item question-dropdown__item--with-toggle" id="notifyTogglerOption">
                    <div class="question-dropdown__item__toggle-wrapper">
                        <div>
                            <div class="question-dropdown__item__icon"><img src="./assets/icons/bell.svg" /></div><span>Mitteilungen</span>
                        </div>
                        <label class="question-dropdown__item__toggle item-toggle"><input type="checkbox"/><span class="item-toggle__slider"></span></label></div>
                    <div class="question-dropdown__item__hint">
                        (Sie erhalten Mitteilungen über neue Antworten und Kommentare)
                    </div>
                </a>
            </div>
        </div>
    `;
}

function generateQBottomDropdownEl(x, y) {
    const xPos = x - 90;
    const yPos = y - 120 + window.scrollY;

    return `
        <div class="question-card__dropdown question-dropdown question-dropdown--bottom" id="qBottomDropdown" style="transform: translate3d(${ xPos }px, ${ yPos }px, 0px)">
            <div class="question-dropdown-wrapper">
                <a class="question-dropdown__item">
                    <div class="question-dropdown__item__icon"><img src="./assets/icons/share.svg" /></div><span>Teilen</span>
                </a>
                <a class="question-dropdown__item">
                    <div class="question-dropdown__item__icon"><img src="./assets/icons/warning.svg" /></div><span>Melden</span>
                </a>
            </div>
        </div>
    `;
}

function toggleQuestionNotifications() {
    const notifyToggleEl = document.getElementById('notifyTogglerOption');
    const { checked } = notifyToggleEl.querySelector('input');

    notifyToggleEl.querySelector('input').checked = !checked;
}

window.addEventListener('click', event => {
    if (qTopDropdownEl && !qTopDropdownEl.contains(event.target)) {
        qTopDropdownEl.remove();
    }

    if (qBottomDropdownEl && !qBottomDropdownEl.contains(event.target)) {
        qBottomDropdownEl.remove();
    }

    dropdownMenuEl.style.display = 'none';

    if (userImageEl.contains(event.target) || dropdownMenuEl.contains(event.target)) {
        dropdownMenuEl.style.display = 'block';
    }

    if (event.target.classList.contains('question-header__dropdown-icon')) {
        const { x, y } = event.target.getBoundingClientRect();

        document.body.insertAdjacentHTML('beforeend', generateQTopDropdownEl(x, y));
        qTopDropdownEl = document.getElementById('qTopDropdown');

        qTopDropdownEl.querySelector('#notifyTogglerOption').addEventListener('click', toggleQuestionNotifications);
    }

    if (event.target.classList.contains('question-reviews__horizontal-dropdown')) {
        const { x, y } = event.target.getBoundingClientRect();

        document.body.insertAdjacentHTML('beforeend', generateQBottomDropdownEl(x, y));
        qBottomDropdownEl = document.getElementById('qBottomDropdown');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
