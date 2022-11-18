export type Robot = {
    id: string;
    name: string;
    image: string;
    speed: number;
    strength: number;
    creationDate: string;
};

export type ProtoRobot = {
    name?: string;
    image?: string;
    speed?: number;
    strength?: number;
    creationDate?: string;
};
