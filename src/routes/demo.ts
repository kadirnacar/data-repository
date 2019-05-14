import { UserRepo } from './../repositories/UserRepo';
import { NextFunction, Request, Response, Router } from 'express';

export class DemoRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }
    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            let userRepo: UserRepo = new UserRepo();
            var result = await userRepo.find();
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }
    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params["id"];
            let userRepo: UserRepo = new UserRepo();
            var result = await userRepo.findOne(id);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }
    public async post(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            let userRepo: UserRepo = new UserRepo();
            var result = await userRepo.create(data);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }
    public async put(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            let userRepo: UserRepo = new UserRepo();
            var result = await userRepo.update(data.id, data);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            let userRepo: UserRepo = new UserRepo();
            var result = await userRepo.delete(data.id);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    }

    async init() {
        this.router.get('/:id', this.getOne.bind(this));
        this.router.get('/', this.get.bind(this));
        this.router.post('/', this.post.bind(this));
        this.router.put('/', this.put.bind(this));
        this.router.delete('/', this.delete.bind(this));
    }
}