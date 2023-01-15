import BranchRoute from '@routes/branches.route';
import ClientRoute from '@routes/client.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';

import App from '@/app';

const app = new App([new ClientRoute(), new AuthRoute(), new UsersRoute(), new BranchRoute()]);

app.listen();
