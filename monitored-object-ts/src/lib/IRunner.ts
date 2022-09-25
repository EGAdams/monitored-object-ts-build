/**
 *
 * @description
 * runs web requests.
 *
 * @export
 * @interface IRunner
 */
 export default interface IRunner { run( apiArgs: unknown ): Promise< void >; }
