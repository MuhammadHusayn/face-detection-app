import { NextFunction, Request, Response } from 'express';
import { UsersService } from '@services/users.service';
import { serializer } from '@utils/serializer';
import { UserDto } from '@dtos/users.dto';

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
}

export default UsersController;
