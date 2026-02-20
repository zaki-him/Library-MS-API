import { createId } from '@paralleldrive/cuid2';
import { BeforeInsert, CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryColumn('varchar', { length: 30 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = createId();
  }

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
  
  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
