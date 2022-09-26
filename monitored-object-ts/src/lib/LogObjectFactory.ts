import ILogObject       from "./ILogObject.js";
import MonitoredObject from "./MonitoredObject.js";
/**
 * @description
 * creates log objects giving them a unique id,
 * time stamp, and determined calling method.
 *
 * @class LogObjectFactory
 */
class LogObjectFactory {
    someObject: unknown;
    constructor() { console.log( 'constructing LogObjectFactory object...' ); }

    createLogObject( messageArg: string, someObject: MonitoredObject ) {
        const time_now = Date.now();
        const random_number = Math.floor( Math.random() * 10000000000000 );
        const logObject: ILogObject = {
            timestamp: time_now,
            id:        `${ someObject.constructor.name }_${ random_number }_${ time_now }`,
            message:   messageArg,
            method:    this._getCallingMethod() };
        return logObject; }

    _getCallingMethod() {
        const obj = new Error();
        Error.captureStackTrace( obj, this._getCallingMethod );
        if ( obj.stack.split( '\n' )[ 2 ].match( /at\s+\w+.(\w+)/ ) == null ) {
            return 'unknown'; }
        return obj.stack.split( '\n' )[ 2 ].match( /at\s+\w+.(\w+)/ )[ 1 ];
    }
}

export default LogObjectFactory;
