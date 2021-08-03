const shortDescEls = document.getElementsByClassName('question-card__content__short-desc');

for (const elem of shortDescEls) {
  elem.addEventListener('click', () => {
    elem.nextElementSibling.style.display = 'block';
    elem.remove();
  });
}
