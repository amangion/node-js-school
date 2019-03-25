import { Transform } from 'stream';
import { UpperCaseTransformer } from './upperCaseTransformer';
import { DeleteSpaceTransformer } from './deleteSpaceTransformer';
import { LowerCaseTransformer } from './lowerCaseTransformer';
import * as zlib from 'zlib';

export const UPPER_CASE = 'upperCase';
export const LOWER_CASE = 'lowerCase';
export const REMOVE_SPACES = 'removeSpaces';
export const GZIP = 'gzip';

export const allowedSteps = [
    UPPER_CASE,
    LOWER_CASE,
    REMOVE_SPACES,
    GZIP
];

export class TransformerFactory {
    public create(type: String): Transform {
        switch (type) {
            case UPPER_CASE:
                return new UpperCaseTransformer();
            case LOWER_CASE:
                return new LowerCaseTransformer();
            case REMOVE_SPACES:
                return new DeleteSpaceTransformer();
            case GZIP:
                 return zlib.createGzip();
            default:
                throw new Error('Undefined transformer type: ' + type);
        }
    }
}

export default new TransformerFactory();
