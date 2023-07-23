import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signIn(email: string, password: string): Promise<any>{
        //TODO: change user status to online
    }

}
