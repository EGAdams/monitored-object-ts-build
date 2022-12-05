/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 *  class LogObjectContainerSource
 */

import FetchRunner from "./FetchRunner";
import ILogObject from "./ILogObject";
import IQueryResultProcessor from "./IQueryResultProcessor";
import ISourceConfig from "./ISourceConfig";
import ISourceQueryConfig from "./ISourceQueryConfig";
import { LogObjectContainer } from "./LogObjectContainer";
import { LogObjectProcessor } from "./LogObjectProcessor";
import Model from './Model';
import SourceData from "./SourceData";

export class LogObjectContainerSource implements IQueryResultProcessor {
    logObjectContainer: LogObjectContainer;
    logObjectProcessor: LogObjectProcessor;
    model: Model;
    config: ISourceConfig
    source_query_config: ISourceQueryConfig;
    constructor( _config: ISourceConfig ) {
        this.config = _config;
        this.logObjectContainer = new LogObjectContainer();
        this.logObjectProcessor = new LogObjectProcessor( this.logObjectContainer );
        this.model = new Model( new SourceData({ Runner: FetchRunner, url: _config.location }));
        this.source_query_config = { object_view_id: _config.object_id, object_data: {}}; }

    getWrittenLogs () { return this.logObjectProcessor.getWrittenLogs(); }

    refresh() {
        if ( this.config.type === "url" ) {
            this.refreshFromDatabase();
        } else if ( this.config.type === "file" ) {
            this.refreshFromFile( this.config.location );
        }}

    refreshFromDatabase() { this.model.selectObject( this.source_query_config, this ); }

    processQueryResult( resultProcessor: LogObjectContainerSource, result: any ) {
        if ( result.length  === 0  || result.trim() === "null" ) { return; }
        const object_data = JSON.parse( JSON.parse( result ).object_data );
        const logObjects = object_data.logObjects;
        for ( const logObject of logObjects ) {
            resultProcessor.logObjectContainer.addLog( logObject ); }
        resultProcessor.logObjectProcessor.updateQue();
        resultProcessor.logObjectProcessor.processLogObjects(); }

    refreshFromFile( file_path: string ) {
        fetch( file_path )
            .then( response => response.text() )
            .then( text => {
                text = text.split( '\r' ).join( '' ); // if performance is an issue, change this maybe.
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
