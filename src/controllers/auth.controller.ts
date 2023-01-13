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
                
                maxAge: Number(process.env.JWT_EXPIRES_EXPIRATION),
            }).end();
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
