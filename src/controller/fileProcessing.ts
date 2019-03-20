import { BaseContext } from 'koa';
import { PipelineBuilder } from '../services/fileProcessing/pipelineBuilder';
import {Step} from "../entity/step";
import {getManager, Repository} from "typeorm";
import {Service} from "../entity/service";
import status = require('http-status');
import {allowedSteps} from '../services/fileProcessing/transformers/transformerFactory';

export default class FileProcessingController {

    pipelineBuilder: PipelineBuilder;

    public constructor() {
        this.pipelineBuilder = new PipelineBuilder();

        this.executeService = this.executeService.bind(this);
    }

    public async create(ctx: BaseContext) {

        const steps: string[] = ctx.request.body.flowSteps;

        if (steps.some(step => allowedSteps.hasOwnProperty(step))) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = `Allowed steps: ${allowedSteps}`;
            return;
        }

        const serviceToBeSaved = new Service();

        serviceToBeSaved.steps = steps.map((step, index) => {
            const stepToBeSaved = new Step();
            stepToBeSaved.action = step;
            stepToBeSaved.queuePosition = index + 1;
            return stepToBeSaved;
        });

        const serviceRepository: Repository<Service> = getManager().getRepository(Service);
        const savedService = await serviceRepository.save(serviceToBeSaved);

        ctx.status = status.CREATED;
        ctx.body = savedService;
    }

    public async executeService(ctx: BaseContext) {
        const serviceRepository: Repository<Service> = getManager().getRepository(Service);

        const service: Service = await serviceRepository.findOne({
            relations: ['steps'],
            where: {
                id: +ctx.params.id
            }
        });

        ctx.set('Content-disposition', 'attachment; filename=test.txt');
        ctx.set('Content-Type', 'application/force-download');

        ctx.body =  this.pipelineBuilder.buildForSteps(ctx.req, service.steps);
    }
}
