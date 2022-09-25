/** @class TableManager */
class TableManager {
    constructor( newMonitoredObject, dataSourceArg ) { 
        this.monitoredObect = newMonitoredObject; 
        this.dataSource     = dataSourceArg;
        this.dataSource.insertObject( newMonitoredObject )  }
        
    update() { this.dataSource.updateMonitoredObject( this.monitoredObect ); }
}

export default TableManager;
