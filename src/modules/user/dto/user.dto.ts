import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  numberPhone: string;

  @ApiProperty()
  @IsString()
  birthday: string;

  @ApiProperty()
  @IsString()
  gender: string;
}
export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  numberPhone: string;

  @ApiProperty()
  @IsString()
  birthday: string;
  
  @ApiProperty()
  @IsString()
  gender: string;
}
