const themesBottomMenuActivators = document.querySelectorAll('[data-target="qcThemesBottomMenu"]');

for (let activator of themesBottomMenuActivators) {
    activator.addEventListener('click', function () {
        document.getElementById('qcThemesMenu').style.display = 'block';

        showBottomSheet();
    });
}
