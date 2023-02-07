import authorizationMiddleware from '@/middlewares/authorization.middleware';
import ControllersController from '@controllers/controllers.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateControllerDto } from '@/dtos/controllers.dto';
import { Router } from 'express';

class ControllersRoute {
    public router = Router();
    public controller = new ControllersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/controllers', authorizationMiddleware, this.controller.getControllers);
        this.router.post('/api/controllers', authorizationMiddleware, validationMiddleware(CreateControllerDto, 'body'), this.controller.createControllers);
    }
}

export default ControllersRoute;
