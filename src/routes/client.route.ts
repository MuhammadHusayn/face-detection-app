import authorizationMiddleware from '@middlewares/authorization.middleware';
import { Router, Request, Response } from 'express';
import path from 'path';

class ClientRoute {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', authorizationMiddleware, (req: Request, res: Response) => {
            res.sendFile(path.join(process.cwd(), 'src/views/index.html'));
        });
        this.router.get('/login', (req: Request, res: Response) => res.sendFile(path.join(process.cwd(), 'src/views/login.html')));
        this.router.get('/branches', authorizationMiddleware, (req: Request, res: Response) =>
            res.sendFile(path.join(process.cwd(), 'src/views/branches.html')),
        );
        this.router.get('/users', authorizationMiddleware, (req: Request, res: Response) =>
            res.sendFile(path.join(process.cwd(), 'src/views/users.html')),
        );
    }
}

export default ClientRoute;
