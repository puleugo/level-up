import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

type EntityExistRequiredValue<Entity> = Entity & {
  id: string;
  deletedAt?: Date | null;
};
export class MockRepository<Entity> {
  constructor(private readonly data: EntityExistRequiredValue<Entity>[] = []) {}
  findOne(
    options: FindOneOptions<EntityExistRequiredValue<Entity>>,
  ): Promise<Entity | null> {
    const { where } = options;
    const result = this.data.find((board) => {
      return Object.entries(where).every(
        ([key, value]) => board[key] === value && board.deletedAt === null,
      );
    });
    return Promise.resolve(result || null);
  }

  find() {
    return this.data;
  }

  softDelete(id: string) {
    const index = this.data.findIndex((board) => board.id === id);
    this.data[index].deletedAt = new Date();
  }

  save(data: EntityExistRequiredValue<Entity>) {
    const index = this.data.findIndex((board) => board.id === data.id);
    if (index === -1) {
      this.data.push(data);
    } else {
      this.data[index] = data;
    }
    return data;
  }
}
