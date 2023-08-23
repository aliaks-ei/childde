const scrollToTopButton = document.getElementById("scrollToTop");

scrollToTopButton &&
  scrollToTopButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
