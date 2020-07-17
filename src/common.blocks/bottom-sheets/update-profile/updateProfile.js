(function () {
	const bsUpdateProfile           = document.getElementById('bsUpdateProfile');
	const bsUpdateProfileActivators = document.querySelectorAll('[data-target="bsUpdateProfile"]');

	function handleBsUpdateProfileClick(event) {
		const currentMenuItem = event.target.closest('.update-profile-menu__item-wrapper');

		if (currentMenuItem) {
			hideBottomSheet();

			bottomSheet.addEventListener('transitionend', function () {
				if (!currentMenuItem.dataset.target && bsCoverUpload) {
					bsCoverUpload.style.display = 'block';

					showBottomSheet();
				}
			}, { once: true });
		}
	}

	for (const activator of bsUpdateProfileActivators) {
		activator.addEventListener('click', () => {
			bsUpdateProfile.style.display = 'block';

			bsUpdateProfile.addEventListener('click', handleBsUpdateProfileClick);

			showBottomSheet();
		});
	}
})();
