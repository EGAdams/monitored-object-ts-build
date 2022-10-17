import IQueryResultProcessor from './IQueryResultProcessor';
import ISourceQueryConfig from "./ISourceQueryConfig";
import SourceData from "./SourceData";

/** @class Model */
/**
 * Creates a new Model instance and hooks up the sourceData.
 *
 * @constructor
 * @param {object} sourceData A reference to the client side sourceData class
 */
export default class Model {
    sourceData: SourceData;
    constructor( sourceData: SourceData ) { this.sourceData = sourceData; }
    /**
     * selects one object from the database
     *
     * @param { function } [ callbackObject ] The callbackObject to fire after the object has been retrieved
     */
    selectObject ( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) {
        this.sourceData.selectObject( query_config, callbackObject ); }
    /**
     * Gets all objects from the database
     *
     * @param { function } [ callbackObject ] The callbackObject to fire after the objects have been retrieved
     */
    selectAllObjects ( callbackObject: IQueryResultProcessor ) { this.sourceData.selectAllObjects( callbackObject ); }
    /**
     * Will insert an object into the database.
     *
     * @param {object} query_config The call type, object id and object data
     * @param {function} callbackObject The callbackObject to fire after inserting new data
     */
    insertObject ( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) { this.sourceData.insertObject( query_config, callbackObject ); }
    /**
     * Will update an existing object in the database.
     *
     * @param {object} query_config The call type, object id and object data
     * @param {function} callbackObject The callbackObject to fire after the update
     */
    updateObject ( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) { this.sourceData.updateObject( query_config, callbackObject ); }
}
