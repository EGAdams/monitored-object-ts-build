/** @class DataSource class */
class DataSource {
    constructor(config) { this.url = config.getUrl(); } // establish communication address

    async getObjects( resultProcessorArg ) {
        this.resultProcessor = resultProcessorArg;
        fetch( this.url )
            .then((  response ) => { response.json()
            .then((  result   ) => { this.resultProcessor( result ); });     })
            .catch(( error    ) => { console.log( "error: " + error.stack ); })
            .then(()            => { console.log( "done" );                  }); }

    async insertObject( new_monitored_object ) {
        console.log( "insertObject: " + new_monitored_object.getMonitorId());
        fetch( this.url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ object_view_id: new_monitored_object.getMonitorId(), 
                                   object_data: new_monitored_object })
        }).then((response) => {
            response.json().then(( result ) => {
                console.log( "result: " + result );
            }).catch(( error ) => { 
                console.log( "error: " + error.stack ); 
            });
        }).catch((error) => {
            console.log( "error: " + error.stack );
        }).then(() => {
            console.log( "done" ); }); }
}

export default DataSource;
