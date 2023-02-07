import { ControllersEntity } from '@entities/controllers.entity';
import { HttpException, Errors } from '@shared/HttpException';
import { CreateControllerDto } from '@dtos/controllers.dto';

export class ControllersService {
    async getControllers(): Promise<ControllersEntity[]> {
        const controllers = await ControllersEntity.find();

        return controllers;
    }

    async createControllers(body: CreateControllerDto): Promise<ControllersEntity> {
        const [branch] = await ControllersEntity.findBy({ api: body.api });

        if (branch) {
            throw new HttpException(400, Errors.CONTROLLER_ALREADY_EXISTS, 'Bunday controller mavjud!');
        }

        const newController = await ControllersEntity.create({ ...body }).save();
        console.log(newController);
        
        
        return newController;
    }
}
