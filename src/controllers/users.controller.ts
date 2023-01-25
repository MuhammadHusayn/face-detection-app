import { UserDto, CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { stringValuesToPrimitives } from '@/shared/utils';
import { NextFunction, Request, Response } from 'express';
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
            console.log(body);

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

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body as UpdateUserDto;
            const reqFile = req.file as Express.Multer.File;
            const params = stringValuesToPrimitives(req.params || {}) as { id?: string };

            const user = await this.authService.updateUser(body, reqFile, params);

            res.status(200).json({
                status: 200,
                message: 'The user successfully update!',
                data: serializer(UserDto, user),
            });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params || {}) as { id?: string };

            await this.authService.deleteUser(params);

            res.status(200).json({
                status: 200,
                message: 'The user successfully delete!',
            });
        } catch (error) {
            next(error);
        }
    };

    getUserImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params || {}) as { id?: string };

            const userImg = await this.authService.getUserImg(params);

            res.status(200).sendFile(userImg);
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
