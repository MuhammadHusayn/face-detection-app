import authorizationMiddleware from '@middlewares/authorization.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router, Request, Response } from 'express';
import path from 'path';

class ClientRoute implements Routes {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', authorizationMiddleware(), (req: Request, res: Response) => res.sendFile(path.join(process.cwd(), 'src/client/index.html')));
        this.router.get('/login', (req: Request, res: Response) => res.sendFile(path.join(process.cwd(), 'src/client/login.html')));
    }
}

export default ClientRoute;
