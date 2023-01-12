// import jwt from 'jsonwebtoken';
import { HttpException, Errors } from '@utils/HttpException';
import { JWT }  from 'lib/Ejs';
import { UserEntity } from '@entities/users.entity';
import { UserSingIn } from '@dtos/users.dto';

export class AuthService {
    
    async singIn(body: UserSingIn, res: any, req: any) {

        const checkClientToken = req.cookies
        
        const [user] = await UserEntity.findBy({username: body.username, password: body.password, isAdmin: true});

        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'User not found!');
        }
        
        const token = JWT.createAccessToken({userId: user.id} as any);
        
        if(!checkClientToken.token){
            res.setHeader('Set-Cookie', 'token='+token)
        }

        return {
            first_name: user.firstName,
            last_name: user.lastName,
            admin: user.isAdmin
        }
        
    }
}
