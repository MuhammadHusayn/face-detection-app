import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@services/auth.service';
import { LoginDto } from '@dtos/auth.dto';

class AuthController {
    authService = new AuthService();

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: LoginDto = req.body;
            const accessToken = await this.authService.login(body);

            res.cookie('accessToken', accessToken, {
                maxAge: Number(process.env.JWT_ACCESS_EXPIRATION),
            }).redirect('/');
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.clearCookie('accessToken').redirect('/login');
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
