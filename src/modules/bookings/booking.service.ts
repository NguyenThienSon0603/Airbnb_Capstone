import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingCreateDto, BookingUpdateDto } from './dto/booking.dto';

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

    // kiểm tra guest_count > 0
    if (Number(guest_count) <= 0)
      throw new BadRequestException('Số lượng khách phải lớn hơn 0.');

    // kiểm tra check_in_date < check_out_date
    if (check_in_date >= check_out_date)
      throw new BadRequestException('Ngày đi phải lớn hơn ngày đến.');

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
        id: true,
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

  async update(
    id: number | string,
    userId: number | string,
    bookingUpdateDto: BookingUpdateDto,
  ) {
    const { guest_count, check_in_date, check_out_date, content } =
      bookingUpdateDto;

    // kiểm tra booking có tồn tại không
    const bookingExist = await this.prisma.bookings.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });
    if (!bookingExist) throw new BadRequestException('Booking not found.');

    // kiểm tra booking có phải của user không
    const isOwner = await this.prisma.bookings.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });
    if (!isOwner)
      throw new UnauthorizedException(
        'Bạn không có quyền chỉnh sửa booking này.',
      );

    // kiểm tra guest_count phải là số nguyên
    if (!Number.isInteger(guest_count))
      throw new BadRequestException('Số lượng khách phải là số nguyên.');

    if (Number(guest_count) <= 0)
      throw new BadRequestException('Số lượng khách phải lớn hơn 0.');

    // kiểm tra check_in_date < check_out_date
    if (check_in_date >= check_out_date)
      throw new BadRequestException('Ngày đi phải lớn hơn ngày đến.');

    const result = await this.prisma.bookings.update({
      where: {
        isDeleted: false,
        id: Number(id),
      },
      data: {
        guest_count: guest_count,
        check_in_date: check_in_date,
        check_out_date: check_out_date,
        content: content,
      },
      select: {
        id: true,
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

  async delete(id: number | string, userId: number | string) {
    // kiểm tra booking có tồn tại không
    const bookingExist = await this.prisma.bookings.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });
    if (!bookingExist) throw new BadRequestException('Booking not found.');

    // kiểm tra booking có phải của user không
    const isOwner = await this.prisma.bookings.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
    });
    if (!isOwner)
      throw new UnauthorizedException('Bạn không có quyền xóa booking này.');

    // xóa mềm dữ liệu
    await this.prisma.bookings.update({
      where: {
        id: Number(id),
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: Number(userId),
      },
    });
    return { message: 'Xóa booking thành công.' };
  }

  async findByUser(userId: number | string) {
    const result = await this.prisma.bookings.findMany({
      where: { isDeleted: false, userId: Number(userId) },
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
}
