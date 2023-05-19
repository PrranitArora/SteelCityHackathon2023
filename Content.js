const domains = ["www.youtube.com"]
if(trigger()) alert("active");

function trigger() {
    let triggered = false;
    console.log("website: " + window.location.hostname)
    if (domains.includes(window.location.hostname)) {
        triggered = true;
    }
    console.log("triggered: " + triggered);
    return triggered;
}