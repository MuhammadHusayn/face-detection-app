import authorizationMiddleware from '@middlewares/authorization.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBranchDto, UpdateBranchDto } from '@dtos/branches.dto';
import BranchController from '@controllers/branches.controller';
import { Router } from 'express';

class BranchRoute {
    public router = Router();
    public controller = new BranchController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/branch', authorizationMiddleware, this.controller.getBranches);
        this.router.post('/api/branch', authorizationMiddleware, validationMiddleware(CreateBranchDto, 'body'), this.controller.createBranch);
        this.router.patch('/api/branch/:id', authorizationMiddleware, validationMiddleware(UpdateBranchDto, 'body'), this.controller.updateBranch);
    }
}

export default BranchRoute;
