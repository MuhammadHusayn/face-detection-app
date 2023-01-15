import ClientRoute from '@routes/client.route';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import App from '@/app';

const app = new App([new ClientRoute(), new AuthRoute(), new UsersRoute()]);

app.listen();
