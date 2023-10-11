import { ApiProperty } from "@nestjs/swagger";
import { FriendshipStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/global/dto/pagination-query.dto";

export class FriendsQueryDto extends PaginationQueryDto {

    @ApiProperty({
        enum: FriendshipStatus,
        description: "friendship status"
    })
    @IsOptional()
    @IsEnum(FriendshipStatus)
    status: FriendshipStatus;
}