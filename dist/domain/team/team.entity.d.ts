import { Mission } from '@domain/todo/mission.entity';
export declare class Team {
    id: number;
    title: string;
    description: string | null;
    todos: Mission[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
