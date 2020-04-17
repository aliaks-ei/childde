const searchBarActivators = document.querySelectorAll('[data-target="searchBar"]');
const searchBarEl         = document.getElementById('searchBar');

for (const activator of searchBarActivators) {
    activator.addEventListener('click', () => {
        searchBarEl && searchBarEl.classList.toggle('search-bar--visible');
    });
}
