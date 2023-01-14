import authorizationMiddleware from '@/middlewares/authorization.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateBranchDto } from '@/dtos/branches.dto';
import BranchController from '@/controllers/branches.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class BranchRoute implements Routes {
    public router = Router();
    public controller = new BranchController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/branch', authorizationMiddleware, this.controller.getBranch);
        this.router.post('/api/branch', [authorizationMiddleware, validationMiddleware(CreateBranchDto, 'body')] , this.controller.postBranch);
    }
}

export default BranchRoute;
