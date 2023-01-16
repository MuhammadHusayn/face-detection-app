import { NextFunction, Request, Response } from 'express';
import { UserDto, CreateUserDto } from '@dtos/users.dto';
import { UsersService } from '@services/users.service';
import { serializer } from '@shared/serializer';

class UsersController {
    authService = new UsersService();

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.authService.getUsers();

            res.status(200).json(serializer(UserDto, users));
        } catch (error) {
            next(error);
        }
    };

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as CreateUserDto;
            const reqFile = req.file as Express.Multer.File;

            const user = await this.authService.createUser(body, reqFile);

            res.status(200).json({
                status: 200,
                message: 'The user successfully created!',
                data: serializer(UserDto, user),
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
