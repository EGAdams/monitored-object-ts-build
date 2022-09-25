/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 *  class LogObjectContainerSource
 */
import jQuery from "jquery";

import DataSource from './DataSource';
import ILogObject from "./ILogObject";
import { ISourceConfig } from "./ISourceConfig";
import { LogObjectContainer } from "./LogObjectContainer";
import { LogObjectProcessor } from "./LogObjectProcessor";

export class LogObjectContainerSource {
    logObjectContainer: LogObjectContainer;
    logObjectProcessor: LogObjectProcessor;
    dataSource: DataSource;
    config: ISourceConfig
    constructor( _config: ISourceConfig ) {
        this.config = _config;
        this.logObjectContainer = new LogObjectContainer();
        this.logObjectProcessor = new LogObjectProcessor( this.logObjectContainer );
        this.dataSource = new DataSource( _config.location );
    }

    getWrittenLogs () { return this.logObjectProcessor.getWrittenLogs(); }

    refresh( identifier: string ) {
        if ( this.config.type === "url" ) {
            this.refreshFromDatabase( identifier );
        } else if ( this.config.type === "file" ) {
            this.refreshFromFile( this.config.location );
        }
    }

    refreshFromDatabase( object_view_id: string ) { // refactor this mf!
        jQuery( document ).on( "consumeData", this.consumeData );
        const args = {
            query: "select object_data from monitored_objects where object_view_id ='" + object_view_id + "'",
            trigger: "consumeData",
            data: {},
            thisObject: this };
        this.dataSource.runQuery( args );
    }

    consumeData( _event: any, result: { thisObject: any; data: string[][]; }) {
        if( result.data.length  == 0 || result.data[ 0 ][ 0 ].length == 0 ) { return; }
        const object_data = JSON.parse( result.data[ 0 ][ 0 ] );
        const logObjects = object_data.logObjects;
        for ( const logObject of logObjects ) {
            result.thisObject.logObjectContainer.addLog( logObject );
        }
        result.thisObject.logObjectProcessor.updateQue();
        result.thisObject.logObjectProcessor.processLogObjects();
    }

    refreshFromFile( file_path: string ) {
        fetch( file_path )
            .then( response => response.text() )
            .then( text => {
                text = text.replaceAll( '\r', '' );
                const file_array = text.split( "\n" );
                const log_objects: ILogObject[] = [];
                let parsed_line: ILogObject = { id: "", timestamp: 0, message: "", method: "" };
                for ( const line of file_array ) {
                    if ( line.length > 0 ) {
                        try {
                            parsed_line = JSON.parse( line );
                        } catch ( error ) {
                            console.error( "error parsing line: " + line );
                        }
                        log_objects.push( parsed_line );
                    }
                }
                for ( const logObject of log_objects ) {
                    this.logObjectContainer.addLog( logObject );
                }
                this.logObjectProcessor.updateQue();         // from log object container to internal Q
                this.logObjectProcessor.processLogObjects(); // from internal Q to written log objects
            });
    }
}
