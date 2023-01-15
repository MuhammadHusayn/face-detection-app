import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    userImg: string;

    @Expose()
    username: string;

    @Expose()
    allowedBranches: string[];

    @Expose()
    branch: string;

    @Expose()
    createdAt: string;
}
