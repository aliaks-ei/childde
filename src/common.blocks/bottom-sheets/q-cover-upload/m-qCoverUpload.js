const bsCoverUpload           = document.getElementById('bsCoverUpload');
const bsCoverUploadActivators = document.querySelectorAll('[data-target="bsCoverUpload"]');

for (const activator of bsCoverUploadActivators) {
    activator.addEventListener('click', () => {
        bsCoverUpload.style.display = 'block';

        showBottomSheet();
    });
}
