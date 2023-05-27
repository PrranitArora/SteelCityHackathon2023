let prevPageWasShorts = false;
let prevPageShortId = "";

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

function initExtension() {
    var extension = document.querySelector(".acho-notification");

    if (extension == null) {
        // Notification body
        const notification = document.createElement("div");
        notification.className = "acho-notification";
        notification.innerHTML = `
            <h1>Warning</h1>
            <p>Sensitive content detected. Skip?</p>
            <button type="button" id="ignore">Ignore</button>
            <button type="button" id="big-brother-john">Skip</button>
        `;

        // Add to current page
        document.body.appendChild(notification);

        // Button configuration
        document.getElementById("ignore").addEventListener("click", () => {
            notification.style.display = "none";
        })

        document.getElementById("big-brother-john").addEventListener("click", () => {
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
        extension.style.display = "";
    }
}

function closeExtension() {
    var extension = document.querySelector(".acho-notification");

    if (extension !== null) {
        extension.style.display = "none";
    }
}

async function queryApi(vidId) {
    let res = await fetch("http://localhost:8000/score", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": vidId })
    });

    if (res.ok) {
        let intRes = await res.text();

        // Add code to deal with result
        console.log(intRes);
    } else {
        console.error("Score Api Returned Error Code " + res.error);
    }
}

function queryApiWithVidId(vidId) {
    if (!(prevPageWasShorts && prevPageShortId == vidId)) {
        console.log("Quering API with vid id " + vidId);
        queryApi(vidId);
    }
    prevPageWasShorts = true;
    prevPageShortId = vidId;
}

navigation.addEventListener("navigate", e => {
    if (e.destination.url.includes("www.youtube.com/shorts")) {
        if (!prevPageWasShorts) {
            initExtension();
        }
        queryApiWithVidId(e.destination.url.split("www.youtube.com/shorts/")[1]);
    } else {
        closeExtension();
        prevPageWasShorts = false;
    }
});

if (window.location.href.includes("www.youtube.com/shorts")) {
    initExtension();
    queryApiWithVidId(window.location.href.split("www.youtube.com/shorts/")[1]);
}