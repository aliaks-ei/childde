const bsThemesSelect = document.getElementById("bsThemesSelect");
const bsThemesSelectActivators = document.querySelectorAll(
  '[data-target="bsThemesSelect"]'
);

for (const activator of bsThemesSelectActivators) {
  activator.addEventListener("click", () => {
    bsThemesSelect.style.display = "block";

    showBottomSheet();
  });
}
