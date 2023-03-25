import { MemoirProfileResponseCommand } from '@app/community/post/commands/memoir.command';

export class MemoirProfileResponse implements MemoirProfileResponseCommand {
  id: number;
  todoTitle: string;
  logging: string | null;
  imagesUri: string[] | null;
  keep: string | null;
  problem: string | null;
  todoId: number;
  try: string | null;
  videosUri: string[] | null;

  constructor(memoir: MemoirProfileResponseCommand) {
    Object.assign(this, memoir);
    this.todoTitle = memoir.toDo.title;
  }
}
