(function () {
  const commentFormActivator      = document.querySelector('[data-target="new-comment"]');
  const commentFormCloseActivator = document.querySelector('[data-target-close="new-comment"]');
  const newCommentForm            = document.getElementById('new-comment');
  const newCommentSendBtn         = newCommentForm && newCommentForm.querySelector('.new-comment-form__send-btn');

  function handleCommentTextareaChange(event) {
    const isSendBtnActive = Boolean(event.target.value && event.target.value.length);

    newCommentSendBtn.disabled = !isSendBtnActive;
  }

  commentFormActivator && commentFormActivator.addEventListener('click', function () {
    const textareaEl = newCommentForm.querySelector('.new-comment-form__textarea');

    this.parentElement.style.display = 'none';
    newCommentForm.style.display = 'flex';

    setTimeout(() => textareaEl.focus());

    textareaEl.addEventListener('input', handleCommentTextareaChange);
  });

  commentFormCloseActivator && commentFormCloseActivator.addEventListener('click', function () {
    const textareaEl = newCommentForm.querySelector('.new-comment-form__textarea');

    newCommentForm.style.display = 'none';
    commentFormActivator.parentElement.style.display = 'flex';

    textareaEl.removeEventListener('input', handleCommentTextareaChange);

    textareaEl.value = '';
    textareaEl.style.height = null;

    newCommentSendBtn.disabled = true;
  });
})();
