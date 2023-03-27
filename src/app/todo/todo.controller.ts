import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { MissionCreateRequest } from '@app/todo/dto/mission/mission-create.request';
import { MissionProfileResponse } from '@app/todo/dto/mission/mission-profile.response';
import { MissionUpdateRequest } from '@app/todo/dto/mission/mission-update.request';
import { TodoCreateRequest } from '@app/todo/dto/todo/todo-create.request';
import { TodoProfileResponse } from '@app/todo/dto/todo/todo-profile.response';
import { TodoUpdateRequest } from '@app/todo/dto/todo/todo-update.request';
import { TodoService } from '@app/todo/todo.service';
import { Request } from '@infrastructure/types/request.types';

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
  @ApiOperation({ summary: '미션 생성' })
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

  @Put('missions/:missionId')
  @ApiOperation({ summary: '미션 수정' })
  async updateMission(
    @Req() { user }: Request,
    @Param('missionId', ParseIntPipe) missionId: number,
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
  @ApiOperation({ summary: '미션 삭제' })
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
  @ApiOperation({ summary: '할일 조회' })
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

  @Post('missions/:missionId/todos')
  @ApiOperation({ summary: '할일 생성' })
  async createTodo(
    @Req() { user }: Request,
    @Param('missionId', ParseIntPipe) missionId: number,
    @Body() todoCreateRequest: TodoCreateRequest,
  ): Promise<TodoProfileResponse> {
    const todo = await this.todoService.createTodo({
      userId: user.id,
      missionId,
      ...todoCreateRequest,
    });

    return new TodoProfileResponse(todo);
  }

  @Put('todos/:todoId')
  @ApiOperation({ summary: '할일 수정' })
  async updateTodo(
    @Req() { user }: Request,
    @Param('todoId', ParseIntPipe) todoId: number,
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
  @ApiOperation({ summary: '할일 삭제' })
  async deleteTodo(
    @Req() { user }: Request,
    @Param('todoId', ParseIntPipe) todoId: number,
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
