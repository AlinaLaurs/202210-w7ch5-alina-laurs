import mongoose, { model, Types } from 'mongoose';
import { Robot, ProtoRobot, robotSchema } from '../entities/robot.js';
import { Data, id } from './data.js';
export class RobotsRepository implements Data<Robot> {
    #Model = model('Robot', robotSchema, 'robots');

    async getAll(): Promise<Array<Robot>> {
        return this.#Model.find();
        //.populate('owner', {
        //robots: 0,
        //});
    }

    async get(id: id): Promise<Robot> {
        const result = await this.#Model
            .findById(id)
            .populate<{ _id: Types.ObjectId }>('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as Robot;
    }

    async find(search: {
        [key: string]: string | number | Date;
    }): Promise<Robot> {
        const result = await this.#Model.findOne(search).populate('owner', {
            robots: 0,
        });
        if (!result) throw new Error('Not found id');
        return result as unknown as Robot;
    }

    async post(data: ProtoRobot): Promise<Robot> {
        const result = await (
            await this.#Model.create(data)
        ).populate('owner', {
            robots: 0,
        });
        return result as Robot;
    }

    async patch(id: id, data: Partial<Robot>): Promise<Robot> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as Robot;
    }

    async delete(id: id): Promise<{ id: id }> {
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                robots: 0,
            });
        if (result === null) throw new Error('Not found id');
        return { id: id };
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
