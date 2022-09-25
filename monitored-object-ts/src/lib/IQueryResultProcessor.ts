/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 * @description
 * Objects that represent finished queries are sent
 * to this type of object for further processing.
 *
 * @interface IQueryResultProcessor
 */
 export default interface IQueryResultProcessor {
    processQueryResult( queryResultToBeProcessed: any ): void;
}
