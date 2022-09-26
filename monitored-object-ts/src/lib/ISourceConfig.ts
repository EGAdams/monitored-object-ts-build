import IRunner from "./IRunner";

/*
 *  interface ISourceConfig
 */
export interface ISourceConfig {
     readonly type      : string;
     readonly location  : string;
     readonly Runner    : IRunner;
     readonly object_id : string;
}

export default ISourceConfig;
