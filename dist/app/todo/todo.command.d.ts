import { ToDoProperties } from '@domain/user/to-do';
type ProgressInfo = {
    completed: number;
    total: number;
};
type UserInfo = {
    userId: string;
};
type TodoInfo = {
    id: number;
};
export type TodoResponseCommand = Pick<ToDoProperties, 'id' | 'title' | 'teamId' | 'userId' | 'startedAt' | 'endedAt'>;
export type UserTodoResponseCommand = Pick<ToDoProperties, 'id' | 'teamId' | 'userId' | 'startedAt'> & ProgressInfo;
export type TodoCreateRequestCommand = Pick<ToDoProperties, 'title' | 'startedAt' | 'endedAt' | 'userId' | 'repeatDay'> & Partial<Pick<ToDoProperties, 'description'>> & Pick<ToDoProperties, 'team'>;
export type TodoUpdateRequestCommand = Partial<TodoCreateRequestCommand> & TodoInfo;
export type TodoDeleteRequestCommand = TodoInfo & UserInfo;
export {};
