import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { MissionCreateRequestCommand, MissionDeleteRequestCommand, MissionResponseCommand, MissionUpdateRequestCommand } from '@app/todo/command/mission.command';
import { GetTodosByDateRequestQuery, TodoCreateRequestCommand, TodoDeleteRequestCommand, TodoProfileResponseCommand, TodoUpdateRequestCommand } from '@app/todo/command/todo.command';
import { UserService } from '@app/user/user.service';
import { Mission } from '@domain/todo/mission.entity';
import { Todo } from '@domain/todo/todo.entity';
export declare class TodoService {
    private readonly missionRepository;
    private readonly todoRepository;
    private readonly userService;
    constructor(missionRepository: Repository<Mission>, todoRepository: Repository<Todo>, userService: UserService);
    getTodosByDate(getTasksByDateRequestQuery: GetTodosByDateRequestQuery): Promise<TodoProfileResponseCommand[]>;
    getMission(userId: string): Promise<Mission[]>;
    createMission(todoCreateRequest: MissionCreateRequestCommand): Promise<MissionResponseCommand>;
    updateMission(todoUpdateRequest: MissionUpdateRequestCommand): Promise<Mission>;
    deleteMission(data: MissionDeleteRequestCommand): Promise<import("typeorm").UpdateResult>;
    getTodosByMissionId(userId: string, missionId: number): Promise<TodoProfileResponseCommand[]>;
    createTodo(todoTaskCreateRequest: TodoCreateRequestCommand): Promise<TodoProfileResponseCommand>;
    updateTodo(todoTaskUpdateRequest: TodoUpdateRequestCommand): Promise<TodoProfileResponseCommand>;
    deleteTodo(todoTaskDeleteRequest: TodoDeleteRequestCommand): Promise<void>;
    findById(id: number, relations?: FindOptionsRelations<Mission>, where?: FindOptionsWhere<Mission>): Promise<Mission>;
    findTodoByMissionId(id: number, relations?: FindOptionsRelations<Todo>, where?: FindOptionsWhere<Todo>): Promise<Todo>;
}
