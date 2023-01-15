import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AuthRoute implements Routes {
    public router = Router();
    public controller = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/users', this.controller.getUsers);
    }
}

export default AuthRoute;
