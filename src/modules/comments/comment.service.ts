import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentCreateDto, CommentUpdateDto } from './dto/comment.dto';

@Injectable()
export default class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.comments.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        roomId: true,
        userId: true,
        content: true,
        rating: true,
        updatedAt: true,
      },
    });
    return result;
  }
  async findOne(roomId: number | string) {
    // kiểm tra room có tồn tại không
    const roomExist = await this.prisma.rooms.findFirst({
      where: { roomId: Number(roomId) },
    });

    if (!roomExist) throw new BadRequestException('Room not found.');

    const result = await this.prisma.comments.findMany({
      where: {
        roomId: Number(roomId),
        isDeleted: false,
      },
      select: {
        id: true,
        roomId: true,
        userId: true,
        content: true,
        rating: true,
        date: true,
      },
    });
    return result;
  }

  async create(commentCreateDto: CommentCreateDto, userId: number) {
    const { roomId, content, rating } = commentCreateDto;

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

    const result = await this.prisma.comments.create({
      data: {
        userId: userId,
        roomId: roomId,
        content: content,
        rating: rating,
      },
      select: {
        userId: true,
        roomId: true,
        content: true,
        rating: true,
      },
    });

    return result;
  }

  async update(id: number | string, commentUpdateDto: CommentUpdateDto) {
    const { content, rating, roomId, userId } = commentUpdateDto;

    // kiểm tra comment có tồn tại không
    const commentExist = await this.prisma.comments.findFirst({
      where: { id: Number(id) },
    });
    if (!commentExist) throw new BadRequestException('Comment not found.');

    // kiểm tra comment có phải của user và room hay không
    const isOwner = await this.prisma.comments.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId),
        roomId: Number(roomId),
      },
    });
    if (!isOwner)
      throw new UnauthorizedException(
        'Bạn không có quyền chỉnh sửa comment này.',
      );

    const result = await this.prisma.comments.update({
      where: {
        id: Number(id),
        isDeleted: false,
      },
      data: {
        content: content,
        rating: Number(rating),
      },
      select: {
        id: true,
        roomId: true,
        userId: true,
        content: true,
        rating: true,
        updatedAt: true,
      },
    });

    return result;
  }

  async delete(id: number | string, userId: number | string) {
    // kiểm tra comment có tồn tại không
    const commentExist = await this.prisma.comments.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });
    if (!commentExist) throw new BadRequestException('Comment not found.');

    // xóa mềm dữ liệu
    await this.prisma.comments.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: Number(userId),
      },
    });

    return { message: 'Xóa comment thành công.' };
  }
}
