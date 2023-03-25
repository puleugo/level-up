import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialGroupBoardController } from '@app/social/social-board/social-group-board.controller';
import { SocialGroupBoardService } from '@app/social/social-board/social-group-board.service';
import { SocialGroupBoard } from '@domain/social/social-group-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialGroupBoard])],
  controllers: [SocialGroupBoardController],
  providers: [SocialGroupBoardService],
  exports: [SocialGroupBoardService],
})
export class SocialGroupBoardModule {}
