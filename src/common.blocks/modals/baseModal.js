function showModal(element) {
    if (!element) return;

    element.style.display = 'block';

    document.body.style.paddingRight = `${ window.innerWidth - document.documentElement.clientWidth }px`;
    document.body.classList.add('app-no-scroll');

    element.insertAdjacentHTML('afterend', '<div class="modal-overlay" style="display: block"></div>');
}

function hideModal(element) {
    if (!element) return;

    element.style.display = 'none';

    document.querySelector('.modal-overlay').remove();
    
    document.body.style.paddingRight = null;
    document.body.classList.remove('app-no-scroll');
}
