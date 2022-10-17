import IQueryResultProcessor from './IQueryResultProcessor';
import ISourceDataConfig from './ISourceDataConfig';
import ISourceQueryConfig from './ISourceQueryConfig';
/**
 *
 * @param {object} configuration_object {
 *     runner: xhr, fetch, or some other object that makes AJAX calls
 *     url   : the place where the runner is going to make the api call
 * }
 * The call type, object id and object data
 * @param {function} callbackObject
 *
 */
export default class SourceData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RunnerObject: any;
    url:          string;
    constructor( configuration_object: ISourceDataConfig ) {
        this.RunnerObject = configuration_object.Runner;
        this.url          = configuration_object.url; }

    /**
     * selects all objects from the database
     * @param {function} callbackObject The callbackObject to fire upon retrieving data
     */
    selectAllObjects( callbackObject: IQueryResultProcessor ) {
        const api_path = this.url + "object/selectAll";
        const runner = new this.RunnerObject( api_path );
        const run_config = { type: "GET" }
        runner.run( run_config, callbackObject.processQueryResult ); }

    /**
     * selects one object from the database
     * @param {function} callbackObject The callbackObject to fire upon retrieving data
     */
    selectObject( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) {
        const config = { api_path: `${ this.url } object/select/ ${ query_config.object_view_id }` };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "GET", object_view_id: query_config.object_view_id }
        runner.run( run_config, callbackObject ); }

    /**
     * Will insert an object into the database.
     * @param {object} query_config The call type, object id and object data
     * @param {function} callbackObject The callbackObject to fire after inserting new data
     */
    insertObject( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) {
        const config = { api_path: this.url + "object/insert" };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "POST",
                            object_view_id: query_config.object_view_id,
                            object_data:    query_config.object_data };
        runner.run( run_config, callbackObject.processQueryResult ); }

    /**
     * Will update an existing object in the database.
     *
     * @param {object} query_config The call type, object id and object data
     * @param {function} callbackObject The callbackObject to fire after the update
     *
     * @example
     * updateObject( { "object_view_id": "Parser_5", "object_data": { "led_color": "red"}}, callbackObject.processQueryResult ) {
     *     // will update object with object_view_id Parser_5's led_color to red.
     * });
     */
    updateObject( query_config: ISourceQueryConfig, callbackObject: IQueryResultProcessor ) {
        const config = { api_path: this.url + "object/update" };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "POST",
                            object_view_id: query_config.object_view_id,
                            object_data:    query_config.object_data };
        runner.run( run_config, callbackObject.processQueryResult ); }
}
