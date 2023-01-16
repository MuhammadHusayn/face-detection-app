import { UPLOAD_FOLDER, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_TYPES } from '@config';
import validationMiddleware from '@middlewares/validation.middleware';
import uploadMiddleware from '@middlewares/upload.middleware';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { Router } from 'express';

class AuthRoute implements Routes {
    public router = Router();
    public controller = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/users', this.controller.getUsers);
        this.router.post(
            '/api/users',
            uploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'file'),
            validationMiddleware(CreateUserDto),
            this.controller.createUser,
        );
    }
}

export default AuthRoute;
