import { BaseContext } from 'koa';
import { Transform } from 'stream';

import { PipelineBuilder } from '../services/fileProcessing/pipelineBuilder';

export default class FileProcessingController {
    public static async createService(ctx: BaseContext) {}

    public static async executeService(ctx: BaseContext) {
        // ["upperCase", "lowerCase", "removeSpaces", "gzip", "ungzip", "encrypt", "decrypt"]

        // const pipelineBuilder = new PipelineBuilder();
        // pipelineBuilder.setStream(ctx.req);

        ctx.set('Content-disposition', 'attachment; filename=' + 'test.gz');
        ctx.set('Content-Type', 'application/force-download');
        ctx.query.flowSteps.split(',')



        ctx.body = ctx.req.pipe(new Transform({
            highWaterMark: 1,
            transform(chunk, encoding, callback) {
                this.push(chunk.toString().toUpperCase())
                callback()
            }
        }))

            //pipelineBuilder.buildForSteps(ctx.query.flowSteps.split(','));

    }
}
