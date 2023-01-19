import { PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BaseEntity, AfterLoad, ManyToOne, Entity, Column, BeforeUpdate } from 'typeorm';
import { BranchEntity } from './branches.entity';
import bcrypt from 'bcrypt';

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
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'boolean' })
    isAdmin: boolean;

    @Column({ type: 'varchar' })
    allowedBranches: string[];

    @ManyToOne(() => BranchEntity, branch => branch.users, { nullable: false })
    branch: BranchEntity | string;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdAt: Date;

    private saltRounds = 15;

    @AfterLoad()
    afterLoad() {
        // parse allowed branches before returning result
        this.allowedBranches = (this.allowedBranches as unknown as string).split(':');
    }

    @BeforeInsert()
    async beforeInsert() {
        // parse allowed branches before inserting
        this.allowedBranches = this.allowedBranches.join(':') as unknown as string[];

        // hash password
        if (this.password) {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;
        }
    }

    @BeforeUpdate()
    async beforeUpdate() {
        // parse allowed branches before updating
        if (this.allowedBranches) {
            this.allowedBranches = this.allowedBranches.join(':') as unknown as string[];
        }

        // hash password
        if (this.password) {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;
        }
    }

    static async checkPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}
