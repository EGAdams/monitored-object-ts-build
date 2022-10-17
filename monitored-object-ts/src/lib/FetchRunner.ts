import IQueryResultProcessor from "./IQueryResultProcessor";

/** @class FetchRunner class */
export default class FetchRunner {
    url                : string;
    url_encoded_header : Record< string, string >;
    json_header        : Record< string, string >;
    fetch_options     !: RequestInit;

    constructor( config: { api_path: string; } ) {
        this.url = config.api_path;
        this.url_encoded_header = { "Content-Type": "application/x-www-form-urlencoded" };
        this.json_header        = { "Content-Type": "application/json"                  };
    } // establish communication address and define header objects.

    async run( apiArgs: { type: string; }, callbackObject : IQueryResultProcessor ): Promise< void > {
        this.fetch_options = {
            method:  apiArgs.type,
            // mode:    'no-cors',
            headers: apiArgs.type === "POST" ? /* POST */ this.json_header          : /* GET */ this.url_encoded_header,
            body:    apiArgs.type === "POST" ? /* POST */ JSON.stringify( apiArgs ) : /* GET */ undefined
        };
        fetch( this.url, this.fetch_options ).then( res => {
            return res.json();
        }).then( data => {
            callbackObject.processQueryResult( callbackObject, data );
        }); }
}
// xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" ); // allows "sql="... syntax!
