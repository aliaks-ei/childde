const qModalCloseBtn   = document.getElementById('qModalCloseBtn');
const qCoverColors     = document.getElementById('qCoverColors');
const qCoverBgColor    = document.getElementById('qCoverBgColor');
const qDetailsBtn      = document.getElementById('qDetailsBtn');
const qColorBtns       = document.getElementsByClassName('question-modal__color-btn');
const qModalActivators = document.querySelectorAll('[data-target="qModal"]');

let qModalCover;
let selectedQColorBtnIdx = 0;

function changeQCoverColor(targetEl) {
    const pressedColorBtn = targetEl.closest('.question-modal__color-btn');
    const themeChipsWrapper = qModalCover.querySelector('.theme-chips-wrapper');

    if (pressedColorBtn && qColorBtns[selectedQColorBtnIdx] !== pressedColorBtn) {
        qCoverBgColor.style.backgroundColor = pressedColorBtn.style.backgroundColor;

        qColorBtns[selectedQColorBtnIdx].firstElementChild.textContent = 'notes';
        pressedColorBtn.firstElementChild.textContent = 'done';

        selectedQColorBtnIdx = [...qColorBtns].findIndex(
            qColorBtn => qColorBtn === pressedColorBtn
        );

        if (pressedColorBtn.id == 'qColorBtnWhite') {
            qModalCover.classList.remove('question-modal__cover--white-text');
            themeChipsWrapper.classList.remove('theme-chips-wrapper--light');
        }
        else {
            qModalCover.classList.add('question-modal__cover--white-text');
            themeChipsWrapper.classList.add('theme-chips-wrapper--light');
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
