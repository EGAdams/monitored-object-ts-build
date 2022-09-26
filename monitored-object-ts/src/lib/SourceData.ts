/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 * @param {object} configuration_object {
 *     runner: xhr, fetch, or some other object that makes AJAX calls
 *     url   : the place where the runner is going to make the api call
 * }
 * The call type, object id and object data
 * @param {function} callback Our fake DB uses callbacks because in
 * real life you probably would be making AJAX calls
 */
export default class SourceData {
    RunnerObject: any;
    url:          string;
    api_path:     string;
    constructor( configuration_object ) {
        this.RunnerObject = configuration_object.runner;
        this.url          = configuration_object.url;
    }

    /**
     * selects all objects from the database
     * @param {function} callback The callback to fire upon retrieving data
     */
    selectAllObjects( callback ) {
        const api_path = this.url + "object/selectAll";
        const runner = new this.RunnerObject( api_path );
        const run_config = { type: "GET" }
        runner.run( run_config, callback );
    }

    /**
     * selects one object from the database
     * @param {function} callback The callback to fire upon retrieving data
     */
    selectObject( data_config, callback ) {
        const config = { api_path: this.url + "object/select" };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "GET", object_view_id: data_config.object_view_id }
        runner.run( run_config, callback );
    }

    /**
     * Will insert an object into the database.
     * @param {object} data_config The call type, object id and object data
     * @param {function} callback The callback to fire after inserting new data
     */
    insertObject( data_config, callback ) {
        const config = { api_path: this.url + "object/insert" };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "POST",
                            object_view_id: data_config.object_view_id,
                            object_data:    data_config.object_data };
        runner.run( run_config, callback ); }

    /**
     * Will update an existing object in the database.
     *
     * @param {object} data_config The call type, object id and object data
     * @param {function} callback The callback to fire after the update
     *
     * @example
     * updateObject( { "object_view_id": "Parser_5", "object_data": { "led_color": "red"}}, callback ) {
     *     // will update object with object_view_id Parser_5's led_color to red.
     * });
     */
    updateObject( data_config, callback ) {
        const config = { api_path: this.url + "object/update" };
        const runner = new this.RunnerObject( config );
        const run_config = { type: "POST",
                            object_view_id: data_config.object_view_id,
                            object_data:    data_config.object_data };
        runner.run( run_config, callback ); }
}
