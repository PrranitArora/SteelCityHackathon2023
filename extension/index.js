window.addEventListener("load", () => {
    chrome.storage.sync.get(['filterSelection']).then(function(currSelection) {
        if (currSelection["filterSelection"] != null) {
            document.querySelector("#" + currSelection["filterSelection"]).checked = true;
        }
    });


    for (let i of document.querySelectorAll("input")) {
        i.addEventListener("change", () => {
            chrome.storage.sync.set({ 'filterSelection': i.value });
        })
    }
});
