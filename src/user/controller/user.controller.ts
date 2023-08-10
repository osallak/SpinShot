import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from  'src/auth/guards'

@Controller('user')
export class UserController {
    constructor() { }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async getMe() {
        ;
    }
}