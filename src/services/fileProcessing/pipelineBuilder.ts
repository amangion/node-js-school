import {Readable} from 'stream';
import {TransformerFactory} from './transformers/transformerFactory';
import {Step} from "../../entity/step";

export class PipelineBuilder {
    private transformerFactory;

    public constructor() {
        this.transformerFactory = new TransformerFactory();
    }

    public buildForSteps(stream: Readable, steps: Step[]) {
        return steps.sort((a, b) => a.queuePosition - b.queuePosition)
            .reduce((pipeline, step: Step) => {
                return pipeline.pipe(this.transformerFactory.create(step.action));
            }, stream);
    }
}
