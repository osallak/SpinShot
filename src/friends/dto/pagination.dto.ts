import { FriendshipStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/global/dto/pagination-query.dto";

export class FriendsQueryDto extends PaginationQueryDto {

    @IsOptional()
    @IsEnum(FriendshipStatus)
    state: FriendshipStatus;
}