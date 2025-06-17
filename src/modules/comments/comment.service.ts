import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export default class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.comments.findMany({
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

  async create(commentDTO: CommentDto, userId: number) {
    const { roomId, content, rating } = commentDTO;

    // kiểm tra user có tồn tại không
    const userExist = this.prisma.users.findFirst({
      where: { userId: userId },
    });
    if (!userExist) throw new NotFoundException('User not found.');

    // kiểm trả room có tồn tại không
    const roomExist = this.prisma.rooms.findFirst({
      where: { roomId: roomId },
    });
    if (!roomExist) throw new NotFoundException('Room not found.');

    const result = this.prisma.comments.create({
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
}
