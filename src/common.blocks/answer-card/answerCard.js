(function () {    
    const bestAnswerLabelActivators = document.querySelectorAll('[data-toggle="bestAnswerLabel"]');

    if (bestAnswerLabelActivators) {
        for (const activator of bestAnswerLabelActivators) {
            activator.addEventListener('click', setAnswerAsTheBest);
        }
    }

    function setAnswerAsTheBest() {
        if (this.classList.contains('best-answer-toggler--active')) return;
        
        const answerCardEl = this.closest('.answer-card');
        const bestAnswerLabelEl = answerCardEl.querySelector('.answer-card__best-answer-label');
        const contentEl = this.querySelector('.best-answer-toggler__content span');
        const switchEl  = this.querySelector('.item-toggle');
        const cancelBtn = this.querySelector('.best-answer-toggler__cancel-btn');

        bestAnswerLabelEl.style.display = 'flex';
        cancelBtn.style.display = 'block';
        switchEl.style.display = 'none';

        this.classList.add('best-answer-toggler--active');

        contentEl.text = 'You have chosen this answer as the best one!';

        cancelBtn.addEventListener('click', event => {
            event.stopPropagation();

            bestAnswerLabelEl.style.display = 'none';
            switchEl.style.display = 'block';
            cancelBtn.style.display = 'none';

            this.classList.remove('best-answer-toggler--active');

            contentEl.text = 'This is the best answer to my question';
        }, { once: true });
    }
})();
