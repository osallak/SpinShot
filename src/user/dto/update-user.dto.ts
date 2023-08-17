import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Allow, IsEmail, Matches, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Allow()
  firstName: string;

  @Allow()
  lastName: string;

  @Allow()
  country: string;

  @Exclude()
  email: string;
}
