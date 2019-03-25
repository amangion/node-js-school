import { AbstractTransformer } from './abstractTransformer';

export class DeleteSpaceTransformer extends AbstractTransformer {
    protected transformChunk(chunk: Buffer): String {
        return chunk.toString().replace(/\s/g, '');
    }
}