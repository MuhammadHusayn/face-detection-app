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
}
