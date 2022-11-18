import mongoose, { Schema, model } from 'mongoose';
import { Tapa, ProtoTapa } from '../entities/robot.js';
import { Data, id } from './repository.js';

export class TapaRepository implements Data<Tapa> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        color: String,
        ingredient: String,
        alcohol: Boolean,
    });
    #Model = model('Tapa', this.#schema, 'tapas');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<Tapa>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Tapa> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as unknown as Tapa;
    }

    async post(data: ProtoTapa): Promise<Tapa> {
        const result = await this.#Model.create(data);
        return result as unknown as Tapa;
    }
    async patch(id: id, data: Partial<Tapa>): Promise<Tapa> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as unknown as Tapa;
    }

    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
