const answerModalActivators      = document.querySelectorAll('[data-target="answerModal"]');
const answerModalCloseActivators = document.querySelectorAll('[data-target-close="answerModal"]');

let uploadImageActivator;
let addLinkActivator;

function handleAnswerModalClick(event) {
  uploadImageActivator.nextElementSibling.style.display = 'none';
  addLinkActivator.nextElementSibling.style.display = 'none';
  userSelectDropdownActivator.nextElementSibling.style.display = 'none';

  const isAnswerModalCloseActivatorClicked = [...answerModalCloseActivators].some(
    activator => activator.contains(event.target)
  );

  if (uploadImageActivator.contains(event.target)) {
    uploadImageActivator.nextElementSibling.style.display = 'block';
  }
  else if (addLinkActivator.contains(event.target)) {
    addLinkActivator.nextElementSibling.style.display = 'block';
  }
  else if (userSelectDropdownActivator.contains(event.target)) {
    userSelectDropdownActivator.nextElementSibling.style.display = 'block';
  }
  else if (isAnswerModalCloseActivatorClicked || !this.firstElementChild.contains(event.target)) {
    hideModal(this);

    this.removeEventListener('click', handleAnswerModalClick);
    uploadImageActivator.nextElementSibling.removeEventListener('click', stopPropagationOnDropdown);
    addLinkActivator.nextElementSibling.removeEventListener('click', stopPropagationOnDropdown);
    answerModal.querySelector('#answerModalContent').removeEventListener('input', handleAnswerModalContentChange);
  }
}

function stopPropagationOnDropdown(event) {
  event.stopPropagation();
}

function handleAnswerModalContentChange() {
  const symbolsCounter = answerModal.querySelector('.symbols-counter-container');
  const submitBtn      = answerModal.querySelector('.answer-modal__answer-button');

  const svgFillCircle       = symbolsCounter.querySelector('.symbols-counter__fill-circle');
  const svgBgCircle         = symbolsCounter.querySelector('.symbols-counter__bg-circle');
  const symbolsCounterLabel = symbolsCounter.querySelector('.symbols-counter__label__text');
  const checkIcon           = symbolsCounter.querySelector('.symbols-counter__label .material-icons-round');

  const svgStrokeDasharray = svgFillCircle.style.strokeDasharray;

  const symbolsLimit = parseInt(symbolsCounter.dataset.symbolsLimit, 10);
  const counterStep  = svgStrokeDasharray / symbolsLimit;

  const answerLength = event.target.value.length;

  let newStrokeDashoffset;
  let currentSymbols;

  if (symbolsCounter.dataset.symbolsCountdown !== undefined) {
    newStrokeDashoffset = answerLength * counterStep;
    currentSymbols = symbolsLimit - answerLength;
  }
  else {
    newStrokeDashoffset = svgStrokeDasharray - (answerLength * counterStep);
    currentSymbols = answerLength;
  }

  symbolsCounter.style.opacity = currentSymbols >=1 ? 1 : 0;

  if (currentSymbols >= symbolsLimit) {
    symbolsCounterLabel.style.display = 'none';
    checkIcon.style.display = 'block';

    svgBgCircle.style.strokeOpacity = 1;

    submitBtn.disabled = false;
  }
  else {
    checkIcon.style.display = 'none';
    symbolsCounterLabel.style.display = 'block';

    svgBgCircle.style.strokeOpacity = 0.07;

    submitBtn.disabled = true;
  }

  symbolsCounterLabel.textContent = currentSymbols;
  svgFillCircle.style.strokeDashoffset = newStrokeDashoffset;
}

for (const activator of answerModalActivators) {
  activator.addEventListener('click', () => {
    const answerModal = document.getElementById('answerModal');

    uploadImageActivator = answerModal.querySelector('[data-target="uploadImageDropdown"]');
    addLinkActivator = answerModal.querySelector('[data-target="addLinkDropdown"]');
    userSelectDropdownActivator = answerModal.querySelector('[data-target="userSelectDropdown"]');

    showModal(answerModal);

    answerModal.addEventListener('click', handleAnswerModalClick);
    uploadImageActivator.nextElementSibling.addEventListener('click', stopPropagationOnDropdown);
    addLinkActivator.nextElementSibling.addEventListener('click', stopPropagationOnDropdown);
    answerModal.querySelector('#answerModalContent').addEventListener('input', handleAnswerModalContentChange);
  });
}
