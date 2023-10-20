import * as uuid from 'uuid';
import { MapEnum } from '../types/map-enum.type';

export  const generateGameId = () =>  {
    return uuid.v4();
}


export const randomizeMap = (): MapEnum => {
    const index = Math.floor(Math.random() * 3);
    const maps: (MapEnum)[] = ['normal', 'hard', 'expert'];

    return maps[index];
}