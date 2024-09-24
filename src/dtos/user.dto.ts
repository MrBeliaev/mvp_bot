import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  id: number;

  @IsString()
  telegramId: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  languageCode?: string;

  @IsString()
  @IsOptional()
  referrer: string;

  @IsNumber()
  friendsCount: number;
}
