function handleQModalClick(event) {        
    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (qModalCloseBtn.contains(event.target)) {
        this.style.display = 'none';

        this.removeEventListener('click', handleQModalClick);
    }
}

for (const activator of qModalActivators) {
    activator.addEventListener('click', () => {
        const qModal = document.getElementById('qModal');

        qModalCover = qModal.querySelector('.question-modal__cover');

        qModal.style.display = 'block';
        qModal.addEventListener('click', handleQModalClick);

        autosize(document.querySelectorAll('textarea'));
    });
}