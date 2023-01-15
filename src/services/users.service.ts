import { HttpException, Errors } from '@utils/HttpException';
import { UserEntity } from '@entities/users.entity';
import { LoginDto } from '@dtos/auth.dto';
import { JWT } from '@lib/Jwt';

export class UsersService {
    async getUsers(body: LoginDto): Promise<string> {}
}
