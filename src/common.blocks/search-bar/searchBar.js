const searchBarActivators = document.querySelectorAll('[data-target="searchBar"]');
const searchBarEl         = document.getElementById('searchBar');

for (const activator of searchBarActivators) {
	activator.addEventListener('click', () => {
		if (!searchBarEl) return;

		if (searchBarEl.classList.contains('search-bar--visible')) {
			searchBarEl.classList.remove('search-bar--visible');

			if (bottomNav) bottomNav.style.bottom = '24px';
		}
		else {
			searchBarEl.classList.add('search-bar--visible');
			if (bottomNav) bottomNav.style.bottom = '-96px';

			setTimeout(() => searchBarEl.querySelector('.search-bar__input').focus(), 100);
		}
	});
}
