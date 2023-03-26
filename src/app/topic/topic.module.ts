import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

import { Topic } from '@domain/topic/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
