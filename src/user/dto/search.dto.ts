import { All } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';

export enum SortOrder {
  'asc',
  'desc',
}

export class SearchDto extends PaginationQueryDto {
  @MaxLength(50) //? check this
  @Allow()
  @ApiProperty()
  readonly keyword: string = '';

  @ApiProperty({
    type: String,
    description: "SortOrder accept two values: asc or desc"
  })
  @IsOptional()
  @IsEnum(SortOrder)
  readonly orderBy: 'asc' | 'desc' = 'asc';
}
