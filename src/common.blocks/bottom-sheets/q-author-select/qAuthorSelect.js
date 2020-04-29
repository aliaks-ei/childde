const bsAuthorSelect           = document.getElementById('bsAuthorSelect');
const bsAuthorSelectActivators = document.querySelectorAll('[data-target="bsAuthorSelect"]');

for (const activator of bsAuthorSelectActivators) {
    activator.addEventListener('click', () => {
        bsAuthorSelect.style.display = 'block';

        showBottomSheet();
    });
}
