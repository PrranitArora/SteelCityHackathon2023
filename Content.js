alert("active");
openPopup();

const generateHTML = () => {
    return `<div class="pop-up" id="pop-up">
    <h1>Warning</h1>
    <p>Sensitive content detected. Skip?</p>
    <button type="button" onclick="closePopup()">Ignore</button>
    <button type="button" onclick="skip()">Skip</button>
    </div>`
}

const generateCSS = () => {
    return `
        .pop-up {
        width: 400px;
        background-color: white;
        border-radius: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: left;
        padding: 20px;
    }`;
}

function openPopup() {
    window.addEventListener("load", (event) => {
        console.log("page is fully loaded");
    });
    var popup = document.createElement("div");
    popup.id = "pop-up";
    popup.innerHTML = generateHTML();
    popup.style = generateCSS();
    document.body.appendChild(popup); // add popup to page
    document.getElementById("pop-up").style.visibility = "visible";
}

function closePopup() {
    document.getElementById("pop-up").style.visibility = "hidden";
}


function skip () {

}

// function checkUrl() {
//     chrome.tabs.query( {active: true, currentWindow: true, url: "https://www.youtube.com/shorts/*"}, () => {openPopup()});
// }


// if(trigger()) alert("active");

// function trigger() {
//     let triggered = false;
//     console.log("website: " + window.location.hostname)
//     if (domains.includes(window.location.hostname)) {
//         triggered = true;
//     }
//     console.log("triggered: " + triggered);
//     return triggered;
// }