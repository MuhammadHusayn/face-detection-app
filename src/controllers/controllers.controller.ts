import { ControllersService } from '@services/controllers.service';
import { NextFunction, Request, Response } from 'express';
import { ControllerDto, CreateControllerDto } from '@/dtos/controllers.dto';
import { serializer } from '@shared/serializer';

class ControllersController {
    controllersService = new ControllersService();

    getControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controllers = await this.controllersService.getControllers();

            res.status(200).json(serializer(ControllerDto, controllers));
        } catch (error) {
            next(error);
        }
    };

    createControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as CreateControllerDto;
            const controllers = await this.controllersService.createControllers(body);

            res.status(200).json({
                status: 200,
                message: 'The controller successfully created!',
                data: serializer(ControllerDto, controllers),
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ControllersController;
