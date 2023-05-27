let prevPageWasShorts = false;
let prevPageShortId = "";

function initExtension() {
    var extension = document.querySelector(".acho-notification");

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
          notification.style.display = "none";
      })

      document.getElementById("big-brother-john").addEventListener("click", () => {
          let buttons = document.querySelectorAll('.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--text');
          var nextButton = buttons[buttons.length - 1];
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
