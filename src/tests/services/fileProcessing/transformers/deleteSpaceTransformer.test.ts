import sinon = require('sinon');
import { DeleteSpaceTransformer } from '../../../../services/fileProcessing/transformers/deleteSpaceTransformer';

test('Transformer should perform chunks', () => {
    const sourceStr = 'Test string';
    const transformedStr = 'Teststring';

    const  callback = sinon.spy();

    const transformer = new DeleteSpaceTransformer();
    transformer._transform(Buffer.from(sourceStr), 'utf8', callback);

    expect(callback.calledWith(undefined, transformedStr)).toBe(true);
});
