import { UserEntity } from '@entities/users.entity';

export class UsersService {
    async getUsers(): Promise<UserEntity[]> {
        const users = await UserEntity.find({ relations: { branch: true } });

        return users;
    }
}
