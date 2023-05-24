alert("active2");

// // Pause video
// chrome.tabs.executeScript(tabs[0].id, { code: `
//     console.log("trying to pause");
    
// `});
setTimeout(() => {
        var player = document.querySelectorAll('video')[0];
        player.pause()
    }, 800); // Pause the video if it's playing

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