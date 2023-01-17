import { HttpException, Errors } from '@shared/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { UserEntity } from '@entities/users.entity';
import { CreateUserDto } from '@dtos/users.dto';

export class UsersService {
    async getUsers(): Promise<UserEntity[]> {
        const users = await UserEntity.find({ relations: { branch: true } });

        return users;
    }

    async createUser(data: CreateUserDto, reqFile: Express.Multer.File): Promise<UserEntity> {
        for (const branchId of data.allowedBranches) {
            const branch = await BranchEntity.findOneBy({ id: branchId });

            if (!branch) {
                throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Filial topilmadi!');
            }
        }

        const user = await UserEntity.create({ ...data, userImg: reqFile.filename }).save();

        return user;
    }
}
