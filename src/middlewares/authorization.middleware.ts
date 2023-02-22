import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '@entities/users.entity';
import { JWT } from '@lib/Jwt';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        if (!req.headers || !req.headers.authorization) {
            return res.redirect('/login');
        }

        const { authorization } = req.headers;

        const payload = JWT.verifyAccessToken(authorization);

        const [user] = await UserEntity.findBy({ id: payload.userId });

        if (!user) {
            return res.redirect('/login');
        }

        req.reqUser = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default authorizationMiddleware;
