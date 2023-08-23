(function () {
  const profileTabsWrapper = document.querySelector(".profile-tabs-wrapper");
  const profileTabLinks = document.querySelectorAll(".profile-tabs__link");

  if (profileTabsWrapper) {
    const tabsContent = profileTabsWrapper.nextElementSibling.children;

    profileTabsWrapper.addEventListener("click", function (event) {
      const currentProfileTabLink = event.target.closest(".profile-tabs__link");

      if (currentProfileTabLink) {
        const hash = new URL(currentProfileTabLink.href).hash.substr(1);
        const currentTabContent = document.getElementById(hash);

        [...profileTabLinks].forEach((profileTab) =>
          profileTab.classList.remove("profile-tabs__link--active")
        );
        [...tabsContent].forEach(
          (tabContent) => (tabContent.style.display = "none")
        );

        currentProfileTabLink.classList.add("profile-tabs__link--active");
        currentTabContent.style.display = "block";

        event.preventDefault();
      }
    });
  }
})();
