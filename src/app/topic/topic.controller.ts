import { Body, Controller, Get, Post } from '@nestjs/common';

import { TopicService } from '@app/topic/topic.service';

@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getTopics(): Promise<string[]> {
    return await this.topicService.getTopics();
  }

  @Post()
  async postTopic(@Body() data: { topic: string }) {
    await this.topicService.postTopic(data.topic);
  }
}
