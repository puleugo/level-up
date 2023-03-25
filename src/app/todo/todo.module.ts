import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

import { TodoAlarmService } from '@app/todo/todo-alarm.service';
import { UserModule } from '@app/user/user.module';
import { Mission } from '@domain/todo/mission.entity';
import { Todo } from '@domain/todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Todo]), UserModule],
  controllers: [TodoController],
  providers: [TodoService, TodoAlarmService],
})
export class TodoModule {}
