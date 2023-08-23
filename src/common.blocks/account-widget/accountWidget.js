const userImageEl = document.getElementById("userImage");
const dropdownMenuEl = document.getElementById("accountDropdown");

window.addEventListener("click", (event) => {
  if (!(userImageEl && dropdownMenuEl)) return;

  dropdownMenuEl.style.display = "none";

  if (
    userImageEl.contains(event.target) ||
    dropdownMenuEl.contains(event.target)
  ) {
    dropdownMenuEl.style.display = "block";
  }
});
