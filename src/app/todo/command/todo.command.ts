import { TodoProperties } from '@domain/todo/todo';

export type GetMissionsRequestCommand = {
  userId: string;
  startCursor?: Date;
  endCursor?: Date;
};

export type TodoCreateRequestCommand = Pick<TodoProperties, 'title'> &
  Partial<
    Pick<
      TodoProperties,
      'description' | 'user' | 'userId' | 'mission' | 'missionId' | 'status'
    >
  >;
export type TodoUpdateRequestCommand = Partial<TodoCreateRequestCommand> &
  Partial<Pick<TodoProperties, 'id'>>;

export type TodoProfileResponseCommand = Pick<
  TodoProperties,
  'id' | 'title' | 'description' | 'missionId' | 'missionTitle' | 'status'
>;

export type TodoDeleteRequestCommand = Pick<TodoProperties, 'id' | 'userId'>;
