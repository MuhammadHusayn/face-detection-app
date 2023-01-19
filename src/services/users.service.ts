import fs from 'fs';
import path from 'path';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException, Errors } from '@shared/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { UserEntity } from '@entities/users.entity';

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

    async updateUser(data: UpdateUserDto, reqFile: Express.Multer.File, params: { id?: string }): Promise<UserEntity> {
        const [checkUser] = await UserEntity.findBy({ id: params.id });

        if (!checkUser) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'Ishchi topilmadi!');
        }

        if (data.allowedBranches) {
            for (const branchId of data.allowedBranches) {
                const branch = await BranchEntity.findOneBy({ id: branchId });

                if (!branch) {
                    throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Filial topilmadi!');
                }
            }
        }

        const user = await UserEntity.save({ id: params.id, ...data, userImg: reqFile ? reqFile.filename : checkUser.userImg });
        
        if (reqFile) {
            const check = await fs.existsSync(path.join(__dirname, '../../uploads/', checkUser.userImg))
            if(check){
                await fs.unlinkSync(path.join(__dirname, '../../uploads/', checkUser.userImg));
            }
        }

        return user;
    }

    async deleteUser(params: { id?: string }): Promise<void> {
        const [checkUser] = await UserEntity.findBy({ id: params.id });

        if (!checkUser) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'Ishchi topilmadi!');
        }

        const user = await UserEntity.delete({ id: params.id });

        if (checkUser) {
            const check = await fs.existsSync(path.join(__dirname, '../../uploads/', checkUser.userImg))
            if(check){
                await fs.unlinkSync(path.join(__dirname, '../../uploads/', checkUser.userImg));
            }
        }
    }
}
