import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingCreateDto } from './dto/booking.dto';

@Injectable()
export default class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.bookings.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        roomId: true,
        userId: true,
        guest_count: true,
        check_in_date: true,
        check_out_date: true,
        content: true,
      },
    });
    return result;
  }

  async findOne(id: number | string) {
    // kiểm tra booking có tồn tại không
    const bookingExist = await this.prisma.bookings.findFirst({
      where: { id: Number(id) },
    });
    if (!bookingExist) throw new BadRequestException('Booking not found.');

    const result = await this.prisma.bookings.findMany({
      where: { id: Number(id), isDeleted: false },
      select: {
        id: true,
        roomId: true,
        userId: true,
        guest_count: true,
        check_in_date: true,
        check_out_date: true,
        content: true,
      },
    });

    return result;
  }

  async create(bookingCreateDto: BookingCreateDto, userId: number) {
    const { roomId, guest_count, check_in_date, check_out_date, content } =
      bookingCreateDto;

    // kiểm tra user có tồn tại không
    const userExist = await this.prisma.users.findFirst({
      where: { userId: userId },
    });
    if (!userExist) throw new NotFoundException('User not found.');

    // kiểm trả room có tồn tại không
    const roomExist = await this.prisma.rooms.findFirst({
      where: { roomId: roomId },
    });
    if (!roomExist) throw new NotFoundException('Room not found.');

    const result = await this.prisma.bookings.create({
      data: {
        userId: userId,
        roomId: roomId,
        guest_count: guest_count,
        check_in_date: check_in_date,
        check_out_date: check_out_date,
        content: content,
      },
      select: {
        userId: true,
        roomId: true,
        guest_count: true,
        check_in_date: true,
        check_out_date: true,
        content: true,
      },
    });

    return result;
  }
}
