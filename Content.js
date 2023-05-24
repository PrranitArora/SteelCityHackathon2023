async function getCaptions(document) {
    console.log(document.body.innerHTML);

    var regexp = new RegExp(/playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/);
    var match = regexp.exec(document.body.innerHTML);

    if (!match) {
        alert ("No captions found");
        return;
    }

    var url = regexp.exec(document.body.innerHTML)[1];
    let decodedUrl = decodeURIComponent(JSON.parse(`"${url}"`));
    let res = await fetch(decodedUrl.replace("youtube.com/", ""));
    let textRes = (await res.text()).split("</text>");

    textRes.pop();

    let retStr = ""

    for (let i of textRes) {
       retStr += i.split('">')[i.split('">').length-1];
    }

    // REPLACE THIS SHIT LATER
    retStr = retStr.replace("&amp;#39;", ",");

    return retStr;
}

alert("active2");

// // Pause video
// chrome.tabs.executeScript(tabs[0].id, { code: `
//     console.log("trying to pause");
    
// `});
// setTimeout(() => {
//         var player = document.querySelectorAll('video')[0];
//         player.pause();
//     }, 2000); // time out is a temporary solution since the time it takes for yt to load differs
// URL event listner
navigation.addEventListener("navigate", e => {
    console.log(navigate => e.destination.url)
  });

// Notification body
const notification = document.createElement("div");
notification.className = 'acho-notification';
notification.innerHTML = 
    `<h1>Warning</h1>
    <p>Sensitive content detected. Skip?</p>
    <button type="button" id="ignore">Ignore</button>
    <button type="button" id="big-brother-john">Skip</button>`;

// Add to current page
document.body.appendChild(notification);

// Button configuration
document.getElementById("ignore").addEventListener("click", () => {
    notification.style.display = "none";
})

document.getElementById("big-brother-john").addEventListener("click", () => {
    let buttons = document.querySelectorAll('.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--text');
    var nextButton = buttons[buttons.length - 1];
    nextButton.click();
})
