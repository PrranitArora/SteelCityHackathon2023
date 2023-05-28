let prevPageWasShorts = false;
let prevPageShortId = "";

function initExtension() {
    var extension = document.querySelector(".popup");

    if (extension == null) {
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
        closeExtension();
      })

      document.getElementById("big-brother-john").addEventListener("click", () => {
          let buttons = document.querySelectorAll('.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--text');
          var nextButton = buttons[buttons.length - 1];
          nextButton.click();
          closeExtension(); // Clears error text
      })
    } else {
        extension.style.display = "";
        extension.children[1].innerHTML = "Posi Found Something Sus!"; // Clears error text
    }
}

function closeExtension() {
    var extension = document.querySelector(".popup");

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
        console.log(res)
        let intRes = parseFloat(await res.text());
        console.log(intRes);

        let tolerance = 0.8;

        const bob = await chrome.storage.sync.get(['filterSelection']);
        const currSelection = bob["filterSelection"];
        if (currSelection != null) {
            if (currSelection === "high") {
                tolerance = 0.9
            } else if (currSelection === "low") {
                tolerance = 0.4
            } else {
               tolerance = 0.7 
            }
        } 

        if (intRes > tolerance) {
            initExtension();
            console.log(a);
        } else {
            for (i of document.querySelectorAll("video")) {
                i.play();
            }
        }
    } else {
        console.error("Score Api Returned Error Code " + res.error);
        initExtension();
        document.querySelector(".popup").children[1].innerHTML = "The Short Doesn't Have Captions";
    }
}

function queryApiWithVidId(vidId) {
    for (i of document.querySelectorAll("video")) {
        i.pause();
    }

    if (!(prevPageWasShorts && prevPageShortId == vidId)) {
        console.log("Quering API with vid id " + vidId);
        queryApi(vidId);
    }
    prevPageWasShorts = true;
    prevPageShortId = vidId;
}

navigation.addEventListener("navigate", e => {
    if (e.destination.url.includes("www.youtube.com/shorts")) {
        queryApiWithVidId(e.destination.url.split("www.youtube.com/shorts/")[1]);
    } else {
        closeExtension();
        prevPageWasShorts = false;
    }
});

if (window.location.href.includes("www.youtube.com/shorts")) {
    queryApiWithVidId(window.location.href.split("www.youtube.com/shorts/")[1]);
}
