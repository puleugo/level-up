import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoAlarmService } from '@app/todo/todo-alarm.service';
import { TodoController } from '@app/todo/todo.controller';
import { TodoService } from '@app/todo/todo.service';
import { UserModule } from '@app/user/user.module';
import { Mission } from '@domain/todo/mission.entity';
import { Todo } from '@domain/todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Todo]), UserModule],
  controllers: [TodoController],
  providers: [TodoService, TodoAlarmService],
})
export class TodoModule {}
