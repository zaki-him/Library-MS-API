import { createId } from "@paralleldrive/cuid2";
import { BeforeInsert, PrimaryColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryColumn('varchar', { length: 30 })
  id: string

  @BeforeInsert()
  generateId() {
    this.id = createId()
  }
}