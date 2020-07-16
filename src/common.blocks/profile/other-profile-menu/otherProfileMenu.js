(function () {
	const otherProfileMenuActivator = document.querySelector('[data-target="otherProfileMenu"]');
	const otherProfileMenu          = document.getElementById('otherProfileMenu');

	window.addEventListener('click', function (event) {
		if (!(otherProfileMenuActivator || otherProfileMenu)) return;

		otherProfileMenu.style.display = 'none';

		if (otherProfileMenuActivator.contains(event.target) || otherProfileMenu.contains(event.target)) {
			otherProfileMenu.style.display = 'block';
		}
	});
})();
