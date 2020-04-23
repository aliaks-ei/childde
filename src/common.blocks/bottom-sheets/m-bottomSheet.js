const bottomSheet                = document.getElementById('bottomSheet');
const bottomSheetContent         = bottomSheet.querySelector('.bottom-sheet__content');
const modalOverlay               = document.querySelector('.modal-overlay');
const bottomSheetCloseActivators = document.querySelectorAll('[data-target="closeBottomSheet"]');

function showBottomSheet() {
    if (bottomSheet) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        bottomSheet.classList.remove('bottom-sheet-wrapper--hidden');
        modalOverlay.classList.remove('modal-overlay--hidden');

        bottomSheetContent.style.display = 'block';

        setTimeout(() => {
            bottomSheet.style.transform = 'translate3d(0, 0, 0)';
            modalOverlay.style.opacity = '0.4';

            modalOverlay.addEventListener('click', hideBottomSheet);
        }, 100);
    }
}

function hideBottomSheet(event) {
    if (bottomSheet) {
        bottomSheet.style.transform  = 'translate3d(0, 100%, 0)';
        modalOverlay.style.opacity   = 0;

        document.documentElement.style.overflow = null;
        document.body.style.overflow = null;

        bottomSheet.addEventListener('transitionend', () => {
            bottomSheet.classList.add('bottom-sheet-wrapper--hidden');
            modalOverlay.classList.add('modal-overlay--hidden');

            modalOverlay.removeEventListener('click', hideBottomSheet);

            for (let el of bottomSheetContent.children) {
                el.style.display = 'none';
            };
        }, { once: true });
    }
}

for (const el of bottomSheetCloseActivators) {
    el.addEventListener('click', hideBottomSheet);
}
