const bottomNav = document.getElementById("bottomNav");

if (bottomNav) {
  const bottomMenuActivator = bottomNav.querySelector(
    '[data-target="bottomMenu"]'
  );

  let prevScrollPos = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollPos = window.scrollY;

    bottomNav.style.bottom = `${prevScrollPos > currentScrollPos ? 12 : -96}px`;
    prevScrollPos = currentScrollPos;
  });

  bottomMenuActivator.addEventListener("click", function () {
    const bottomMenu = document.getElementById(this.dataset.target);

    bottomMenu.style.display = "block";

    showBottomSheet();
  });
}
