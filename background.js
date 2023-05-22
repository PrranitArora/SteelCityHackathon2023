let matchingTabs = [];
chrome.tabs.query( {active: true, currentWindow: true, url: "https://www.youtube.com/shorts/*"}, function(tabs) {
    matchingTabs = tabs;
    console.log(matchingTabs);
});

chrome.action.onClicked.addListener((matchingTabs) => {
    chrome.scripting.executeScript({
      target: {matchingTabs},
      files: ['content.js']
    });
  });
