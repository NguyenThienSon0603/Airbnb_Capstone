import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import BookingService from './booking.service';
import { BookingCreateDto } from './dto/booking.dto';
import { GetUser } from 'src/common/decorator/getUser.decorator';

@ApiTags('Bookings')
@ApiBearerAuth('accessToken')
@Controller('/booking')
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
}
