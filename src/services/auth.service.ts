import { HttpException, Errors } from '@utils/HttpException';
import { UserEntity } from '@entities/users.entity';
import { LoginDto } from '@dtos/auth.dto';
import { JWT } from '@lib/Jwt';

export class AuthService {
    async login(body: LoginDto): Promise<string> {
        const [user] = await UserEntity.findBy({ username: body.username, password: body.password, isAdmin: true });

        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'User not found!');
        }

        const accessToken = JWT.createAccessToken({ userId: user.id });

        return accessToken;
    }
}
