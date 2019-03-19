import { AbstractTransformer } from './abstractTransformer';

export class UpperCaseTransformer extends AbstractTransformer {
    protected transformChunk(chunk: Buffer): String {
        return chunk.toString().toUpperCase();
    }
}