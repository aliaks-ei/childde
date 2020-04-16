const qModalCloseBtn            = document.getElementById('qModalCloseBtn');
const qCoverColors              = document.getElementById('qCoverColors');
const qCoverBgColor             = document.getElementById('qCoverBgColor');
const qDetailsBtn               = document.getElementById('qDetailsBtn');
const qThemesDropdown           = document.getElementById('qThemesDropdown');
const qThemesDropdownClose      = document.getElementById('qThemesDropdownClose');
const qColorBtns                = document.getElementsByClassName('question-modal__color-btn');
const qModalActivators          = document.querySelectorAll('[data-target="qModal"]');
const qThemesDropdownActivators = document.querySelectorAll('[data-target="qThemesDropdown"]');

let qModalCover;
let userSelectDropdownActivator; 
let selectedQColorBtnIdx = 0;

function changeQCoverColor(targetEl) {
    const pressedColorBtn = targetEl.closest('.question-modal__color-btn');

    if (pressedColorBtn && qColorBtns[selectedQColorBtnIdx] !== pressedColorBtn) {
        qCoverBgColor.style.backgroundColor = pressedColorBtn.style.backgroundColor;

        qColorBtns[selectedQColorBtnIdx].firstElementChild.textContent = 'notes';
        pressedColorBtn.firstElementChild.textContent = 'done';

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
    qModalCover.insertAdjacentHTML('afterend', `
        <textarea 
            class="question-modal__textarea question-modal__textarea--small" 
            placeholder="Fügen Sie gegebenenfalls eine detaillierte Beschreibung Ihrer Frage hinzu"
            rows="2"
        ></textarea>
    `);

    qDetailsBtn.remove();
    autosize(document.querySelectorAll('textarea'));
}

function handleQModalClick(event) {
    userSelectDropdownActivator.nextElementSibling.style.display = 'none';
    qThemesDropdown.style.display = 'none';

    const isQThemesActivatorClicked = [...qThemesDropdownActivators].some(
        activator => activator.contains(event.target)
    );

    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (isQThemesActivatorClicked) {
        qThemesDropdown.style.display = 'block';
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (userSelectDropdownActivator.contains(event.target)) {
        userSelectDropdownActivator.nextElementSibling.style.display = 'block';
    }
    else if (qModalCloseBtn.contains(event.target) || !this.firstElementChild.contains(event.target)) {
        hideModal(this);

        qModal.removeEventListener('click', handleQModalClick);
        qThemesDropdown.removeEventListener('click', handleQThemesDropdownClick);
    }
}

function handleQThemesDropdownClick(event) {
    event.stopPropagation();

    if (qThemesDropdownClose.contains(event.target)) {
        qThemesDropdown.style.display = 'none';
    }
}

for (const activator of qModalActivators) {
    activator.addEventListener('click', () => {
        const qModal = document.getElementById('qModal');

        qModalCover = qModal.querySelector('.question-modal__cover');
        userSelectDropdownActivator = qModal.querySelector('[data-target="userSelectDropdown"]');

        showModal(qModal);

        qModal.addEventListener('click', handleQModalClick);
        qThemesDropdown.addEventListener('click', handleQThemesDropdownClick);

        autosize(document.querySelectorAll('textarea'));
    });
}
