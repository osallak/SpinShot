import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AddFriendDto {
    @ApiProperty({
        description: 'The id of the user to add as a friend',
        example: '1',
    })
    @IsUUID()
    id: string;
}