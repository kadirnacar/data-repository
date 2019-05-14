import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

export interface IWrite<T> {
    create(item: T): Promise<InsertResult>;
    update(id: string, item: T): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
  }