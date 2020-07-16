(function () {
	const updateProfileMenuActivator = document.querySelector('[data-target="updateProfileMenu"]');
	const updateProfileMenu          = document.getElementById('updateProfileMenu')

	if (updateProfileMenuActivator) {
		window.addEventListener('click', function (event) {
			const showUpdateProfileMenu = updateProfileMenuActivator.contains(event.target);

			updateProfileMenu.style.display = showUpdateProfileMenu ? 'block' : 'none';
		});
	}
})();
