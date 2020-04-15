const qModal                  = document.getElementById('qModal');
const qModalCloseBtn          = document.getElementById('qModalCloseBtn');
const qCoverColors            = document.getElementById('qCoverColors');
const qCoverBgColor           = document.getElementById('qCoverBgColor');
const qDetailsBtn             = document.getElementById('qDetailsBtn');
const qUserSelectActivator    = document.getElementById('qUserSelectActivator');
const qUserSelectDropdown     = document.getElementById('qUserSelectDropdown');
const qThemesSelect           = document.getElementById('qThemesSelect');
const qThemesSelectClose      = document.getElementById('qThemesSelectClose');
const qColorBtns              = document.getElementsByClassName('question-modal__color-btn');
const qModalActivators        = document.querySelectorAll('[data-target="qModal"]');
const qThemesSelectActivators = document.querySelectorAll('[data-target="qThemesSelect"]');
const qModalCover             = qModal.querySelector('.question-modal__cover');

const listSVGIcon = `
    <svg class="list">
        <use xlink:href="./assets/icons/svg-symbols.svg#list"></use>
    </svg>
`;

const checkSVGIcon = `
    <svg class="check">
        <use xlink:href="./assets/icons/svg-symbols.svg#check"></use>
    </svg>
`;

const qDetailsEl = `
    <textarea 
        class="question-modal__textarea question-modal__textarea--small" 
        placeholder="Fügen Sie gegebenenfalls eine detaillierte Beschreibung Ihrer Frage hinzu"
        rows="2"
    ></textarea>
`;

let selectedQColorBtnIdx = 0;

function changeQCoverColor(targetEl) {
    const pressedColorBtn = targetEl.closest('.question-modal__color-btn');

    if (pressedColorBtn && qColorBtns[selectedQColorBtnIdx] !== pressedColorBtn) {
        qCoverBgColor.style.backgroundColor = pressedColorBtn.style.backgroundColor;

        qColorBtns[selectedQColorBtnIdx].firstElementChild.remove();
        pressedColorBtn.firstElementChild.remove();

        qColorBtns[selectedQColorBtnIdx].insertAdjacentHTML('afterbegin', listSVGIcon);
        pressedColorBtn.insertAdjacentHTML('afterbegin', checkSVGIcon);

        selectedQColorBtnIdx = [...qColorBtns].findIndex(
            qColorBtn => qColorBtn === pressedColorBtn
        );

        if (pressedColorBtn.id == 'qColorBtnWhite') {
            qModalCover.classList.remove('question-modal__cover--white-text');
        }
        else {
            qModalCover.classList.add('question-modal__cover--white-text');
        }
    }
}

function showQDetails() {
    qModalCover.insertAdjacentHTML('afterend', qDetailsEl);
    qDetailsBtn.remove();

    autosize(document.querySelectorAll('textarea'));
}

function handleQModalClick(event) {
    qUserSelectDropdown.style.display = 'none';
    qThemesSelect.style.display = 'none';

    const isQThemesActivatorClicked = [...qThemesSelectActivators].some(
        activator => activator.contains(event.target)
    );

    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (isQThemesActivatorClicked) {
        qThemesSelect.style.display = 'block';
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (qUserSelectActivator.contains(event.target)) {
        qUserSelectDropdown.style.display = 'block';
    }
    else if (qModalCloseBtn.contains(event.target) || !qModal.firstElementChild.contains(event.target)) {
        hideQModal();
    }
}

function handleQThemesSelectClick(event) {
    event.stopPropagation();

    if (qThemesSelectClose.contains(event.target)) {
        qThemesSelect.style.display = 'none';
    }
}

function showQModal() {
    qModal.style.display = 'block';

    document.body.style.paddingRight = `${ window.innerWidth - document.documentElement.clientWidth }px`;
    document.body.style.overflow     = 'hidden';

    qModal.insertAdjacentHTML('afterend', '<div class="modal-overlay" style="display: block"></div>');
    qModal.addEventListener('click', handleQModalClick);

    qThemesSelect.addEventListener('click', handleQThemesSelectClick);

    autosize(document.querySelectorAll('textarea'));
}

function hideQModal() {
    qModal.style.display = 'none';

    document.querySelector('.modal-overlay').remove();
    
    document.body.style.paddingRight = null;
    document.body.style.overflow     = null;

    qModal.removeEventListener('click', handleQModalClick);
    qThemesSelect.removeEventListener('click', handleQThemesSelectClick);
}

for (const activator of qModalActivators) {
    activator.addEventListener('click', showQModal);
}
