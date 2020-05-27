(function () {
    const profileInfoModalActivators      = document.querySelectorAll('[data-target="profileInformationModal"]');
    const profileInfoModalCloseActivators = document.querySelectorAll('[data-target-close="profileInformationModal"]');

    function handleProfileInfoModalClick(event) {
        const isProfileInfoModalCloseClicked = [...profileInfoModalCloseActivators].some(
            activator => activator.contains(event.target)
        );

        if (isProfileInfoModalCloseClicked || !this.firstElementChild.contains(event.target)) {
            hideModal(this);
    
            this.removeEventListener('click', handleProfileInfoModalClick);
        }
    }

    for (const activator of profileInfoModalActivators) {
        activator.addEventListener('click', function () {
            const profileInfoModal = document.getElementById('profileInformationModal');

            showModal(profileInfoModal);
            
            profileInfoModal.addEventListener('click', handleProfileInfoModalClick);
        });
    }
})();
