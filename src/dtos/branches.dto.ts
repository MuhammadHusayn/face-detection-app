import { IsString, MaxLength, NotEquals } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

export class BranchDto {
    @Expose()
    id: number;

    @Expose()
    branchName: string;

    @Expose()
    createdAt: string;
}

export class CreateBranchDto {
    @IsString()
    @MaxLength(64)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    branchName: string;
}

export class UpdateBranchDto {
    @IsString()
    @MaxLength(64)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    branchName: string;
}
