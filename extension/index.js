window.addEventListener("load", () => {
    const currSelection = localStorage.getItem("filterSelection");

    if (currSelection != null) {
        document.querySelector("#" + currSelection).checked = true;
    }

    for (let i of document.querySelectorAll("input")) {
        i.addEventListener("change", () => {
            localStorage.setItem("filterSelection", i.value);
        })
    }
});
