/*
 *  interface ICommandFinishedEmitter
 */
interface ICommandFinishedEmitter {
    emit ( listenerText: string, objectToEmit: unknown ): void;
    on ( queryResultProcessorText: string, objectToEmit: unknown ): void;
}

export default ICommandFinishedEmitter;
