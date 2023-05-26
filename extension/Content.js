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

// Import font
// const font = document.createElement("link");
// font.href = "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap";
// font.rel = "stylesheet";
// document.head.appendChild(font);

// const googleFont = document.createElement("link");
// font.href = "https://fonts.googleapis.com";
// font.rel = "preconnect";
// document.head.appendChild(googleFont);

// const googleFont2 = document.createElement("link");
// font.href = "https://fonts.gstatic.com";
// font.rel = "preconnect";
// font.crossOrigin = "anonymous";
// document.head.appendChild(googleFont2);

const font = document.createElement("style");
font.innerHTML =
    `@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');`;
document.head.appendChild(font);


// Notification body
const notification = document.createElement("div");
notification.className = 'popup';
notification.innerHTML =
    `<h1>OOPS</h1>
    <p>Posi Found Something Sus!</p>
    <div class="buttons">
        <button type="button" id="ignore" class="ignore">Ignore</button>
        <button type="button" id="big-brother-john" class="big-brother-john">Skip</button>
    </div>`;
var imgURL = chrome.runtime.getURL("popup-background.png");
notification.style.backgroundImage = "url('" + imgURL + "')",

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
