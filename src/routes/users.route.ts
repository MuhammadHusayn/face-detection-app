import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AuthRoute implements Routes {
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/users', this.controller.getUsers);
    }
}

export default AuthRoute;
