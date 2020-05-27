(function () {
    const subscribeThemesModalActivators      = document.querySelectorAll('[data-target="subscribeToThemesModal"]');
    const subscribeThemesModalCloseActivators = document.querySelectorAll('[data-target-close="subscribeToThemesModal"]');

    function handleSubscribeThemesModalClick(event) {
        const isSubscribeThemesModalCloseClicked = [...subscribeThemesModalCloseActivators].some(
            activator => activator.contains(event.target)
        );

        if (isSubscribeThemesModalCloseClicked || !this.firstElementChild.contains(event.target)) {
            hideModal(this);
    
            this.removeEventListener('click', handleSubscribeThemesModalClick);
        }
    }

    for (const activator of subscribeThemesModalActivators) {
        activator.addEventListener('click', function () {
            const subscribeThemesModal = document.getElementById('subscribeToThemesModal');

            showModal(subscribeThemesModal);
            
            subscribeThemesModal.addEventListener('click', handleSubscribeThemesModalClick);
        });
    }
})();
