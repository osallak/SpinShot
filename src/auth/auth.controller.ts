import { Controller, Post, Get, Put, Delete, Req, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UserStatus } from '@prisma/client';


export type User = {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    uesrname: string;
    password: string;
    avatar?: string;
    country?: string;
    twoFactorAuth: boolean;
    status: UserStatus;
};

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {}

    @Post('/signup/local')
    async signupLocal(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

}
