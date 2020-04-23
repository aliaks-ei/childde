let uploadImageActivator;
let addLinkActivator;
let userSelectDropdownActivator;

function handleAnswerModalClick(event) {
    uploadImageActivator.nextElementSibling.style.display = 'none';
    addLinkActivator.nextElementSibling.style.display = 'none';
    userSelectDropdownActivator.nextElementSibling.style.display = 'none';

    if (uploadImageActivator.contains(event.target)) {
        uploadImageActivator.nextElementSibling.style.display = 'block';
    }
    else if (addLinkActivator.contains(event.target)) {
        addLinkActivator.nextElementSibling.style.display = 'block';
    }
    else if (userSelectDropdownActivator.contains(event.target)) {
        userSelectDropdownActivator.nextElementSibling.style.display = 'block';
    }
    else if (answerModalCloseBtn.contains(event.target) || !this.firstElementChild.contains(event.target)) {
        hideModal(this);

        this.removeEventListener('click', handleAnswerModalClick);
        uploadImageActivator.nextElementSibling.removeEventListener('click', stopPropagationOnDropdown);
        addLinkActivator.nextElementSibling.removeEventListener('click', stopPropagationOnDropdown);
    }
}

function stopPropagationOnDropdown(event) {
    event.stopPropagation();
}

for (const activator of answerModalActivators) {
    activator.addEventListener('click', () => {
        const answerModal = document.getElementById('answerModal');

        uploadImageActivator = answerModal.querySelector('[data-target="uploadImageDropdown"]');
        addLinkActivator = answerModal.querySelector('[data-target="addLinkDropdown"]');
        userSelectDropdownActivator = answerModal.querySelector('[data-target="userSelectDropdown"]');
        
        showModal(answerModal);

        answerModal.addEventListener('click', handleAnswerModalClick);
        uploadImageActivator.nextElementSibling.addEventListener('click', stopPropagationOnDropdown);
        addLinkActivator.nextElementSibling.addEventListener('click', stopPropagationOnDropdown);

        autosize(document.querySelectorAll('textarea'));
    });
}
