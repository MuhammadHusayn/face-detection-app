import { CreateBranchDto, UpdateBranchDto } from '@dtos/branches.dto';
import { HttpException, Errors } from '@utils/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { isObjectEmpty } from '@/utils/util';

export class BranchService {
    async getBranches(): Promise<BranchEntity[]> {
        const branches = await BranchEntity.find();

        return branches;
    }

    async createBranch(body: CreateBranchDto): Promise<BranchEntity> {
        const [branch] = await BranchEntity.findBy({ branchName: body.branchName });

        if (branch) {
            throw new HttpException(400, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        }

        const newBranch = await BranchEntity.create({ branchName: body.branchName }).save();

        return newBranch;
    }

    async updateBranch(params: { id?: string }, body: Partial<UpdateBranchDto>): Promise<BranchEntity> {
        if (isObjectEmpty(params) && !params.id) {
            throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'ID kiritish majburiy!');
        }

        const [branch] = await BranchEntity.findBy({ id: params.id });

        if (!branch) {
            throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Bunday filial topilmadi!');
        }

        const [checkBranchName] = await BranchEntity.findBy({ branchName: body.branchName });

        if (checkBranchName) {
            throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        }

        const editedBranch = await BranchEntity.save({ id: params.id, ...body });

        return editedBranch;
    }
}
