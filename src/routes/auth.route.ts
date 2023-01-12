import validationMiddleware from '@middlewares/validation.middleware';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AuthRoute implements Routes {
    public router = Router();
    public usersController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/login', this.usersController.getUsers);
    }
}

export default AuthRoute;
