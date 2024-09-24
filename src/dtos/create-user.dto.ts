import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  telegramId: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  languageCode?: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}
