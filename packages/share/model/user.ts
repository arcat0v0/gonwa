import { Entity, Fields, Relations } from "remult";
import { RoomsToUsers } from "./roomsToUsers";

@Entity("users", {
  allowApiCrud: true,
  allowApiDelete: "admin",
})
export class User {
  @Fields.uuid()
  id!: string;

  @Fields.string()
  name = "";

  @Fields.createdAt()
  createdAt = new Date();

  @Fields.updatedAt()
  updatedAt = new Date();

  @Relations.toMany(() => RoomsToUsers, "userId")
  rooms?: RoomsToUsers[];
}
