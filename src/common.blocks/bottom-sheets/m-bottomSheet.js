const bottomSheet                = document.getElementById('bottomSheet');
const bottomSheetCloseActivators = document.querySelectorAll('[data-target="closeBottomSheet"]');

function showBottomSheet() {
    if (bottomSheet) {
        bottomSheet.querySelector('.bottom-sheet__content').style.display = 'block';

        bottomSheet.style.bottom = '-6px';

        bottomSheet.insertAdjacentHTML('afterend', '<div class="modal-overlay" style="display: block; z-index: 1004"></div>');
        document.querySelector('.modal-overlay').addEventListener('click', hideBottomSheet);
    }
}

function hideBottomSheet() {
    if (bottomSheet) {
        bottomSheet.style.bottom = '-100%';

        document.querySelector('.modal-overlay').remove();

        setTimeout(() => {
            for (let el of bottomSheet.querySelector('.bottom-sheet__content').children) {
                el.style.display = 'none';
            };
        }, 300);
    }
}

for (const el of bottomSheetCloseActivators) {
    el.addEventListener('click', hideBottomSheet);
}
