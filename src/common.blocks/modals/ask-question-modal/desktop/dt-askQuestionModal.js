const qThemesDropdown           = document.getElementById('qThemesDropdown');
const qThemesDropdownClose      = document.getElementById('qThemesDropdownClose');
const qCoverUploadDropdown      = document.getElementById('qCoverUploadDropdown');
const qCoverUploadCloseBtn      = document.getElementById('qCoverUploadCloseBtn');
const qThemesDropdownActivators = document.querySelectorAll('[data-target="qThemesDropdown"]');
const qUploadCoverActivator     = document.querySelector('[data-target="qUploadCoverBtn"]');

let userSelectDropdownActivator; 

function handleQModalClick(event) {
    userSelectDropdownActivator.nextElementSibling.style.display = 'none';
    qThemesDropdown.style.display = 'none';
    qCoverUploadDropdown.style.display = 'none';

    const isQThemesActivatorClicked = [...qThemesDropdownActivators].some(
        activator => activator.contains(event.target)
    );

    if (qCoverColors.contains(event.target)) {
        changeQCoverColor(event.target);
    }
    else if (isQThemesActivatorClicked) {
        qThemesDropdown.style.display = 'block';
    }
    else if (qUploadCoverActivator.contains(event.target)) {
        qCoverUploadDropdown.style.display = 'block';
    }
    else if (qDetailsBtn.contains(event.target)) {
        showQDetails();
    }
    else if (userSelectDropdownActivator.contains(event.target)) {
        userSelectDropdownActivator.nextElementSibling.style.display = 'block';
    }
    else if (qModalCloseBtn.contains(event.target) || !this.firstElementChild.contains(event.target)) {
        hideModal(this);

        this.removeEventListener('click', handleQModalClick);
        qThemesDropdown.removeEventListener('click', handleQThemesDropdownClick);
        qCoverUploadDropdown.removeEventListener('click', handleQUploadCoverClick);
    }
}

function handleQThemesDropdownClick(event) {
    event.stopPropagation();

    if (qThemesDropdownClose.contains(event.target)) {
        qThemesDropdown.style.display = 'none';
    }
}

function handleQUploadCoverClick(event) {
    event.stopPropagation();

    if (qCoverUploadCloseBtn.contains(event.target)) {
        qCoverUploadDropdown.style.display = 'none';
    }
}

for (const activator of qModalActivators) {
    activator.addEventListener('click', () => {
        const qModal = document.getElementById('qModal');

        qModalCover = qModal.querySelector('.question-modal__cover');
        userSelectDropdownActivator = qModal.querySelector('[data-target="userSelectDropdown"]');

        showModal(qModal);

        qModal.addEventListener('click', handleQModalClick);
        qThemesDropdown.addEventListener('click', handleQThemesDropdownClick);
        qCoverUploadDropdown.addEventListener('click', handleQUploadCoverClick);

        autosize(document.querySelectorAll('textarea'));
    });
}
