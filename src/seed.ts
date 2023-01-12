import { UserEntity } from '@entities/users.entity';
import { BranchEntity } from '@entities/branches.entity';

export const loadSeed = async () => {
    const branches = await BranchEntity.find();
    const users = await UserEntity.find();
    if (!branches.length && !users.length) {
        const branch1 = await BranchEntity.create({ branchName: 'Nasiya Savdo 1' }).save();
        const branch2 = await BranchEntity.create({ branchName: 'Nasiya Savdo 2' }).save();
        const branch3 = await BranchEntity.create({ branchName: 'Nasiya Savdo 3' }).save();
        const branch4 = await BranchEntity.create({ branchName: 'Mir market 1' }).save();
        const branch5 = await BranchEntity.create({ branchName: 'Pokiza 1' }).save();

        await UserEntity.create({
            firstName: 'Fayzulloh',
            lastName: 'Shodiyev',
            userImg: 'PATH/TEST',
            username: 'adminfayzulloh',
            password: '7435',
            isAdmin: true,
            allowedBranches: 'bdafd27c-6633-4af9-b64f-517823db6a43',
            branch: branch1,
        }).save();
        await UserEntity.create({
            firstName: 'Abdulloh',
            lastName: 'Karimov',
            userImg: 'PATH/TEST',
            username: 'abdulloh',
            password: '7435',
            isAdmin: false,
            allowedBranches: 'bdafd27c-6633-4af9-b64f-517823db6a43',
            branch: branch2,
        }).save();
        await UserEntity.create({
            firstName: 'Hasan',
            lastName: 'Ilhomov',
            userImg: 'PATH/TEST',
            username: 'adminhasan',
            password: '7435',
            isAdmin: true,
            allowedBranches: 'bdafd27c-6633-4af9-b64f-517823db6a43',
            branch: branch1,
        }).save();
        await UserEntity.create({
            firstName: 'Ali',
            lastName: 'Maxmudov',
            userImg: 'PATH/TEST',
            username: 'ali',
            password: '7435',
            isAdmin: false,
            allowedBranches: 'bdafd27c-6633-4af9-b64f-517823db6a43',
            branch: branch3,
        }).save();
        await UserEntity.create({
            firstName: 'Vali',
            lastName: 'Jurayev',
            userImg: 'PATH/TEST',
            username: 'vali',
            password: '7435',
            isAdmin: false,
            allowedBranches: 'bdafd27c-6633-4af9-b64f-517823db6a43',
            branch: branch4,
        }).save();
    }
};
