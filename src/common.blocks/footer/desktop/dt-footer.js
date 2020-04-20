const scrollToTopBtn = document.getElementById('scrollToTop');

scrollToTopBtn && scrollToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
