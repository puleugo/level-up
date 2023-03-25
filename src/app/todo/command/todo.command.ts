import { MissionProperties } from '@domain/todo/todo';

export type GetTodosByDateRequestQuery = {
  userId: string;
  startCursor: Date;
  endCursor: Date;
};

export type TodoCreateRequestCommand = Pick<MissionProperties, 'title'> &
  Partial<
    Pick<
      MissionProperties,
      'description' | 'user' | 'userId' | 'mission' | 'missionId' | 'status'
    >
  >;
export type TodoUpdateRequestCommand = Partial<TodoCreateRequestCommand> &
  Partial<Pick<MissionProperties, 'id'>>;

export type TodoProfileResponseCommand = Pick<
  MissionProperties,
  'id' | 'title' | 'description' | 'missionId' | 'missionTitle' | 'status'
>;

export type TodoDeleteRequestCommand = Pick<MissionProperties, 'id' | 'userId'>;
