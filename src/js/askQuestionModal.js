const qModal        = document.getElementById('qModal');
const qCoverColors  = document.getElementById('qCoverColors');
const qCoverBgColor = document.getElementById('qCoverBgColor');
const qDetailsBtn   = document.getElementById('qDetailsBtn');
const qColorBtns    = document.getElementsByClassName('question-modal__color-btn');
const qModalCover   = qModal.querySelector('.question-modal__cover');

autosize(document.getElementsByTagName('textarea'));

function changeQCoverColor(targetEl) {
    const pressedColorBtn = targetEl.closest('.question-modal__color-btn');

    if (pressedColorBtn) {
        qCoverBgColor.style.backgroundColor = pressedColorBtn.style.backgroundColor;

        for (const qColorBtn of qColorBtns) {
            qColorBtn.firstElementChild.src = `../assets/icons/list_${ 
                qColorBtn.id == 'qColorBtnWhite' ? 'black' : 'white' 
            }.svg`; 
        }

        if (pressedColorBtn.id == 'qColorBtnWhite') {
            pressedColorBtn.firstElementChild.src = '../assets/icons/check_black.svg';
            qModalCover.classList.remove('question-modal__cover-white-text');
        }
        else {
            pressedColorBtn.firstElementChild.src = '../assets/icons/check_white.svg';
            qModalCover.classList.add('question-modal__cover-white-text');
        }
    }
}

function showQDetails() {
    const qDetailsEl = `
        <textarea 
            class="question-modal__textarea question-modal__textarea--small" 
            placeholder="Fügen Sie gegebenenfalls eine detaillierte Beschreibung Ihrer Frage hinzu"
            rows="2"
        ></textarea>
    `;

    qModalCover.insertAdjacentHTML('afterend', qDetailsEl);
    qDetailsBtn.remove();

    autosize(document.querySelectorAll('textarea'));
}

qModal.addEventListener('click', event => {
    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
});
