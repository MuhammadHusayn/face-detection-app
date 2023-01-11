import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { BranchEntity } from './branches.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    firstName: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    lastName: string;

    @Column({ type: 'varchar', nullable: false })
    userImg: string;

    @ManyToOne(() => BranchEntity, branch => branch.users)
    branch: BranchEntity;

    @Column({ type: 'varchar', nullable: false })
    allowedBranches: string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
