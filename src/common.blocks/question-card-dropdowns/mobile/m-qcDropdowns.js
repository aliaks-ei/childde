window.addEventListener('click', event => {
    if (event.target.dataset && event.target.dataset.target === 'qcTopMenu') {
        document.getElementById('qcTopMenu').style.display = 'block';

        showBottomSheet();
    }
    else if (event.target.dataset && event.target.dataset.target === 'qcBottomMenu') {
        document.getElementById('qcBottomMenu').style.display = 'block';

        showBottomSheet();
    }
});