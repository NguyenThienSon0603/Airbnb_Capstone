import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentCreateDto {
  @ApiProperty()
  @Type(() => Number) // ép kiểu string -> number vì dữ liệu body là kiểu string
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

export class CommentUpdateDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  rating: number;
}
