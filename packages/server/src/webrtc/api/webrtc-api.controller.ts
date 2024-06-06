import { Controller } from '@nestjs/common';
import { LivekitService } from '../livekit/livekit.service';
import { ConfigService } from '@nestjs/config';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract as c } from '@/contracts';
import { RedisService } from '@/db/redis/redis.service';
import { remult } from 'remult';
import { Room, User } from '@gonwa/share';
import md5 from 'md5';
import { successRes, errorRes, notFoundRes } from '@/response';

@Controller()
export class WebrtcApiController {
  private readonly webrtcService: LivekitService;
  private readonly webrtcMode: string;

  constructor(
    private readonly livekitService: LivekitService,
    private readonly redisService: RedisService,
    private configService: ConfigService,
  ) {
    this.webrtcService = livekitService;
    this.webrtcMode = this.configService.get('WEBRTC_MODE');
  }

  @TsRestHandler(c.joinRoom)
  async joinRoom() {
    return tsRestHandler(c.joinRoom, async ({ body }) => {
      const { roomId, identity } = body;

      const roomIdDecrypted = await this.redisService.get(roomId);
      if (!roomIdDecrypted) {
        return notFoundRes({
          status: 404,
          message: 'not found',
          data: null,
        });
      }

      // 加入房间，redis存储房间内的用户id
      this.redisService.sadd(roomIdDecrypted, [identity]);

      const at = await this.webrtcService.getToken(roomId, identity);

      if (!at) {
        return { status: 404, body: null };
      }

      const userRepo = remult.repo(User);
      const userIdsInRoom = await this.redisService.smembers(roomIdDecrypted);
      const usersInRoom = userIdsInRoom.map(async (userId) => {
        const user = await userRepo.findFirst({ id: userId });
        return {
          name: user.name,
        };
      });

      const resData = {
        status: 200,
        message: 'success',
        data: {
          token: at,
          usersInRoom,
          livekitUrl:
            this.webrtcMode === 'sfu'
              ? this.configService.get('LIVEKIT_HOST')
              : undefined,
        },
      };

      return successRes(resData);
    });
  }

  @TsRestHandler(c.createRoom)
  async createRoom() {
    return tsRestHandler(c.createRoom, async ({ body }) => {
      const { roomName, roomDescription } = body;
      const roomRepo = remult.repo(Room);

      try {
        const room = await roomRepo.insert({
          name: roomName,
          description: roomDescription,
        });
        const roomId = await this.webrtcService.createRoom({ name: room.id });

        const roomIdHashed = md5(roomId);

        // 在redis缓存一些跟房间有关的数据
        this.redisService.set(roomIdHashed, room.id);
        this.redisService.sadd(room.id, []);

        const resBody = {
          status: 200,
          message: 'success',
          data: {
            roomId: roomIdHashed,
          },
        };

        return successRes(resBody);
      } catch (error) {
        return errorRes({
          status: 500,
          message: 'something get wrong',
          data: error,
        });
      }
    });
  }

  @TsRestHandler(c.findRoom)
  async findRoom() {
    return tsRestHandler(c.findRoom, async ({ query }) => {
      const { roomId } = query;
      const roomIdHashed = roomId;
      const roomIdDecrypted = await this.redisService.get(roomIdHashed);

      if (!roomIdDecrypted) {
        return notFoundRes({
          status: 404,
          message: 'not found',
          data: null,
        });
      }

      const roomRepo = remult.repo(Room);
      const room = await roomRepo.findFirst({ id: roomIdDecrypted });

      if (!room) {
        return errorRes({
          status: 500,
          message: 'something get wrong',
          data: null,
        });
      }

      return successRes({
        status: 200,
        message: 'success',
        data: {
          name: room.name,
          description: room.description,
        },
      });
    });
  }
}
