import { Readable } from 'stream';
import transformerFactory from './transformers/transformerFactory';
import { Step } from '../../entity/step';

export class PipelineBuilder {
    private transformerFactory;

    public constructor(transformerFactory) {
        this.transformerFactory = transformerFactory;
    }

    public buildForSteps(stream: Readable, steps: Step[]) {
        return steps.sort((a, b) => a.queuePosition - b.queuePosition)
            .reduce((pipeline, step: Step) => {
                return pipeline.pipe(this.transformerFactory.create(step.action));
            }, stream);
    }
}

const pipelineBuilder = new PipelineBuilder(transformerFactory);
export default pipelineBuilder;
