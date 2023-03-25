import { MissionProperties } from '@domain/todo/mission';

type ProgressInfo = {
  completed: number;
  total: number;
};

type UserInfo = {
  userId: string;
};

type MissionInfo = {
  id: number;
};

type IsTeamInfo = {
  isTeamAlarm: boolean;
};

export type MissionResponseCommand = Pick<
  MissionProperties,
  'id' | 'title' | 'teamId' | 'userId' | 'startedAt' | 'endedAt'
>;

export type UserMissionResponseCommand = Pick<
  MissionProperties,
  'id' | 'teamId' | 'userId' | 'startedAt'
> &
  ProgressInfo;

export type MissionCreateRequestCommand = Pick<
  MissionProperties,
  'title' | 'startedAt' | 'endedAt' | 'userId' | 'repeatDay'
> &
  Partial<Pick<MissionProperties, 'description'>> &
  Pick<MissionProperties, 'team'>;

export type MissionUpdateRequestCommand = Partial<MissionCreateRequestCommand> &
  MissionInfo;

export type MissionDeleteRequestCommand = MissionInfo & UserInfo;

export type MissionAlarmResponseCommand = Pick<
  MissionProperties,
  'id' | 'alarmAt' | 'teamId'
>;
