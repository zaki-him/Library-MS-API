import { BaseEntity } from 'src/lib/base.entity';
import { MemberStatus } from 'src/lib/enums/member.enum';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 128 })
  password: string;

  @Column('enum', { enum: MemberStatus, default: MemberStatus.ACTIVE })
  status: MemberStatus

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
