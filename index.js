/**
 * @type {HTMLButtonElement[]}
 */
const collapse_btns = document.querySelectorAll("button[data-collapse-id]");
collapse_btns.forEach((btn) => {
  const collapse_id = btn.getAttribute("data-collapse-id");
  if (collapse_id === null) {
    console.warn("Collapse button is missing a collapse id attribute");
    return;
  }
  const collapse = document.getElementById(collapse_id);
    btn.addEventListener("click", (_) => {
    if (collapse.classList.contains("open")) {
      collapse.style.maxHeight = "0px";
    } else {
      collapse.style.maxHeight = collapse.scrollHeight + "px";
    }
    collapse.classList.toggle("open");
});
});
