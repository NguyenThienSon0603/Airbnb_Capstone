import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookingCreateDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  guest_count: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  check_in_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  check_out_date: Date;

  @ApiProperty()
  @IsString()
  content: string;
}

export class BookingUpdateDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  guest_count: number;

  @ApiProperty()
  check_in_date: string;

  @ApiProperty()
  check_out_date: string;

  @ApiProperty()
  @IsString()
  content: string;
}
