import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, AfterLoad, LoadEvent,  } from 'typeorm';
import { BranchEntity } from './branches.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    userImg: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'boolean' })
    isAdmin: boolean;

    @Column({ type: 'varchar' })
    allowedBranches: string[];

    @ManyToOne(() => BranchEntity, branch => branch.users)
    branch: BranchEntity;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;

    @AfterLoad()
    getAllowedBranches(event: LoadEvent<any>) {
        this.allowedBranches = event.entity.allowedBranches.split(':');
    }

    @AfterLoad()
    setAllowedBranches(event: LoadEvent<any>) {
        this.allowedBranches = event.entity.allowedBranches.split(':');
    }
}
