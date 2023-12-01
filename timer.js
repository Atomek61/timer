const Mode = {
    Ready: "Ready",
    Running: "Running",
    Stopped: "Stopped",
    Paused: "Paused"                
}

class Timer {

    constructor() {
        this._mode = Mode.Ready;
        this.onmodechanged = null;
    }

    doModeChanged() {
        if (this.onmodechanged != null) {
            let e = {target: this};
            this.onmodechanged(e);
        }
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        if (value!=this.mode) {
            this._mode = value;
            this.doModeChanged();
        }
    }

    // time since t0 in seconds
    get elapsed() {
        switch (this.mode) {
            case Mode.Ready: return 0;
            case Mode.Running: return (Date.now().valueOf() - this.t0.valueOf())/1000.0;
            case Mode.Paused: return (this.t1.valueOf() - this.t0.valueOf())/1000.0;
        }
    }

    start() {
        this.t0 = Date.now();
        this.mode = Mode.Running;
    }

    stop() {   
        switch (this.mode) {
            case Mode.Paused:
                this.t1 = Date.now();
                this.mode = Mode.Ready;
                break;
        }             
    }

    pause() {
        if (this.mode==Mode.Running) {
            this.t1 = Date.now();
            this.mode = Mode.Paused;
        }
    }

    continue() {
        if (this.mode==Mode.Paused)
            this.mode = Mode.Running;
    }

}
