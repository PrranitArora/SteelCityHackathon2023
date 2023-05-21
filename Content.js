alert("active");
let popup = document.getElementsByClassName("pop-up");

function openPopup() {
    popup.classList.add("open-pop-up");
}

function closePopup() {
    popup.classList.remove("open-pop-up");
}

function skip () {

}
// const domains = ["www.youtube.com/shorts/*"]
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