const userImageEl    = document.getElementById('userImage');
const dropdownMenuEl = document.getElementById('accountDropdown');

window.addEventListener('click', event => {
    if (userImageEl.contains(event.target)) {
        dropdownMenuEl.classList.toggle('account-widget--visible');
    }
    else if (!dropdownMenuEl.contains(event.target)) {
        dropdownMenuEl.classList.remove('account-widget--visible');
    }
});
