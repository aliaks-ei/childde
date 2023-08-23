const bottomMenu = document.getElementById("bottomMenu");

if (bottomMenu) {
  const input = bottomMenu.querySelector("input");

  input.addEventListener("focus", () => {
    const topPosition =
      window.scrollY +
      (window.innerHeight - bottomSheet.offsetHeight) +
      100 +
      "px";

    bottomSheet.classList.add("bs--keyboard-active");
    bottomSheet.style.setProperty("top", topPosition, "important");
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      bottomSheet.style.setProperty("top", "auto", "important");
      bottomSheet.classList.remove("bs--keyboard-active");
    }, 300);
  });
}
