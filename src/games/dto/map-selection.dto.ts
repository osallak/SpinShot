import { IsEnum, IsString } from "class-validator";
import { MapEnum } from 'src/games/types/map-enum.type';

export class MapSelectionDto {

    @IsEnum(['normal', 'hard', 'expert'])
    @IsString()
    map: MapEnum; 
}