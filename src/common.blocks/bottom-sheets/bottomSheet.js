const bottomSheet                = document.getElementById('bottomSheet');
const bottomSheetContent         = bottomSheet && bottomSheet.querySelector('.bottom-sheet__content');
const bsOverlay                  = document.querySelector('.bs-overlay');
const bottomSheetCloseActivators = document.querySelectorAll('[data-target="closeBottomSheet"]');

function showBottomSheet() {
    if (bottomSheet) {
        document.body.classList.add('app-no-scroll');

        bottomSheet.classList.remove('bottom-sheet-wrapper--hidden');
        bsOverlay.classList.remove('bs-overlay--hidden');

        bottomSheetContent.style.display = 'block';

        setTimeout(() => {
            bottomSheet.style.transform = 'translate3d(0, 0, 0)';
            bsOverlay.style.opacity = '0.4';

            bsOverlay.addEventListener('click', hideBottomSheet);
        }, 10);
    }
}

function hideBottomSheet() {
    if (bottomSheet) {
        bottomSheet.style.transform  = 'translate3d(0, 100%, 0)';
        bsOverlay.style.opacity   = 0;

        document.body.classList.remove('app-no-scroll'); 

        bottomSheet.addEventListener('transitionend', () => {
            bottomSheet.classList.add('bottom-sheet-wrapper--hidden');
            bsOverlay.classList.add('bs-overlay--hidden');

            bsOverlay.removeEventListener('click', hideBottomSheet);

            for (let el of bottomSheetContent.children) {
                el.style.display = 'none';
            };
        }, { once: true });
    }
}

for (const el of bottomSheetCloseActivators) {
    el.addEventListener('click', hideBottomSheet);
}

if (bottomSheet) {
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
}
