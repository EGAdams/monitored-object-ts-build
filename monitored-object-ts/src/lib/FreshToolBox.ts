/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-class */
/**
 *  @class FreshToolBox
 *
 *  @description
 *  tools that I frequently use.
 *
 */
export default class FreshToolBox {
    constructor() { console.log( "constructing fresh tool box..." ); }
    /**
     * @method removeObjectFromArray
     * @description
     * removes an object from an array of any type of objects.
     *
     * @param {unknown} objectToRemove
     * @param {Array< unknown >} arrayToRemoveItFrom
     * @return {*}  {Array< unknown >}
     * @memberof FreshToolBox
     */
    // eslint-disable-next-line functional/no-return-void
    static removeSpecificObjectFromArray ( objectToRemove: unknown, arrayToRemoveItFrom: Array< unknown > ): void {
        arrayToRemoveItFrom.splice( arrayToRemoveItFrom.indexOf( objectToRemove ), 1 ); }

    static capitalizeFirstLetter ( stringToUppercase: string ): string {
        return stringToUppercase.charAt( 0 ).toUpperCase() + stringToUppercase.slice( 1 ); }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isInArray ( objectToSearchFor: any, arrayToSearch: Array< any > ): boolean {
        // eslint-disable-next-line functional/no-loop-statement
        for ( const element in arrayToSearch ) {
            if ( arrayToSearch[ element ].id == objectToSearchFor.id ) {
                return true; }
        }
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static assert( condition: any, msg?: string ): asserts condition {
        if ( !condition ) {
            throw new Error( msg )
        }}
}
