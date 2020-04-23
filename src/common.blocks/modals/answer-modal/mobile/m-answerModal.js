function handleAnswerModalClick(event) {
    if (answerModalCloseBtn.contains(event.target)) {
        this.style.display = 'none';

        this.removeEventListener('click', handleAnswerModalClick);
    }
}

for (const activator of answerModalActivators) {
    activator.addEventListener('click', () => {
        const answerModal = document.getElementById('answerModal');
        
        answerModal.style.display = 'block';
        answerModal.addEventListener('click', handleAnswerModalClick);

        autosize(document.querySelectorAll('textarea'));
    });
}
