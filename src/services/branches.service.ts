import { HttpException, Errors } from '@utils/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { CreateBranchDto, UpdateBranchDto } from '@/dtos/branches.dto';
import { isObjectEmpty } from '@/utils/util';

export class BranchService {
    async getBranch(): Promise<object> {
        const branches = await BranchEntity.find();

        return branches;
    }

    async createBranch(body: CreateBranchDto): Promise<BranchEntity> {
        const [checkBranch] = await BranchEntity.findBy({ branchName: body.branchName });

        if (checkBranch) {
            throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, `Bu filialning nomi allaqachon qo'shilgan!`);
        }

        const user = await BranchEntity.create({ branchName: body.branchName }).save();
        return user;
    }

    async UpdateBranch(params: { id?: number }, body: Partial<UpdateBranchDto>): Promise<BranchEntity> {
        if (isObjectEmpty(params) && !params.id) {
            throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'id param majburiy!');
        }

        const [checkBranch] = await BranchEntity.findBy({ id: params.id });

        if (!checkBranch) {
            throw new HttpException(404, Errors.BAD_REQUEST_ERROR, 'Bunday filial topilmadi!');
        }

        const [checkBranchName] = await BranchEntity.findBy({ branchName: body.branchName });

        if (checkBranchName) {
            throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, `Bu filialning nomi allaqachon qo'shilgan!`);
        }

        const editedBranch = await BranchEntity.save({ id: params.id, ...body });

        return editedBranch;
    }
}
