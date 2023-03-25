import { Controller, Delete, Get, Post } from '@nestjs/common';

import { ChannelService } from '@app/channel/channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getUnreadMessageNumber() {}

  @Post()
  async uploadImageOnChannel() {}

  @Delete()
  async withdrawChannel() {}
}
