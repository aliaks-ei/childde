const qModal               = document.getElementById('qModal');
const qCoverColors         = document.getElementById('qCoverColors');
const qCoverBgColor        = document.getElementById('qCoverBgColor');
const qDetailsBtn          = document.getElementById('qDetailsBtn');
const qUserSelectActivator = document.getElementById('qUserSelectActivator');
const qColorBtns           = document.getElementsByClassName('question-modal__color-btn');
const qModalCover          = qModal.querySelector('.question-modal__cover');

let qUserSelectDropdown;

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

function showQAuthorDropdown() {
    const qAuthorDropdown = `
        <div class="q-user-select__dropdown-wrapper" id="qUserSelectDropdown">
            <div class="q-user-select__dropdown q-select-dropdown">
                <button class="q-select-dropdown__btn">
                    <div class="q-user-select__avatar">
                        <img src="./assets/images/question-vote-avatar.png"/>
                    </div>
                    <span class="q-user-select__name">Philip Djones</span>
                    <div class="q-select-dropdown__btn__check-icon">
                        <img src="./assets/icons/check_blue.svg"/>
                    </div>
                </button>
                <button class="q-select-dropdown__btn">
                    <div class="q-user-select__avatar">
                        <img src="./assets/images/question-1-avatar.png" />
                    </div>
                    <span class="q-user-select__name">Don't use my name</span>
                </button>
            </div>
        </div>
    `;

    qUserSelectActivator.insertAdjacentHTML('afterend', qAuthorDropdown);

    setTimeout(() => {
        qUserSelectDropdown = document.getElementById('qUserSelectDropdown');

        const authorOptions = qUserSelectDropdown.querySelectorAll('.q-select-dropdown__btn');

        for (let authorOption of authorOptions) {
            const [avatar, name] = authorOption.children;

            authorOption.addEventListener('click', () => {
                qUserSelectActivator.children[0].firstElementChild.src = avatar.firstElementChild.src;
                qUserSelectActivator.children[1].textContent = name.textContent;
            });
        }
    });
}

qModal.addEventListener('click', event => {
    if (qUserSelectDropdown) {
        qUserSelectDropdown.remove();
    }

    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (qUserSelectActivator.contains(event.target)) {
        showQAuthorDropdown();
    }
});
