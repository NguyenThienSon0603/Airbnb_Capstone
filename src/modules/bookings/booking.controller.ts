import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import BookingService from './booking.service';
import { BookingCreateDto, BookingUpdateDto } from './dto/booking.dto';
import { GetUser } from 'src/common/decorator/getUser.decorator';

@ApiTags('Bookings')
@ApiBearerAuth('accessToken')
@Controller('/bookings')
export default class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findAll() {
    return await this.bookingService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.bookingService.findOne(id);
  }

  @Post()
  async create(
    @Body() bookingCreateDto: BookingCreateDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.bookingService.create(bookingCreateDto, userId);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @GetUser('userId') userId: number,
    @Body() bookingUpdateDto: BookingUpdateDto,
  ) {
    return await this.bookingService.update(id, userId, bookingUpdateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @GetUser('userId') userId: number) {
    return await this.bookingService.delete(id, userId);
  }

  @Get('get-by-user/:id')
  async findByUser(@Param('id') userId: number) {
    return await this.bookingService.findByUser(userId);
  }
}
