/** @class MonitoredObjectConfig */
class MonitoredObjectConfig {
    /**
     * @constructor
     * @param {Object} config - The configuration object.
     */
    constructor( config ) { this.url = config.url; }

    getUrl() { return this.url; }
}

export default MonitoredObjectConfig;