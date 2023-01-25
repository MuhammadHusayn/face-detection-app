import { CreateBranchDto, UpdateBranchDto } from '@dtos/branches.dto';
import { HttpException, Errors } from '@shared/HttpException';
import { BranchEntity } from '@entities/branches.entity';
import { UserEntity } from '@/entities/users.entity';
import { isObjectEmpty } from '@shared/utils';

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
        if (isObjectEmpty(params) || !params.id || params.id == undefined) {
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
    
    async deleteBranch(params: { id?: string }): Promise<void> {
        if (isObjectEmpty(params) || !params.id || params.id == undefined) {
            throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'ID kiritish majburiy!');
        }
        
        const [branch] = await BranchEntity.find({ where: { id: params.id } });
        
        if (!branch) {
            throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Bunday filial topilmadi!');
        }
        
        const user = await UserEntity.find({ relations: { branch: true } })

        for (const i of user) {

            const allowedBranches = i.allowedBranches[0].split(',').find(el => el == params.id)

            if (allowedBranches) {
                throw new HttpException(403, Errors.REFERENCES_WITH_USER, `Filialni o'chirish mumkin emas, bu filialda qaysidir hodim faoliyat yurg'izadi`);
            }
            
            if (i.branch.id == params.id){
                throw new HttpException(403, Errors.REFERENCES_WITH_USER, `Filialni o'chirish mumkin emas, bu filialda qaysidir hodim faoliyat yurg'izadi`);
            }

        }
        
        await BranchEntity.delete({ id: params.id });
    }
}