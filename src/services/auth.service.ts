import { HttpException, Errors } from '@utils/HttpException';
import { UserEntity } from '@entities/users.entity';
import { LoginDto } from '@dtos/auth.dto';
import { JWT } from '@lib/Jwt';

export class AuthService {
    async login(body: LoginDto): Promise<string> {
        const [user] = await UserEntity.findBy({ username: body.username, password: body.password });

        if (!user) {
            throw new HttpException(404, Errors.WRONG_PASSWORD, 'Username yoki Parol xato!');
        }

        if (user.isAdmin !== true) {
            throw new HttpException(403, Errors.FORBIDDEN_ERROR, 'Siz uchun ruxsat yoq!');
        }

        const accessToken = JWT.createAccessToken({ userId: user.id });

        return accessToken;
    }
}
