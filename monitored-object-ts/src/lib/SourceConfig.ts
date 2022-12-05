/** @class SourceConfig */
import ISourceConfig from "./ISourceConfig";

export class SourceConfig implements ISourceConfig {
    type      : string;
    location  : string;
    object_id : string;

    constructor ( _type : string, _location : string, object_id : string ) {
        this.type      = _type;
        this.location  = _location;
        this.object_id = object_id; }
}
