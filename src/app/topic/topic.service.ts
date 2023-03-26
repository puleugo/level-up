import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Topic } from '@domain/topic/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async getTopics(): Promise<string[]> {
    const topics = await this.topicRepository.find();
    return topics.map((topic) => topic.topic);
  }

  async postTopic(topic: string) {
    await this.topicRepository.save({ topic });
  }
}
