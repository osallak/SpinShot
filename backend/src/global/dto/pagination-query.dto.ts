import { IsOptional, IsPositive, Max, Min, MinLength } from 'class-validator';

export class PaginationQueryDto {
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Min(1)
  @IsOptional()
  @Max(50)
  readonly limit: number = 5;

  getSkip(): number {
    return (this.page - 1) * this.limit;
  }
}
