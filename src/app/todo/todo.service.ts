import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

import {
  MissionCreateRequestCommand,
  MissionDeleteRequestCommand,
  MissionResponseCommand,
  MissionUpdateRequestCommand,
} from '@app/todo/command/mission.command';
import {
  GetMissionsRequestCommand,
  TodoCreateRequestCommand,
  TodoDeleteRequestCommand,
  TodoProfileResponseCommand,
  TodoUpdateRequestCommand,
} from '@app/todo/command/todo.command';
import { UserService } from '@app/user/user.service';
import { Mission } from '@domain/todo/mission.entity';
import { Todo } from '@domain/todo/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async getMissions(
    getMissionsRequestCommand: GetMissionsRequestCommand,
  ): Promise<MissionResponseCommand[]> {
    const { userId, startCursor, endCursor } = getMissionsRequestCommand;
    if (startCursor && endCursor) {
      console.log(startCursor, endCursor);
      const query = this.missionRepository.createQueryBuilder('mission');

      const missions = await query
        .where('mission.userId = :userId', { userId })
        .andWhere('mission.startedAt >= :startCursor', { startCursor })
        .andWhere('mission.endedAt < :endCursor', { endCursor })
        .orderBy('mission.startedAt', 'ASC')
        .getMany();

      console.log(missions, missions.length);
      return missions;
    }
    return await this.missionRepository.find({
      where: {
        userId,
      },
    });
  }

  async createMission(
    todoCreateRequest: MissionCreateRequestCommand,
  ): Promise<MissionResponseCommand> {
    const user = await this.userService.findById(todoCreateRequest.userId);
    return await this.missionRepository.save({
      ...todoCreateRequest,
      user,
    });
  }

  async updateMission(
    todoUpdateRequest: MissionUpdateRequestCommand,
  ): Promise<Mission> {
    const user = await this.userService.findById(todoUpdateRequest.userId);
    const todo = await this.findById(todoUpdateRequest.id, undefined, {
      userId: user.id,
    });
    return await this.missionRepository.save({
      ...todo,
      ...todoUpdateRequest,
    });
  }

  async deleteMission(data: MissionDeleteRequestCommand) {
    return await this.missionRepository.softDelete({
      ...data,
    });
  }

  async getTodosByMissionId(
    userId: string,
    missionId: number,
  ): Promise<TodoProfileResponseCommand[]> {
    return await this.todoRepository.find({
      where: { missionId, userId },
    });
  }

  async createTodo(
    todoTaskCreateRequest: TodoCreateRequestCommand,
  ): Promise<TodoProfileResponseCommand> {
    return await this.todoRepository.save({ ...todoTaskCreateRequest });
  }

  async updateTodo(
    todoTaskUpdateRequest: TodoUpdateRequestCommand,
  ): Promise<TodoProfileResponseCommand> {
    const task = await this.findTodoByMissionId(todoTaskUpdateRequest.id);
    return await this.todoRepository.save({
      ...task,
      ...todoTaskUpdateRequest,
    });
  }

  async deleteTodo(
    todoTaskDeleteRequest: TodoDeleteRequestCommand,
  ): Promise<void> {
    await this.todoRepository.softDelete({
      ...todoTaskDeleteRequest,
    });
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<Mission>,
    where?: FindOptionsWhere<Mission>,
  ) {
    return await this.missionRepository.findOne({
      where: { id, ...where },
      relations,
    });
  }

  async findTodoByMissionId(
    id: number,
    relations?: FindOptionsRelations<Todo>,
    where?: FindOptionsWhere<Todo>,
  ) {
    return await this.todoRepository.findOne({
      where: { missionId: id, ...where },
      relations,
    });
  }
}
