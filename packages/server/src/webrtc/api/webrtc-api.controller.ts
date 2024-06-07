import { Controller, Logger } from '@nestjs/common';
import { LivekitService } from '../livekit/livekit.service';
import { ConfigService } from '@nestjs/config';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract as c } from '@gonwa/share';
import { RedisService } from '@/db/redis/redis.service';
import { Room, User } from '@/db/entity';
import md5 from 'md5';
import { successRes, errorRes, notFoundRes } from '@/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class WebrtcApiController {
  private readonly webrtcService: LivekitService;
  private readonly webrtcMode: string;
  private readonly logger = new Logger('WebrtcApi');

  constructor(
    private readonly livekitService: LivekitService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
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

      const userIdsInRoom = await this.redisService.smembers(roomIdDecrypted);
      const usersInRoom = userIdsInRoom.map(async (userId) => {
        const user = await this.usersRepository.findOneBy({ uuid: userId });
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

      try {
        const room = new Room();
        room.name = roomName;
        room.description = roomDescription;
        await this.roomsRepository.save(room);
        const roomId = await this.webrtcService.createRoom({ name: room.uuid });

        const roomIdHashed = md5(roomId);

        // 在redis缓存一些跟房间有关的数据
        this.redisService.set(roomIdHashed, room.uuid);
        this.redisService.sadd(room.uuid, []);

        const resBody = {
          status: 200,
          message: 'success',
          data: {
            roomId: roomIdHashed,
          },
        };

        return successRes(resBody);
      } catch (error) {
        this.logger.error(error);
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

      const room = await this.roomsRepository.findOneBy({
        uuid: roomIdDecrypted,
      });

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
