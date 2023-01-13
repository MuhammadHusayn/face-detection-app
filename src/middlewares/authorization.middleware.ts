import { Request, Response, NextFunction } from 'express';
import { HttpException, Errors } from '@utils/HttpException';
import { JWT } from '@lib/Jwt';
const authorizationMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {

        const cookie = req.cookies.accessToken
        
        if(!cookie){
            throw new HttpException(400, Errors.VALIDATION_ERROR, 'UNAUTHORIZED')
            // res.redirect('/login')
        } 

        const asd = JWT.verifyAccessToken(cookie)
        if(!asd) {
            throw new HttpException(400, Errors.VALIDATION_ERROR, 'UNAUTHORIasdadsaZED')
            // res.redirect('/login')
        }

        next()
    };
};

export default authorizationMiddleware;