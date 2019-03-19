import { Transform } from 'stream';
import { UpperCaseTransformer } from './upperCaseTransformer';
import { DeleteSpaceTransformer } from './deleteSpaceTransformer';
import { LowerCaseTransformer } from './lowerCaseTransformer';
import * as zlib from 'zlib';

export class TransformerFactory {
    public static create(type: String): Transform {
        switch (type) {
            case 'upperCase':
                return new UpperCaseTransformer();
            case 'lowerCase':
                return new LowerCaseTransformer();
            case 'removeSpaces':
                return new DeleteSpaceTransformer();
            case 'gzip':
                 return zlib.createGzip();
            default:
                throw new Error('Undefined transformer type: ' + type);
        }
    }
}
