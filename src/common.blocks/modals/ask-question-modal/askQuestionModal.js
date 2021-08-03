const qCoverColors                   = document.getElementById('qCoverColors');
const qCoverBgColor                  = document.getElementById('qCoverBgColor');
const qColorBtns                     = document.getElementsByClassName('question-modal__color-btn');
const qModalActivators               = document.querySelectorAll('[data-target="qModal"]');
const qThemesDropdown                = document.getElementById('qThemesDropdown');
const qCoverUploadDropdown           = document.getElementById('qCoverUploadDropdown');
const qThemesDropdownActivators      = document.querySelectorAll('[data-target="qThemesDropdown"]');
const qModalCloseActivators          = document.querySelectorAll('[data-target-close="qModal"]');
const qUploadCoverActivator          = document.querySelector('[data-target="qUploadCoverBtn"]');
const qDetailsActivators             = document.querySelectorAll('[data-target="qDetails"]');
const qThemesDropdownCloseActivators = document.querySelectorAll('[data-target-close="qThemesDropdown"]');
const qCoverUploadCloseActivators    = document.querySelectorAll('[data-target-close="qCoverUpload"]');

let qModalCover;
let userSelectDropdownActivator;
let selectedQColorBtnIdx = 0;

if ('autosize' in window) {
  autosize(document.querySelectorAll('textarea'));
}

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

  qDetailsActivators.forEach(activator => activator.remove());
  autosize(document.querySelectorAll('textarea'));
}

function handleQModalClick(event) {
  userSelectDropdownActivator.nextElementSibling.style.display = 'none';
  qThemesDropdown.style.display = 'none';
  qCoverUploadDropdown.style.display = 'none';

  const isQThemesActivatorClicked = [...qThemesDropdownActivators].some(
    activator => activator.contains(event.target)
  );

  const isQModalCloseActivatorClicked = [...qModalCloseActivators].some(
    activator => activator.contains(event.target)
  );

  const isQDetailsActivatorClicked = [...qDetailsActivators].some(
    activator => activator.contains(event.target)
  );

  if (qCoverColors.contains(event.target)) {
    changeQCoverColor(event.target);
  }
  else if (isQThemesActivatorClicked) {
    qThemesDropdown.style.display = 'block';
  }
  else if (qUploadCoverActivator.contains(event.target)) {
    qCoverUploadDropdown.style.display = 'block';
  }
  else if (isQDetailsActivatorClicked) {
    showQDetails();
  }
  else if (userSelectDropdownActivator.contains(event.target)) {
    userSelectDropdownActivator.nextElementSibling.style.display = 'block';
  }
  else if (isQModalCloseActivatorClicked || !this.firstElementChild.contains(event.target)) {
    hideModal(this);

    this.removeEventListener('click', handleQModalClick);
    qThemesDropdown.removeEventListener('click', handleQThemesDropdownClick);
    qCoverUploadDropdown.removeEventListener('click', handleQUploadCoverClick);
    qModal.querySelector('#qModalTitle').removeEventListener('input', handleQModalTitleChange);
  }
}

function handleQThemesDropdownClick(event) {
  event.stopPropagation();

  const isQThemesDropdownCloseActivatorClicked = [...qThemesDropdownCloseActivators].some(
    activator => activator.contains(event.target)
  );

  if (isQThemesDropdownCloseActivatorClicked) {
    qThemesDropdown.style.display = 'none';
  }
}

function handleQUploadCoverClick(event) {
  event.stopPropagation();

  const isQCoverUploadCloseActivatorClicked = [...qCoverUploadCloseActivators].some(
    activator => activator.contains(event.target)
  );

  if (isQCoverUploadCloseActivatorClicked) {
    qCoverUploadDropdown.style.display = 'none';
  }
}

function handleQModalTitleChange(event) {
  const symbolsCounter = qModal.querySelector('.symbols-counter-container');
  const submitBtn      = qModal.querySelector('.q-bottom-container__btn');

  const svgFillCircle       = symbolsCounter.querySelector('.symbols-counter__fill-circle');
  const symbolsCounterLabel = symbolsCounter.querySelector('.symbols-counter__label__text');

  const svgStrokeDasharray = svgFillCircle.style.strokeDasharray;

  const symbolsLimit = parseInt(symbolsCounter.dataset.symbolsLimit, 10);
  const counterStep  = svgStrokeDasharray / symbolsLimit;

  const questionLength = event.target.value.length;

  let newStrokeDashoffset;
  let currentSymbols;

  if (symbolsCounter.dataset.symbolsCountdown !== undefined) {
    newStrokeDashoffset = questionLength * counterStep;
    currentSymbols = symbolsLimit - questionLength;
  }
  else {
    newStrokeDashoffset = svgStrokeDasharray - (questionLength * counterStep);
    currentSymbols = questionLength;
  }

  symbolsCounter.style.opacity = currentSymbols <= 19 ? 1 : 0;

  if (currentSymbols <= 9) {
    symbolsCounter.classList.add('symbols-counter-container--error');
  }
  else {
    symbolsCounter.classList.remove('symbols-counter-container--error');
  }

  symbolsCounterLabel.textContent = currentSymbols <= -999 ? -999 : currentSymbols;
  svgFillCircle.style.strokeDashoffset = newStrokeDashoffset;

  submitBtn.disabled = Boolean(currentSymbols < 0 || currentSymbols == symbolsLimit);
}

for (const activator of qModalActivators) {
  activator.addEventListener('click', () => {
    const qModal = document.getElementById('qModal');

    qModalCover = qModal.querySelector('.question-modal__cover');
    userSelectDropdownActivator = qModal.querySelector('[data-target="userSelectDropdown"]');

    showModal(qModal);

    qModal.addEventListener('click', handleQModalClick);
    qThemesDropdown.addEventListener('click', handleQThemesDropdownClick);
    qCoverUploadDropdown.addEventListener('click', handleQUploadCoverClick);
    qModal.querySelector('#qModalTitle').addEventListener('input', handleQModalTitleChange);
  });
}
