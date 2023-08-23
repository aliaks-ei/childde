(function () {
  const bsOtherProfileMenu = document.getElementById("bsOtherProfileMenu");
  const bsOtherProfileMenuActivators = document.querySelectorAll(
    '[data-target="bsOtherProfileMenu"]'
  );

  for (const activator of bsOtherProfileMenuActivators) {
    activator.addEventListener("click", () => {
      console.log(bsOtherProfileMenu);
      bsOtherProfileMenu.style.display = "block";

      showBottomSheet();
    });
  }
})();
