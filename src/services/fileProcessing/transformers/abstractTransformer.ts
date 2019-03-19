import { Transform, TransformCallback } from 'stream';

export abstract class AbstractTransformer extends Transform {
    protected abstract transformChunk(chunk: Buffer): String;

    _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void {
        callback(undefined, this.transformChunk(chunk));
    }
}