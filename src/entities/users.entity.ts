import { PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BaseEntity, AfterLoad, ManyToOne, Entity, Column } from 'typeorm';
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
    getAllowedBranches() {
        this.allowedBranches = (this.allowedBranches as unknown as string).split(':');
    }

    @BeforeInsert()
    setAllowedBranches() {
        this.allowedBranches = this.allowedBranches.join(':') as unknown as string[];
    }
}
