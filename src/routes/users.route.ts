import { UPLOAD_FOLDER, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_TYPES } from '@config';
import authorizationMiddleware from '@/middlewares/authorization.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import uploadMiddleware from '@middlewares/upload.middleware';
import UsersController from '@controllers/users.controller';
import { Router } from 'express';

class AuthRoute {
    public router = Router();
    public controller = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/users', authorizationMiddleware, this.controller.getUsers);
        this.router.post(
            '/api/users',
            authorizationMiddleware,
            uploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'file', true),
            validationMiddleware(CreateUserDto),
            this.controller.createUser,
        );
        this.router.patch(
            '/api/users/:id',
            authorizationMiddleware,
            uploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'file', false),
            validationMiddleware(UpdateUserDto, 'body', true),
            this.controller.updateUser,
        );
        this.router.delete('/api/users/:id', authorizationMiddleware, this.controller.deleteUser);
    }
}

export default AuthRoute;
