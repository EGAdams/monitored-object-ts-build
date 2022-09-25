import MonitorLedClassObject from "./MonitorLedClassObject.js";
/** @class MonitorLed */

class MonitorLed {
    classObject:   MonitorLedClassObject;
    ledText:       string;
    RUNNING_COLOR: string;
    PASS_COLOR:    string;
    FAIL_COLOR:    string;
    constructor() {
        this.classObject   = new MonitorLedClassObject();
        this.ledText       = "ready.";
        this.RUNNING_COLOR = "lightyellow";
        this.PASS_COLOR    = "lightgreen";
        this.FAIL_COLOR    = "#fb6666"; // lightred is not understood by CSS.  Whaaa... ??
    }

    setFail() {
        this.setLedBackgroundColor( this.FAIL_COLOR );
        this.setLedTextColor(       "white"         ); }

    setLedBackgroundColor( newColor ) { this.classObject.background_color = newColor; }
    setLedTextColor(       newColor ) { this.classObject.color            = newColor; }
    setLedText(            newText  ) { this.ledText                      = newText ; }
}

export default MonitorLed;
