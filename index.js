/**
 * @type {HTMLButtonElement[]}
 */
const collapse_btns = document.querySelectorAll("button[data-collapse-id]");
collapse_btns.forEach((btn) => {
    btn.addEventListener("click", (_) => {
        const collapse_id = btn.getAttribute("data-collapse-id");
        if (collapse_id === null) {
            console.warn("Collapse button is missing a collapse id attribute");
            return;
        }
        const collapse = document.getElementById(collapse_id);
        collapse.classList.toggle("collapse");
    })
});
