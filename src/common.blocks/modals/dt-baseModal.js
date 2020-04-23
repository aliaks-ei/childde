function showModal(element) {
    if (!element) return;

    element.style.display = 'block';

    document.body.style.paddingRight = `${ window.innerWidth - document.documentElement.clientWidth }px`;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    element.insertAdjacentHTML('afterend', '<div class="modal-overlay" style="display: block"></div>');
}

function hideModal(element) {
    if (!element) return;

    element.style.display = 'none';

    document.querySelector('.modal-overlay').remove();
    
    document.body.style.paddingRight = null;
    document.body.style.overflow = null;
    document.documentElement.style.overflow = null;
}
