import { Mission } from '@domain/todo/mission.entity';
export type MemoirCreateRequestCommand = {
    todoId: number;
    userId?: string;
    logging: string | null;
    keep: string | null;
    problem: string | null;
    try: string | null;
    imagesUri: string[] | null;
    videosUri: string[] | null;
};
export type MemoirProfileResponseCommand = {
    todoId: number;
    userId?: string;
    logging: string | null;
    keep: string | null;
    problem: string | null;
    try: string | null;
    imagesUri: string[] | null;
    videosUri: string[] | null;
    toDo?: Mission;
};
