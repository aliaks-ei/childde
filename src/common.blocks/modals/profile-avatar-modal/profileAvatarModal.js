(function () {
	const profileAvatarModalActivators      = document.querySelectorAll('[data-target="profileAvatarModal"]');
	const profileAvatarModalCloseActivators = document.querySelectorAll('[data-target-close="profileAvatarModal"]');

	function handleProfileAvatarModalClick(event) {
		const avatarModalInputClearIcon = this.querySelector('.profile-avatar-modal__input__clear-icon');

		const isProfileAvatarModalCloseClicked = [...profileAvatarModalCloseActivators].some(
			activator => activator.contains(event.target)
		);

		if (event.target == avatarModalInputClearIcon) {
			avatarModalInputClearIcon.previousElementSibling.value = null;
		}
		else if (isProfileAvatarModalCloseClicked || !this.firstElementChild.contains(event.target)) {
			hideModal(this);

			this.removeEventListener('click', handleProfileAvatarModalClick);
		}
	}

	for (const activator of profileAvatarModalActivators) {
		activator.addEventListener('click', function () {
			const profileAvatarModal = document.getElementById('profileAvatarModal');

			showModal(profileAvatarModal);

			profileAvatarModal.addEventListener('click', handleProfileAvatarModalClick);
		});
	}
})();
