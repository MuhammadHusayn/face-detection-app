import { HttpException, Errors } from '@shared/HttpException';
import { UserEntity } from '@entities/users.entity';
import { LoginDto } from '@dtos/auth.dto';
import { JWT } from '@lib/Jwt';

export class AuthService {
    async login(body: LoginDto): Promise<string> {
        const [user] = await UserEntity.findBy({ email: body.email });

        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'Bunday foydalanuvchi mavjud emas!');
        }

        if (user.isAdmin !== true) {
            throw new HttpException(403, Errors.FORBIDDEN_ERROR, 'Siz uchun ruxsat yoq!');
        }

        const isPasswordTrue = await UserEntity.checkPassword(body.password, user.password);

        if (!isPasswordTrue) {
            throw new HttpException(400, Errors.WRONG_PASSWORD, 'Parol xato!');
        }

        const accessToken = JWT.createAccessToken({ userId: user.id });

        return accessToken;
    }
}
