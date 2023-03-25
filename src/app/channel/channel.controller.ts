import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

import { ChannelService } from '@app/channel/channel.service';

@Controller('channel')
@ApiExcludeController()
@ApiTags('[채팅] 채널')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getUnreadMessageNumber() {
    return;
  }

  @Post()
  async uploadImageOnChannel() {
    return;
  }

  @Delete()
  async withdrawChannel() {
    return;
  }
}
