const bsThemesSelect           = document.getElementById('bsThemesSelect');
const bsCoverUpload            = document.getElementById('bsCoverUpload');
const bsAuthorSelect           = document.getElementById('bsAuthorSelect');
const bsThemesSelectActivators = document.querySelectorAll('[data-target="bsThemesSelect"]');
const bsCoverUploadActivator   = document.querySelector('[data-target="bsCoverUpload"]');
const bsAuthorSelectActivator  = document.querySelector('[data-target="bsAuthorSelect"]');

function handleQModalClick(event) {
    const isBsThemesSelectActivatorClicked = [...bsThemesSelectActivators].some(
        activator => activator.contains(event.target)
    );
        
    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (isBsThemesSelectActivatorClicked) {
        bsThemesSelect.style.display = 'block';

        showBottomSheet();
    }
    else if (bsCoverUploadActivator.contains(event.target)) {
        bsCoverUpload.style.display = 'block';

        showBottomSheet();
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (bsAuthorSelectActivator.contains(event.target)) {
        bsAuthorSelect.style.display = 'block';

        showBottomSheet();
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
