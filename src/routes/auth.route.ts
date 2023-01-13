import validationMiddleware from '@middlewares/validation.middleware';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { LoginDto } from '@dtos/auth.dto';
import { Router } from 'express';

class AuthRoute implements Routes {
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/login', validationMiddleware(LoginDto, 'body'), this.controller.login);
    }
}

export default AuthRoute;
