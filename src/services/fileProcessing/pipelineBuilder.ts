import { Readable } from 'stream';
import { TransformerFactory } from './transformers/transformerFactory';

export class PipelineBuilder {
    private stream: Readable;

    public setStream(stream: Readable) {
        this.stream = stream;
    }

    public buildForSteps(steps: String[]): Readable {
        return steps.reduce((stream: Readable, step: String) => {
            return stream.pipe(TransformerFactory.create(step));
        }, this.stream);
    }
}
