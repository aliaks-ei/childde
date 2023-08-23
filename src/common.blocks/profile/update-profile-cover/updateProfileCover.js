(function () {
  const updateProfileCoverActivator = document.querySelector(
    '[data-target="profileUpdateCover"]'
  );
  const updateProfileCoverCloseBtn = document.querySelector(
    '[data-target-close="profileUpdateCover"]'
  );
  const updateProfileCoverMenu = document.getElementById("profileUpdateCover");

  function handleUpdateProfileCoverMenuClick(event) {
    if (
      updateProfileCoverCloseBtn.contains(event.target) ||
      !updateProfileCoverMenu.contains(event.target)
    ) {
      updateProfileCoverMenu.style.display = "none";

      window.removeEventListener("click", handleUpdateProfileCoverMenuClick);
    }
  }

  updateProfileCoverActivator &&
    updateProfileCoverActivator.addEventListener("click", function (event) {
      updateProfileCoverMenu.style.display = "block";

      event.stopPropagation();

      if (updateProfileMenu) {
        updateProfileMenu.style.display = "none";
      }

      window.addEventListener("click", handleUpdateProfileCoverMenuClick);
    });
})();
