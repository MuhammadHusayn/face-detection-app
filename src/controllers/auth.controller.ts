import { NextFunction, Request, Response } from 'express';
import { UserSingIn } from '@dtos/users.dto';
import { stringValuesToPrimitives } from '@utils/util';
import { AuthService } from '@services/auth.service';
import { serializer } from '@utils/serializer';

class AuthController {
    AuthService = new AuthService();

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body
            const users = await this.AuthService.singIn(body);
            
            // res.status(200).json(serializer(UserSingIn, users));
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
