import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AccessToken,
  CreateOptions,
  RoomServiceClient,
} from 'livekit-server-sdk';

@Injectable()
export class LivekitService {
  private readonly logger = new Logger('LivekitService');
  private readonly roomService: RoomServiceClient;
  private readonly livekitHost = this.configService.get('LIVEKIT_HOST');
  private readonly livekitApiKey = this.configService.get('LIVEKIT_API_KEY');
  private readonly livekitApiSecret =
    this.configService.get('LIVEKIT_API_SECRET');

  constructor(private configService: ConfigService) {
    if (!this.livekitHost || !this.livekitApiSecret || !this.livekitApiKey) {
      this.logger.error('Livekit config error');
      return;
    }
    this.roomService = new RoomServiceClient(
      this.livekitHost,
      this.livekitApiKey,
      this.livekitApiSecret,
    );
    if (this.roomService) {
      this.roomService
        .listRooms()
        .then(() => {
          this.logger.log('Livekit connected');
        })
        .catch((err) => {
          this.logger.error(`Livekit connection failed, error content: ${err}`);
        });
    }
  }

  async createRoom(opts: CreateOptions): Promise<string> {
    try {
      const room = await this.roomService.createRoom(opts);
      return room.sid;
    } catch (error) {
      this.logger.error(`Failed to create room: ${error}`);
      throw error;
    }
  }

  async getRoom(roomNames: string[] = []) {
    return this.roomService.listRooms(roomNames);
  }

  async deleteRoom(roomName: string) {
    return this.roomService.deleteRoom(roomName);
  }

  async getToken(roomName: string, identity: string) {
    const at = new AccessToken(this.livekitApiKey, this.livekitApiSecret, {
      identity: identity,
      // token to expire after 10 minutes
      ttl: '10m',
    });
    at.addGrant({
      roomJoin: true,
      room: roomName,
    });
    return await at.toJwt();
  }
}
