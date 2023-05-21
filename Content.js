const domains = ["www.youtube.com"]
if(trigger()) alert("active");

function trigger() {
    let triggered = false;
    console.log("website: " + window.location.hostname)
    if (domains.includes(window.location.hostname)) {
        triggered = true;
    }
    console.log("triggered: " + triggered);

    getCaptions(document);
    

    return triggered;
}

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