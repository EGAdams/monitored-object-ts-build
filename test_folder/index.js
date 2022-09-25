'use strict';
const { Tester } = require( 'log-object-processor' );
const { LogObjectContainerSource } = require( 'log-object-processor' );
const { LogObjectProcessor }       = require( 'log-object-processor' );
const { LogObjectContainer }       = require( 'log-object-processor' );
const container                    = new LogObjectContainer();
const processor                    = new LogObjectProcessor();
const sourceConfig = {
    type: "url",
    location: "http://localhost:8080/test_folder/test_folder/index.js"
}
const logObjectContainerSource = new LogObjectContainerSource( sourceConfig );
// processor.updateQue();
console.log( "creating new tester..." );
const tester = new Tester([ "LogObjectProcessorTest" ]);
console.log( "tester created." );
console.log( "starting test..." );
tester.start();
console.log( "end testing testable objects." );
// logObjectContainerSource.refresh( "MessageManager_1526" );
let logs = logObjectContainerSource.getWrittenLogs();
console.log( logs.length );
