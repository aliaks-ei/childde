const answerModalActivators = document.querySelectorAll('[data-target="answerModal"]');
const answerModalCloseBtn   = document.getElementById('answerModalCloseBtn');

let userSelectDropdownActivator;

function handleAnswerModalClick(event) {
    userSelectDropdownActivator.nextElementSibling.style.display = 'none';

    if (userSelectDropdownActivator.contains(event.target)) {
        userSelectDropdownActivator.nextElementSibling.style.display = 'block';
    }
    else if (answerModalCloseBtn.contains(event.target) || !this.firstElementChild.contains(event.target)) {
        hideModal(this);

        answerModal.removeEventListener('click', handleAnswerModalClick);
    }
}

for (const activator of answerModalActivators) {
    activator.addEventListener('click', () => {
        const answerModal = document.getElementById('answerModal');

        userSelectDropdownActivator = answerModal.querySelector('[data-target="userSelectDropdown"]');
        showModal(answerModal);

        answerModal.addEventListener('click', handleAnswerModalClick);
        autosize(document.querySelectorAll('textarea'));
    });
}
