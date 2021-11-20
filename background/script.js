let timePlaying = 0;
let startedPlayingTime = Date.now();
let isPlaying = false;

let portFromCS;

function connected(p) {
    portFromCS = p;
    
    sendTime()
    let interval = setInterval(sendTime, 1000)

    function sendTime() {
        if(isPlaying) {
            portFromCS.postMessage(
                (timePlaying + (Date.now()-startedPlayingTime))
            )
        } else {
            portFromCS.postMessage(
                timePlaying
            )
        }
    }

    function disconnected(p) {
        portFromCS = null;
        clearInterval(interval)
    }

    portFromCS.onDisconnect.addListener(disconnected)
}



browser.runtime.onConnect.addListener(connected);

browser.tabs.onUpdated.addListener(updatedTab)

function updatedTab(tabId, changeInfo, tab) {
    if(tab.url == undefined) return // the url is only visible for youtube.com/* sites
    if(changeInfo.audible == undefined) return;

    console.log(changeInfo)
    
    if(changeInfo.audible) {
        console.log(timePlaying)
        startedPlayingTime = Date.now();
        isPlaying = true;
    } else {
        timePlaying += (Date.now()-startedPlayingTime)-3000 // 3k for the time it takes to unregister audible
        if(timePlaying < 0) timePlaying = 0;
        isPlaying = false;
    }
}