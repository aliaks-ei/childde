(function () {
    const addAvatarReminder = document.getElementById('add-avatar-reminder');
    const avatarReminderCloseBtn = document.querySelector('[data-target-close="add-avatar-reminder"]');

    if (addAvatarReminder && avatarReminderCloseBtn) {
        avatarReminderCloseBtn.addEventListener('click', function () {
            addAvatarReminder.remove();
        });
    }
})();
