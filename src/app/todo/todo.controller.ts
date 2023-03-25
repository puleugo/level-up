import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { Request } from '@app/infrastructure/types/request.types';
import { MissionCreateRequest } from '@app/todo/dto/mission/mission-create.request';
import { MissionProfileResponse } from '@app/todo/dto/mission/mission-profile.response';
import { MissionUpdateRequest } from '@app/todo/dto/mission/mission-update.request';
import { TodoCreateRequest } from '@app/todo/dto/todo/todo-create.request';
import { TodoProfileResponse } from '@app/todo/dto/todo/todo-profile.response';
import { TodoUpdateRequest } from '@app/todo/dto/todo/todo-update.request';
import { TodoAlarmService } from '@app/todo/todo-alarm.service';
import { TodoService } from '@app/todo/todo.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[할일] 할일')
@Controller()
export class TodoController {
  constructor(
    private readonly todoService: TodoService, // private readonly todoAlarmService: TodoAlarmService,
  ) {}

  @Get('missions')
  @ApiOperation({ summary: '미션 조회' })
  @ApiQuery({ name: 'startCursor', type: Date, required: false })
  @ApiQuery({ name: 'endCursor', type: Date, required: false })
  async getMissions(
    @Req() { user }: Request,
    @Query('startCursor') startCursor: Date,
    @Query('endCursor') endCursor: Date,
  ): Promise<MissionProfileResponse[]> {
    const missions = await this.todoService.getMissions({
      userId: user.id,
      startCursor,
      endCursor,
    });
    return missions.map((mission) => new MissionProfileResponse(mission));
  }

  @Post('missions')
  async createMission(
    @Req() { user }: Request,
    @Body() missionCreateRequest: MissionCreateRequest,
  ): Promise<MissionProfileResponse> {
    const mission = await this.todoService.createMission({
      userId: user.id,
      ...missionCreateRequest,
    });
    return new MissionProfileResponse(mission);
  }

  @Patch('missions/:missionId')
  async updateMission(
    @Req() { user }: Request,
    @Param('missionId') missionId: number,
    @Body() missionUpdateRequest: MissionUpdateRequest,
  ): Promise<MissionProfileResponse> {
    const mission = await this.todoService.updateMission({
      id: missionId,
      userId: user.id,
      ...missionUpdateRequest,
    });
    return new MissionProfileResponse(mission);
  }

  @Delete('missions/:missionId')
  async deleteMission(
    @Req() { user }: Request,
    @Param('missionId') missionId: number,
  ): Promise<void> {
    await this.todoService.deleteMission({
      id: missionId,
      userId: user.id,
    });
  }

  @Get('missions/:missionId/todos')
  async getTodo(
    @Req() { user }: Request,
    @Param('missionId') missionId: number,
  ): Promise<TodoProfileResponse[]> {
    const todos = await this.todoService.getTodosByMissionId(
      user.id,
      missionId,
    );
    return todos.map((todo) => new TodoProfileResponse(todo));
  }

  @Post('todos')
  async createTodo(
    @Req() { user }: Request,
    @Body() todoCreateRequest: TodoCreateRequest,
  ): Promise<TodoProfileResponse> {
    const todo = await this.todoService.createTodo({
      userId: user.id,
      ...todoCreateRequest,
    });

    return new TodoProfileResponse(todo);
  }

  @Patch('todos/:todoId')
  async updateTodo(
    @Req() { user }: Request,
    @Param('todoId') todoId: number,
    @Body() todoUpdateRequest: TodoUpdateRequest,
  ): Promise<TodoProfileResponse> {
    const todo = await this.todoService.updateTodo({
      id: todoId,
      userId: user.id,
      ...todoUpdateRequest,
    });
    return new TodoProfileResponse(todo);
  }

  @Delete('todos/:todoId')
  async deleteTodo(
    @Req() { user }: Request,
    @Param('todoId') todoId: number,
  ): Promise<void> {
    await this.todoService.deleteTodo({
      id: todoId,
      userId: user.id,
    });
  }

  // @Sse('/sse/:userId')
  // connectSSE(@Param('userId', ParseUUIDPipe) userId: string) {
  //   return this.todoAlarmService.connectSSE(userId);
  // }
}
