
const panels = [
    aboutMeContainer,
    projectsContainer,
    articlesContainer,
];
aboutMeButton.addEventListener("click", () => {
    openPanel(aboutMeContainer)
})
projectsButton.addEventListener("click", () => {
    openPanel(projectsContainer)
})
articlesButton.addEventListener("click", () => {
    openPanel(articlesContainer)
})
function openPanel(panel) {
    panels.forEach((panel) => panel.style.display = "none");
    panel.style.display = "block"
}