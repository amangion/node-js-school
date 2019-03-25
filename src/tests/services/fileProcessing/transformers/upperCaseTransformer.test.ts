
import sinon = require('sinon');
import { UpperCaseTransformer } from '../../../../services/fileProcessing/transformers/upperCaseTransformer';

test('Transformer should perform chunks', () => {
    const sourceStr = 'Test';
    const transformedStr = 'TEST';

    const  callback = sinon.spy();

    const transformer = new UpperCaseTransformer();
    transformer._transform(Buffer.from(sourceStr), 'utf8', callback);

    expect(callback.calledWith(undefined, transformedStr)).toBe(true);
});
