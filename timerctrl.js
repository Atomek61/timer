const timeFormat = new Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12: false,
});

function getTimeStr(time) {
    return timeFormat.format(time)
}

function div(dividend, divisor) {
    let quotient = dividend / divisor;
    return Math.floor(quotient);
}

function secondsToString(value) {
    value = value % 3600.0;
    let MM = new Intl.NumberFormat('en-US', {minimumIntegerDigits: 2}).format(div(value, 60.0));
    let SSoSSS = new Intl.NumberFormat('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 3, minimumFractionDigits: 3}).format(value % 60.0);
    return MM+':'+SSoSSS;
}

class TimerController {

    constructor(container) {
        this.container = container;
        this.modulebar = new ModuleBar(this.select('display'), '88:88.8');
        this.modulebar.display('00:00.0')

        this.clockdisplay = new ModuleBar(this.select('clock'), '88:88:88', 'fat');
        this.clockdisplay.colors = ['#068', '#001'];
        this.updateClock();
        setInterval(()=>{this.updateClock()}, 150);

        this.timer = new Timer();
        this.buttonStart = this.select('start');
        this.buttonStop = this.select('stop');
        this.buttonFullscreen = this.select('full');

        this.buttonFullscreen.onclick = (e) => {
            this.fullscreen = !this.fullscreen;
        };

        this.buttonStart.onclick = (e) => {
            switch(this.timer.mode) {
                case Mode.Ready:
                    this.timer.start();
                    setInterval(()=>{
                        this.modulebar.display(secondsToString(this.timer.elapsed));
                    }, 100);
                    break;
                case Mode.Running:
                    this.timer.pause();
                    break;
                case Mode.Paused:
                    this.timer.continue();
                    break;
            }
        };

        this.buttonStop.onclick = (e) => {
            switch(this.timer.mode) {
                case Mode.Paused:
                    this.timer.stop();
                    break;
                    
            }
        };

        this.timer.onmodechanged = (e) => {
            switch(this.timer.mode) {
                case Mode.Ready:
                    this.buttonStart.style.backgroundImage = 'url(img/start.svg)';
                    this.buttonStop.style.visibility = 'hidden';
                    break;
                case Mode.Running:
                    this.buttonStart.style.backgroundImage = 'url(img/pause.svg)';
                    this.buttonStop.style.visibility = 'hidden';
                    break;
                case Mode.Paused:
                    this.buttonStart.style.backgroundImage = 'url(img/continue.svg)';
                    this.buttonStop.style.visibility = 'visible';
                    break;
            }    
        }

        document.body.addEventListener('fullscreenchange', (event) => {
            if (document.fullscreenElement != null)
                this.buttonFullscreen.style.backgroundImage = 'url(img/full2.svg)';
            else
                this.buttonFullscreen.style.backgroundImage = 'url(img/full1.svg)';
        });

    }

    select(classname) {
        return document.querySelector(`#${this.container.id} .${classname}`);
    }

    updateClock() {
        let time = Date.now()
        let HHoMMoSS = getTimeStr(time);
        let HHoMM = HHoMMoSS.slice(0, 5);
        let o = (time % 1000) > 500 ? ' ' : ':';
        let SS = HHoMMoSS.slice(-2);
        this.clockdisplay.display(HHoMM+o+SS);
    }        

    get fullscreen() {
        return document.fullscreenElement != null;
    }

    set fullscreen(value) {
        if (value!=this.fullscreen) {
            if (value)
                document.body.requestFullscreen();
            else
                document.exitFullscreen();
        }
    }

}

