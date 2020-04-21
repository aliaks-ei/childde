const bottomSheet         = document.getElementById('bottomSheet');
const bottomSheetCloseBtn = document.getElementById('closeBottomSheet');
const mainContent         = document.body.firstElementChild;

function showBottomSheet() {
    if (bottomSheet) {
        bottomSheet.querySelector('.bottom-sheet__content').style.display = 'block';
        mainContent.style.overflowY = 'hidden';

        bottomSheet.style.bottom = '-6px';

        bottomSheet.insertAdjacentHTML('afterend', '<div class="modal-overlay" style="display: block"></div>');
        document.querySelector('.modal-overlay').addEventListener('click', hideBottomSheet);
    }
}

function hideBottomSheet() {
    if (bottomSheet) {
        bottomSheet.style.bottom = '-100%';
        mainContent.style.overflowY = 'auto';

        document.querySelector('.modal-overlay').remove();

        setTimeout(() => {
            bottomSheet.querySelector('.bottom-sheet__content').style.display = 'none';
        }, 300);
    }
}

bottomSheetCloseBtn.addEventListener('click', hideBottomSheet);
