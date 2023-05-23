alert("active2");

// Notification body.
const notification = document.createElement("div");
notification.className = 'acho-notification';
notification.innerHTML = 
    `<h1>Warning</h1>
    <p>Sensitive content detected. Skip?</p>
    <button type="button" id="ignore">Ignore</button>
    <button type="button" id="big-brother-john" onclick="skip()">Skip</button>`;

// Add to current page.
document.body.appendChild(notification);

// button configuration
document.getElementById("ignore").addEventListener("click", () => {
    notification.style.display = "none";
})