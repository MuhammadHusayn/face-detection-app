import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { BranchEntity } from './branches.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @Column({ type: 'varchar', nullable: false })
    lastName: string;

    @Column({ type: 'varchar', nullable: false })
    userImg: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'boolean', nullable: false })
    isAdmin: boolean;

    @Column({ type: 'varchar', nullable: false })
    allowedBranches: string;

    @ManyToOne(() => BranchEntity, branch => branch.users)
    branch: BranchEntity;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;
}
