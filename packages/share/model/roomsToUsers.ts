import { Entity, Fields, Relations } from "remult";
import { Room } from "./room";

@Entity<RoomsToUsers>("roomsToUsers", {
  id: {
    userId: true,
    roomId: true,
  },
})
export class RoomsToUsers {
  @Fields.string()
  userId = "";
  @Fields.string()
  roomId = "";
  @Relations.toOne<RoomsToUsers, Room>(() => Room, "roomId")
  room?: Room;
}
