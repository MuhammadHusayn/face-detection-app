import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '@entities/users.entity';
import { JWT } from '@lib/Jwt';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.cookies || !req.cookies.accessToken) {
            return res.clearCookie('accessToken').redirect('/login');
        }

        const { accessToken } = req.cookies;

        const payload = JWT.verifyAccessToken(accessToken);

        const [user] = await UserEntity.findBy({ id: payload.userId });

        if (!user) {
            return res.clearCookie('accessToken').redirect('/login');
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default authorizationMiddleware;
