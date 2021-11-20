let myPort = browser.runtime.connect({name:"yt-timer-popup"});

myPort.onMessage.addListener(handleMessage);

function handleMessage(time) {
    const hours = Math.floor(time/1000/60/60)
    const mins = Math.floor(time/1000/60)%60
    const secs = Math.floor(time/1000)%60

    hoursspan.innerHTML = `${hours}`
    minsecspan.innerHTML = `${mins} mins and ${secs} secs`

    const activeBar = document.getElementById('0')

    activeBar.setAttribute('progress', mins/60*100);

    for(let i = 1; i < 5; i++) {
        let el = document.getElementById(i)
        el.setAttribute('progress', 0)
    }

    for(let j = hours; j > 0; j--) {
        let el = document.getElementById(j)
        if(el == null) continue;
        el.setAttribute('progress', 100)
    }
}
