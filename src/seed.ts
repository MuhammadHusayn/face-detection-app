import { BranchEntity } from '@entities/branches.entity';
import { UserEntity } from '@entities/users.entity';

export const loadSeed = async () => {
    const branches = await BranchEntity.find();
    const users = await UserEntity.find();

    if (!branches.length && !users.length) {
        const branch1 = await BranchEntity.create({ branchName: 'Nasiya Savdo 1' }).save();
        const branch2 = await BranchEntity.create({ branchName: 'Nasiya Savdo 2' }).save();
        const branch3 = await BranchEntity.create({ branchName: 'Nasiya Savdo 3' }).save();
        const branch4 = await BranchEntity.create({ branchName: 'Mir market 1' }).save();

        await UserEntity.create({
            firstName: 'Fayzulloh',
            lastName: 'Shodiyev',
            userImg: 'PATH/TEST',
            email: 'adminfayzulloh@gmail.com',
            password: '7435',
            isAdmin: true,
            allowedBranches: ['bdafd27c-6633-4af9-b64f-517823db6a43'],
            branch: branch1,
        }).save();

        await UserEntity.create({
            firstName: 'Abdulloh',
            lastName: 'Karimov',
            userImg: 'PATH/TEST',
            email: 'abdulloh@gmail.com',
            password: '7435',
            isAdmin: false,
            allowedBranches: ['bdafd27c-6633-4af9-b64f-517823db6a43'],
            branch: branch2,
        }).save();

        await UserEntity.create({
            firstName: 'Hasan',
            lastName: 'Ilhomov',
            userImg: 'PATH/TEST',
            email: 'adminhasan@gmail.com',
            password: '7435',
            isAdmin: true,
            allowedBranches: ['bdafd27c-6633-4af9-b64f-517823db6a43'],
            branch: branch1,
        }).save();

        await UserEntity.create({
            firstName: 'Ali',
            lastName: 'Maxmudov',
            userImg: 'PATH/TEST',
            email: 'ali@gmail.com',
            password: '7435',
            isAdmin: false,
            allowedBranches: ['bdafd27c-6633-4af9-b64f-517823db6a43'],
            branch: branch3,
        }).save();

        await UserEntity.create({
            firstName: 'Vali',
            lastName: 'Jurayev',
            userImg: 'PATH/TEST',
            email: 'vali@gmail.com',
            password: '7435',
            isAdmin: false,
            allowedBranches: ['bdafd27c-6633-4af9-b64f-517823db6a43'],
            branch: branch4,
        }).save();
    }
};
