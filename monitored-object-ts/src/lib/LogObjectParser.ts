/*
 *  class LogObjectParser
 */
import type ILogObject from "./ILogObject";
export default class LogObjectParser {
    constructor() { console.log( "constructing LogObjectParser" ); }

    public createLogObjectFromString( /* logObjectString: any */ ): ILogObject {
        const logObject: ILogObject = {
            id:        "",
            timestamp: 0,
            message:   "",
            method:    "" };
        return logObject; }
}
