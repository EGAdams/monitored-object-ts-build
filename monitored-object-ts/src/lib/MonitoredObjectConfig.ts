/** @class MonitoredObjectConfig */
class MonitoredObjectConfig {
    url : string = "";
    /**
     * @constructor
     * @param {Object} config - The configuration object.
     */
    constructor( config: { url: string; } ) { this.url = config.url; }

    getUrl() { return this.url; }
}

export default MonitoredObjectConfig;