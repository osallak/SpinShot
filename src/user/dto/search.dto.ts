import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, MaxLength } from 'class-validator';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';

export enum SortOrder {
  'asc',
  'desc',
}

export class SearchDto extends PaginationQueryDto {
  @MaxLength(50) //? check this
  @ApiProperty({
    description: 'filter users by username & firstName & lastName',
    example:
      "keyword=sa, this will return all users with 'sa' in their name and/or username, default value '': this will return all users",
  })
  @IsOptional()
  readonly keyword: string = '';

  @ApiProperty({
    type: String,
    description: 'SortOrder accept two values: asc or desc',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  readonly orderBy: 'asc' | 'desc' = 'asc';
}
