import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    return request.user;
  },
);
