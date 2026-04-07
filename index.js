/**
 * @type {HTMLElement[]}
 */
const panels = [
    aboutMeContainer,
    projectsContainer,
    articlesContainer,
];
/**
 * @type {HTMLButtonElement[]}
 */
const buttons = [
    aboutMeButton,
    projectsButton,
    articlesButton,
];
buttons.forEach((button, i) => button.addEventListener("click", () => openPanel(i)));
function openPanel(i) {
    buttons.forEach((button) => {
        button.classList.remove("tabButtonActive");
        button.classList.add("tabButtonInactive");
    });
    buttons[i].classList.remove("tabButtonInactive");
    buttons[i].classList.add("tabButtonActive")
    panels.forEach((panel) => panel.style.display = "none");
    panels[i].style.display = "block"
}
