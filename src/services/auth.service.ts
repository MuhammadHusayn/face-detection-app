import jwt from 'jsonwebtoken';
import { Errors } from './../types/enums/errors.enum';
import { HttpException } from '@utils/HttpException';
import { UserEntity } from '@entities/users.entity';
import { UserSingIn } from '@dtos/users.dto';
import { isObjectEmpty } from '@utils/util';

export class AuthService {
    
    async singIn(body: UserSingIn) {
        const user = await UserEntity.findBy({username: body.username, password: body.password, isAdmin: true});
        if (!user[0]) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'User not found!');
        }
            // interface JwtPayload {
            //     exp: any
            // }
            
            
            const secretKey = process.env.JWT_SECRET
            
            // const token = jwt.sign({token: user[0].id.toString() as string}, secretKey as string, { expiresIn: '10s' })
            const token = jwt.sign({token: user[0].id.toString() as string}, secretKey as string, { expiresIn: '10m'});
            console.log(token);
            
            const verifiyed = jwt.verify(token as string, secretKey as string)
            console.log(verifiyed);
    }
}
