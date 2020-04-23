const bottomSheet                = document.getElementById('bottomSheet');
const bottomSheetContent         = bottomSheet.querySelector('.bottom-sheet__content');
const modalOverlay               = document.querySelector('.modal-overlay');
const bottomSheetCloseActivators = document.querySelectorAll('[data-target="closeBottomSheet"]');

const draggie = new Draggabilly(bottomSheet, { axis: 'y' });

let dragDownVector    = 0;
let dragStartPosition = 0;

draggie.on('dragMove', function (event, pointer, moveVector) {
    if (dragStartPosition - draggie.position.y >= 100) {
        draggie._pointerUp(event.originalEvent, pointer);
    }

    dragDownVector = moveVector.y;
});

draggie.on('pointerDown', function () {
    draggie.enable(); 

    dragDownVector = 0;
    dragStartPosition = bottomSheet.offsetTop;
});

draggie.on('pointerUp', function () {
    if (dragDownVector >= 40) {
        hideBottomSheet();
    }
    else {
        draggie.disable();
        bottomSheet.style.transform = 'translate3d(0, 0, 0)';
    }
});

function showBottomSheet() {
    if (bottomSheet) {
        document.documentElement.classList.add('app-bs-active');
        document.body.classList.add('app-bs-active');

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

function hideBottomSheet() {
    if (bottomSheet) {
        bottomSheet.style.transform  = 'translate3d(0, 100%, 0)';
        modalOverlay.style.opacity   = 0;

        document.documentElement.classList.remove('app-bs-active');
        document.body.classList.remove('app-bs-active'); 

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
