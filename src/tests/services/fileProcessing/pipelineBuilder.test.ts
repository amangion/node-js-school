import { PipelineBuilder } from '../../../services/fileProcessing/pipelineBuilder';
import { UPPER_CASE, LOWER_CASE, TransformerFactory } from '../../../services/fileProcessing/transformers/transformerFactory';
import { Readable, Writable } from 'stream';
import { Step } from '../../../entity/step';
import sinon = require('sinon');


function getPipelineSteps() {
    const step2 = new Step();
    step2.action = UPPER_CASE;
    step2.queuePosition = 2;

    const step1 = new Step();
    step1.action = LOWER_CASE;
    step1.queuePosition = 1;

    return [step2, step1];
}

function mockFactory(lowerCaseTransformer, upperCaseTransformer) {
    const factory = sinon.createStubInstance(TransformerFactory);
    factory.create.withArgs(LOWER_CASE).returns(lowerCaseTransformer);
    factory.create.withArgs(UPPER_CASE).returns(upperCaseTransformer);
    return factory;
}

test('Should create pipeline for steps', () => {
    const upperCaseTransformer = sinon.createStubInstance(Writable);
    const lowerCaseTransformer = sinon.createStubInstance(Writable);

    lowerCaseTransformer.pipe.withArgs(upperCaseTransformer).returns(upperCaseTransformer);

    const factory = mockFactory(lowerCaseTransformer, upperCaseTransformer);

    const baseStream = sinon.createStubInstance(Readable);
    baseStream.pipe.withArgs(lowerCaseTransformer).returns(lowerCaseTransformer);

    const pipeline = new PipelineBuilder(factory);
    const result = pipeline.buildForSteps(<Readable><any>baseStream, getPipelineSteps());

    expect(result).toEqual(upperCaseTransformer);
});