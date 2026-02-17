import { BaseEntity } from 'src/lib/base.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 128 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'time with time zone' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;
}
