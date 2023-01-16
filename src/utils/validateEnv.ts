import { cleanEnv, port, str, bool, num } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        JWT_ACCESS_EXPIRATION: num(),
        JWT_ACCESS_SECRET: str(),
        CREDENTIALS: bool(),
        LOG_FORMAT: str(),
        LOG_DIR: str(),
        DB_NAME: str(),
        ORIGIN: str(),
        PORT: port(),
    });
};

export default validateEnv;
