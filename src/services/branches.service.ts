import { HttpException, Errors } from '@utils/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { CreateBranchDto } from '@/dtos/branches.dto';

export class BranchService {
    async getBranch(): Promise<object> {
        const branches = await BranchEntity.find();

        return branches;
    }

    async createBranch(body: CreateBranchDto): Promise<BranchEntity> {
        const [checkBranch] = await BranchEntity.findBy({branchName: body.branchName})

        if(checkBranch){
            throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, `Bu filialning nomi allaqachon qo'shilgan!`);
        }
        
        const user = await BranchEntity.create({ branchName: body.branchName }).save();
        return user;
    }
}
