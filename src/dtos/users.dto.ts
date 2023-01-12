import { IsEmail, IsString, MaxLength, NotEquals } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

export class UserSingIn {
    @IsString()
    @MaxLength(32)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    username: string;

    @IsString()
    @MaxLength(16)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    password: string;
}

export class UserDto {
    @Expose()
    userId: number;

    @Expose()
    email: string;

    @Expose()
    fullName: string;

    @Expose()
    createdAt: Date;
}
