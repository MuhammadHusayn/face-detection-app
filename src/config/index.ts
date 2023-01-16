import validateEnv from '@utils/validateEnv';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import 'reflect-metadata';
import path from 'path';
import fs from 'fs';

// load env variables
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
validateEnv();

export const PROFILE_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
export const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

// cors config options
export const CORS_OPTIONS = {
    origin: function (origin: any, callback: (err: Error | null, origin?: any) => void) {
        console.info('CORS origin:', origin);
        if (callback) {
            console.info(`CORS origin: ${origin} -> ${process.env.ORIGIN}`);
            callback(null, process.env.ORIGIN);
        } else {
            console.info('CORS callback: undefined');
        }
    },
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: process.env.CREDENTIALS === 'true',
    preflightContinue: true,
    optionsSuccessStatus: 200,
};

// database config options
export const DB_CONFIG: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
};
