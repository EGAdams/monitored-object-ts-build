import FreshToolBox from "./FreshToolBox";
import ILogObject   from "./ILogObject";

/**
 * @description
 * container for log objects.
 *
 * @class LogObjectContainer
 */
export class LogObjectContainer {
    logObjects: Array< ILogObject > = [];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    addLog( logToAdd: ILogObject ): void {
        if ( !FreshToolBox.isInArray( logToAdd, this.logObjects )) {
            this.logObjects.push( logToAdd ); }}

    getLogObjects(): Array< ILogObject > { return this.logObjects; }

    clearLogs(): void { this.logObjects = []; }
}
