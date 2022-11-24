import mongoose, { Types } from 'mongoose';
import { RobotI, ProtoRobotI, Robot } from '../entities/robot.js';
import { Repo, id } from './repo.js';

export class RobotRepository implements Repo<RobotI> {
    static instance: RobotRepository;

    public static getInstance(): RobotRepository {
        if (!RobotRepository.instance) {
            RobotRepository.instance = new RobotRepository();
        }
        return RobotRepository.instance;
    }

    #Model = Robot;

    private constructor() {
        //
    }

    async getAll(): Promise<Array<RobotI>> {
        return this.#Model.find().populate('owner', {
            robots: 0,
        });
    }

    async get(id: id): Promise<RobotI> {
        const result = await this.#Model
            .findById(id)
            .populate<{ _id: Types.ObjectId }>('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result;
    }

    async find(search: Partial<RobotI>): Promise<RobotI> {
        const result = await this.#Model.findOne(search).populate('owner', {
            robots: 0,
        });
        if (!result) throw new Error('Not found id');
        return result;
    }

    async post(data: ProtoRobotI): Promise<RobotI> {
        const result = await (
            await this.#Model.create(data)
        ).populate('owner', {
            robots: 0,
        });
        return result;
    }

    async patch(id: id, data: Partial<RobotI>): Promise<RobotI> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result;
    }

    async delete(id: id): Promise<id> {
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                robots: 0,
            });
        if (result === null) throw new Error('Not found id');
        return id;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
