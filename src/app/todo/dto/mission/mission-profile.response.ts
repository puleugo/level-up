import { ApiProperty } from '@nestjs/swagger';

import { MissionResponseCommand } from '@app/todo/command/mission.command';

export class MissionProfileResponse implements MissionResponseCommand {
  @ApiProperty({ example: 1, description: '미션 아이디' })
  id: number;

  @ApiProperty({ example: '미션 제목', description: '미션 제목' })
  title: string;

  @ApiProperty({ example: 1, description: '팀 아이디', nullable: true })
  teamId: number | null;

  @ApiProperty({ example: '유저 아이디', description: '유저 아이디' })
  userId: string;

  @ApiProperty({ example: '2021-01-01', description: '시작 날짜' })
  startedAt: Date;

  @ApiProperty({ example: '2021-01-01', description: '종료 날짜' })
  endedAt: Date;

  constructor({
    id,
    title,
    teamId,
    userId,
    startedAt,
    endedAt,
  }: MissionResponseCommand) {
    this.id = id;
    this.title = title;
    this.teamId = teamId;
    this.userId = userId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }
}
