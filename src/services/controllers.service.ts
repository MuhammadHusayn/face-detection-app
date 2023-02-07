import { ControllersEntity } from '@entities/controllers.entity';
import { HttpException, Errors } from '@shared/HttpException';
import { CreateControllerDto, UpdateControllerDto } from '@dtos/controllers.dto';

export class ControllersService {
    async getControllers(): Promise<ControllersEntity[]> {
        const controllers = await ControllersEntity.find();

        return controllers;
    }

    async createControllers(body: CreateControllerDto): Promise<ControllersEntity> {
        const [controller] = await ControllersEntity.findBy({ api: body.api });

        if (controller) {
            throw new HttpException(400, Errors.CONTROLLER_ALREADY_EXISTS, 'Bunday controller mavjud!');
        }

        const newController = await ControllersEntity.create({ ...body }).save();
        console.log(newController);
        
        
        return newController;
    }

    async updateControllers(body: UpdateControllerDto, params: { id: string }): Promise<ControllersEntity> {
        
        if (body.api) {
            const [controller] = await ControllersEntity.findBy({ api: body.api });
            if (controller) {
                throw new HttpException(400, Errors.CONTROLLER_ALREADY_EXISTS, 'Bunday controller mavjud!');
            }
            console.log(body);
            console.log(controller);
        }
        
        const newController = await ControllersEntity.save({ id: params.id, ...body });       
        
        return newController;
    }
}
