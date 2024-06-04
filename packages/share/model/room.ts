import { Entity, Fields } from "remult";

@Entity("rooms", {
  allowApiCrud: true,
  allowApiDelete: "admin",
})
export class Room {
  @Fields.uuid()
  id!: string;

  @Fields.string()
  name = "";

  @Fields.string()
  description = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();
}
