import { LowerCaseTransformer } from '../../../../services/fileProcessing/transformers/lowerCaseTransformer';
import sinon = require('sinon');

test('Transformer should perform chunks', () => {
    const sourceStr = 'Test';
    const transformedStr = 'test';

    const  callback = sinon.spy();

    const lowerCaseTransformer = new LowerCaseTransformer();
    lowerCaseTransformer._transform(Buffer.from(sourceStr), 'utf8', callback);

    expect(callback.calledWith(undefined, transformedStr)).toBe(true);
});