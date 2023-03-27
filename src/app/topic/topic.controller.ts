import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { TopicService } from '@app/topic/topic.service';

class TopicCreateDto {
  @ApiProperty({ example: '토픽1', description: '주제' })
  topic: string;
}

@Controller()
@ApiTags('[토픽] 주제')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('topics')
  async getTopics(): Promise<string[]> {
    return await this.topicService.getTopics();
  }

  @Post('topics')
  async postTopic(@Body() data: TopicCreateDto) {
    await this.topicService.postTopic(data.topic);
  }
}
