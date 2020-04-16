const answerModalActivators = document.querySelectorAll('[data-target="answerModal"]');

for (const activator of answerModalActivators) {
    activator.addEventListener('click', () => {
        const answerModal = document.getElementById('answerModal');

        showModal(answerModal);
    });
}
