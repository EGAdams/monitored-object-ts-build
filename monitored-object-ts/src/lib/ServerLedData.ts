/** @class ServerLedData */
import IMonitorLedData from "./IMonitorLedData";
class ServerLedData implements IMonitorLedData {
    constructor() { console.log( "constructing ServerLedData..." ); } // hush warning.

    ledText = "checking status...";
    classObject = {
        background_color: "lightyellow",
        text_align: "left",
        margin_top: "4px",
        color: "black" };
}

export default ServerLedData;
