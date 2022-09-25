/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-class */
/*
 * class Tester
 */
export class Tester {
    testableObjects: Array< string >;
    constructor( testableObjectsArg: Array< string > ) {
        this.testableObjects = testableObjectsArg;
    }

    start(): void {
        this.testableObjects.forEach( async specimen => {
            if ( specimen.length != 0 && !specimen.match( /^#/ )) {
                const Subject = await require( "./" + specimen );
                const subject = new Subject[ specimen ]();
                console.log( "\nbegin " + specimen + " test..." );
                subject.testMe();
                console.log( "end " + specimen + " test.\n" );
            }
        });
    }
}

// const tester = new Tester([ "LogObjectProcessorTest" ]);
// tester.start();
// console.log( "end testing testable objects." );

