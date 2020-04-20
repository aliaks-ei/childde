const searchBarActivators = document.querySelectorAll('[data-target="searchBar"]');
const searchBarEl         = document.getElementById('searchBar');

for (const activator of searchBarActivators) {
    activator.addEventListener('click', () => {
        if (searchBarEl) {
            searchBarEl.classList.toggle('search-bar--visible');
            setTimeout(() => searchBarEl.querySelector('.search-bar__input').focus(), 100);
        }
    });
}
