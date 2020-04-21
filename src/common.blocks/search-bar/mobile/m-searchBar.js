const searchBarActivators = document.querySelectorAll('[data-target="searchBar"]');
const searchBarEl         = document.getElementById('searchBar');
const bottomNavMenu       = document.getElementById('bottomNavMenu');

for (const activator of searchBarActivators) {
    activator.addEventListener('click', () => {
        if (!searchBarEl) return; 

        if (searchBarEl.classList.contains('search-bar--visible')) {
            searchBarEl.classList.remove('search-bar--visible');
            bottomNavMenu.style.bottom = '24px';
        }
        else {
            searchBarEl.classList.add('search-bar--visible');
            bottomNavMenu.style.bottom = '-96px';

            setTimeout(() => searchBarEl.querySelector('.search-bar__input').focus(), 100);
        }
    });
}
