const userImageEl    = document.getElementById('userImage');
const dropdownMenuEl = document.getElementById('accountDropdown');

userImageEl.addEventListener('click', () => {
    dropdownMenuEl.style.display = 'block';
});
