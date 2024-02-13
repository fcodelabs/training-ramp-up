import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("sessions")
export class Session {
  @PrimaryColumn("varchar", { length: 255 })
  id = "";

  @Column("text")
  json = "";

  @Column("bigint")
  expiredAt = Date.now();
}
