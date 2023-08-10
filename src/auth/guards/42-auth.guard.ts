import { AuthGuard } from '@nestjs/passport';

export class FortyTwoAuthGuard extends AuthGuard('42') {}
