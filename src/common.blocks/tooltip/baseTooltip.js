(function () {
    const addAvatarReminder = document.getElementById('add-avatar-reminder');
    const avatarReminderCloseBtn = document.querySelector('[data-target-close="add-avatar-reminder"]');

    if (addAvatarReminder) {
        window.addEventListener('click', function (event) {
            if (!addAvatarReminder.contains(event.target) || event.target == avatarReminderCloseBtn) {
                addAvatarReminder.remove();
            }
        });
    }
})();
