const answerModalActivators      = document.querySelectorAll('[data-target="answerModal"]');
const answerModalCloseActivators = document.querySelectorAll('[data-target-close="answerModal"]');

let uploadImageActivator;
let addLinkActivator;

function handleAnswerModalClick(event) {
    uploadImageActivator.nextElementSibling.style.display = 'none';
    addLinkActivator.nextElementSibling.style.display = 'none';
    userSelectDropdownActivator.nextElementSibling.style.display = 'none';

    const isAnswerModalCloseActivatorClicked = [...answerModalCloseActivators].some(
        activator => activator.contains(event.target)
    );

    if (uploadImageActivator.contains(event.target)) {
        uploadImageActivator.nextElementSibling.style.display = 'block';
    }
    else if (addLinkActivator.contains(event.target)) {
        addLinkActivator.nextElementSibling.style.display = 'block';
    }
    else if (userSelectDropdownActivator.contains(event.target)) {
        userSelectDropdownActivator.nextElementSibling.style.display = 'block';
    }
    else if (isAnswerModalCloseActivatorClicked || !this.firstElementChild.contains(event.target)) {
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
    });
}
