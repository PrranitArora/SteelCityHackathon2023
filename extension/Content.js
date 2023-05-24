let prevPageWasShorts = false;

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

function initExtension() {
    var extension = document.querySelectorAll(".acho-notification");
    if (extension.length == 0) {
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
            console.log("HELLO");
            let buttons = document.querySelectorAll('.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--text');

            var nextButton; 
            if (buttons.length === 10 || buttons.length === 4) {
                nextButton = buttons[3];
            } else {
                nextButton = buttons[4];
            }
            nextButton.click();
        })
    } else {
        for (let i of extension) {
            i.style.display = "";
        } 
    }
}

if (window.location.href.includes("www.youtube.com/shorts")) {
    initExtension();
}

function closeExtension() {
    var extension = document.querySelectorAll(".acho-notification");

    for (let i of extension) {
        i.style.display = "none";
     }
}

async function queryApi() {
    let res = await fetch("localhost:5000/score", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "caption": "INSERT CAPTION" })
    });

    if (res.ok) {
        let intRes = await res.text();
        console.log(intRes);
    }
}

navigation.addEventListener("navigate", (e) => {
    console.log("HELLO");
    if (e.destination.url.includes("www.youtube.com/shorts")) {
        if (!prevPageWasShorts) {
            initExtension();
        }
        prevPageWasShorts = true;
        queryApi();
    } else {
        closeExtension();
        prevPageWasShorts = false;
    }
});