/** @class LogObjectProcessorTest */
import FreshToolBox from "./FreshToolBox";
import ILogObject from "./ILogObject";
import ITestable from "./ITestable";
import { LogObjectContainer } from "./LogObjectContainer";
// import { LogObjectContainerSource } from "./LogObjectContainerSource";
import LogObjectFactory from "./LogObjectFactory";
import { LogObjectProcessor } from "./LogObjectProcessor";
import MonitoredObject from "./MonitoredObject";
/**
 * @description
 * creates 10 log objects and adds them to a log object container.
 * creates 5 more log objects and tries to add all 15.  the LogObjectProcessor should
 * detect the previous 10 entries and only grow by 5.
 *
 * @class LogObjectProcessorTest
 * @implements { ITestable }
 */
export class LogObjectProcessorTest extends MonitoredObject implements ITestable {
    writtenLogs: Array< ILogObject > = [];
    constructor() {
        super( { new_id: "42" });
        console.log( 'constructing LogObjectProcessorTest object...' ); }
    testMe(): void {
        const logObjectContainer = new LogObjectContainer();
        const logObjectFactory   = new LogObjectFactory();
        for ( let i = 0; i < 3; i++ ) {
            logObjectContainer.addLog( logObjectFactory.createLogObject( "message_" + i, this )); }
        FreshToolBox.assert( logObjectContainer.getLogObjects().length === 3, "logObjectContainer.getLogObjects().length === 3" );
        const logObjectProcessor = new LogObjectProcessor( logObjectContainer );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();
        if ( logObjectProcessor.writtenLogs.length !== 3 && logObjectProcessor.unwrittenLogs.length !== 0 ) {
            console.error( "*** LogObjectProcessorTest failed! ***" ); }
        for ( let i = 0; i < 6; i++ ) {
            logObjectContainer.addLog( logObjectFactory.createLogObject( "message_" + i, this )); }
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();

        if ( logObjectProcessor.writtenLogs.length === 9 && logObjectProcessor.unwrittenLogs.length === 0 ) {
            console.log( "LogObjectProcessorTest passed round one." );
        } else {
            console.error( "*** LogObjectProcessorTest failed! ***" );
        }

        const logObject1 = {
            id: "MessageManager_4147044803817_1653574710291",
            timestamp: 1653574710291,
            message: "data loaded.",
            method: "constructor"
        }

        const logObject2 = {
            id: "MessageManager_4034740484153_1653574710298",
            timestamp: 1653574710298,
            message: "setting newly built Admin guest to active...",
            method: "constructor"
        }

        logObjectContainer.addLog( logObject1 );
        logObjectContainer.addLog( logObject2 );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();
        FreshToolBox.assert( logObjectProcessor.writtenLogs.length === 11, "logObjectProcessor.writtenLogs.length === 11" );

        // these next 3 should not add anything to the writtenLogs array
        logObjectContainer.addLog( logObject1 );
        logObjectContainer.addLog( logObject2 );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();

        if ( logObjectProcessor.writtenLogs.length === 11 && logObjectProcessor.unwrittenLogs.length === 0 ) {
            console.log( "LogObjectProcessorTest Passed add two" );
        }

        // const logObjectContainerSource = new LogObjectContainerSource();
        // logObjectContainerSource.refresh( "MessageManager_1526");
        // this.writtenLogs = logObjectProcessor.writtenLogs;
    }
}
