import { Schema, Types, model } from 'mongoose';

export type RobotI = {
    id: Types.ObjectId;
    name: string;
    image: string;
    speed: number;
    strength: number;
    creationDate: string;
    owner: Types.ObjectId;
};

export type ProtoRobotI = {
    name?: string;
    image?: string;
    speed?: number;
    strength?: number;
    creationDate?: string;
    owner?: Types.ObjectId;
};

export const robotSchema = new Schema<RobotI>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    speed: { type: Number, min: 0, max: 10 },
    strength: { type: Number, min: 0, max: 10 },
    creationDate: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

robotSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});

export const Robot = model<RobotI>('Robot', robotSchema, 'robots');
