import { BaseContext } from 'koa';
import { PipelineBuilder } from '../services/fileProcessing/pipelineBuilder';

export default class FileProcessingController {
    public static async createService(ctx: BaseContext) {}

    public static async executeService(ctx: BaseContext) {
        // ["upperCase", "lowerCase", "removeSpaces", "gzip", "ungzip", "encrypt", "decrypt"]

        const pipelineBuilder = new PipelineBuilder();
        pipelineBuilder.setStream(ctx.req);

        ctx.set('Content-disposition', 'attachment; filename=' + 'test.gz');
        ctx.set('Content-Type', 'application/force-download');
        ctx.body = pipelineBuilder.buildForSteps(ctx.query.flowSteps.split(','));
    }
}
