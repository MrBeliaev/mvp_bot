import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  referrer: string;

  @IsNumber()
  friendsCount: number;
}
