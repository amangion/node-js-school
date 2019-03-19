import { AbstractTransformer } from './abstractTransformer';

export class LowerCaseTransformer extends AbstractTransformer {
    protected transformChunk(chunk: Buffer): String {
        return chunk.toString().toLowerCase();
    }
}