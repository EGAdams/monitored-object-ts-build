let ConfigurationManager = ( function( config ){
    let instance;
    return {
        getInstance: function(){
            if ( instance == null ) {
                instance = MonitoredObjectConfig( config );
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
   };
})();

export default ConfigurationManager;