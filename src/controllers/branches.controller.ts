import { BranchDto, CreateBranchDto } from '@/dtos/branches.dto';
import { BranchService } from '@/services/branches.service';
import { NextFunction, Request, Response } from 'express';
import { serializer } from '@/utils/serializer';

class BranchController {
    branchService = new BranchService();

    getBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const branches = await this.branchService.getBranch();

            res.status(200).json(serializer(BranchDto, branches));
        } catch (error) {
            next(error);
        }
    };
    
    postBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: CreateBranchDto = req.body
            
            const branch = await this.branchService.createBranch(body);

            res.status(201).json({
                status: 201,
                message: 'Branch successfully created!'
            });
        } catch (error) {
            next(error);
        }
    };
}

export default BranchController;
