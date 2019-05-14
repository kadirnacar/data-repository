import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';
import { getManager, DeleteResult, UpdateResult, InsertResult } from 'typeorm';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    constructor(entityName: string) {
        this.entityName = entityName;
    }
    private entityName: string;
    async create(item: T): Promise<InsertResult> {
        return await getManager().getRepository<T>(this.entityName).insert(item);
    }
    async update(id: string, item: T): Promise<UpdateResult> {
        return await getManager().getRepository<T>(this.entityName).update(id, item);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await getManager().getRepository<T>(this.entityName).delete(id);
    }
    async find(): Promise<T[]> {
        return await getManager().getRepository<T>(this.entityName).find();
    }
    async findOne(id: string): Promise<T> {
        return await getManager().getRepository<T>(this.entityName).findOne(id);
    }
}