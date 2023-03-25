import { Request } from '@app/infrastructure/types/request.types';
import { MissionCreateRequest } from '@app/todo/dto/mission/mission-create.request';
import { MissionProfileResponse } from '@app/todo/dto/mission/mission-profile.response';
import { MissionUpdateRequest } from '@app/todo/dto/mission/mission-update.request';
import { TodoCreateRequest } from '@app/todo/dto/todo/todo-create.request';
import { TodoProfileResponse } from '@app/todo/dto/todo/todo-profile.response';
import { TodoUpdateRequest } from '@app/todo/dto/todo/todo-update.request';
import { TodoService } from '@app/todo/todo.service';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTodosByDate({ user }: Request, startCursor: Date, endCursor: Date): Promise<TodoProfileResponse[]>;
    getMissions({ user }: Request): Promise<MissionProfileResponse[]>;
    createMission({ user }: Request, missionCreateRequest: MissionCreateRequest): Promise<MissionProfileResponse>;
    updateMission({ user }: Request, missionId: number, missionUpdateRequest: MissionUpdateRequest): Promise<MissionProfileResponse>;
    deleteMission({ user }: Request, missionId: number): Promise<void>;
    getTodo({ user }: Request, missionId: number): Promise<TodoProfileResponse[]>;
    createTodo({ user }: Request, todoCreateRequest: TodoCreateRequest): Promise<TodoProfileResponse>;
    updateTodo({ user }: Request, todoId: number, todoUpdateRequest: TodoUpdateRequest): Promise<TodoProfileResponse>;
    deleteTodo({ user }: Request, todoId: number): Promise<void>;
}
