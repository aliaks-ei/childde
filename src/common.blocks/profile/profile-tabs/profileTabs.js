(function () {
    const profileTabsWrapper = document.querySelector('.profile-tabs');
    const profileTabs        = document.querySelectorAll('.profile-tabs__tab');

    profileTabsWrapper && profileTabsWrapper.addEventListener('click', function (event) {
        const currentProfileTab = event.target.closest('.profile-tabs__tab');

        if (currentProfileTab) {
            [...profileTabs].forEach(profileTab => profileTab.classList.remove('profile-tabs__tab--active'));

            currentProfileTab.classList.add('profile-tabs__tab--active');
        }
    });
})();
