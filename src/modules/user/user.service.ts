import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import { IsEmail, isPhoneNumber } from 'class-validator';

@Injectable()
export default class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.users.findMany({
      where: { isDeleted: false },
      select: {
        userId: true,
        fullName: true,
        email: true,
        birthday: true,
        numberPhone: true,
        gender: true,
        Roles: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    return result;
  }

  async findOne(id: number | string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException('UserId không hợp lệ');
    }

    // kiểm tra user có tồn tại không
    const userExist = await this.prisma.users.findUnique({
      where: { userId: parsedId },
    });
    if (!userExist) throw new BadRequestException('User not found.');

    const result = await this.prisma.users.findUnique({
      where: {
        userId: parsedId,
        isDeleted: false,
      },
      select: {
        userId: true,
        fullName: true,
        email: true,
        birthday: true,
        numberPhone: true,
        gender: true,
        avatar: true,
      },
    });

    return result;
  }

  async create(userDto: UserCreateDto) {
    const { fullName, email, password, numberPhone, birthday, gender } =
      userDto;

    // kiểm tra email có tồn tại không
    const userExist = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (userExist)
      throw new ConflictException(
        'Email đã được sử dụng. Vui lòng nhập email khác.',
      );

    // Nếu chưa tồn tại thì thêm mới tài khoản
    // Mã hóa password
    const salt = bcrypt.genSaltSync(10); //tạo ra 1 chuỗi ngẫu nhiên để làm tăng phức tạp mã hóa
    const hashPassword = bcrypt.hashSync(password, salt);

    const result = await this.prisma.users.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
        numberPhone: numberPhone,
        birthday: birthday,
        gender: gender,
      },
      select: {
        fullName: true,
        email: true,
        numberPhone: true,
        birthday: true,
        gender: true,
      },
    });

    return result;
  }

  async update(userId: number | string, userUpdateDto: UserUpdateDto) {
    const { fullName, password, numberPhone, birthday, gender } = userUpdateDto;

    // kiểm tra user có tồn tại không
    const userExist = await this.prisma.users.findUnique({
      where: { userId: Number(userId) },
    });
    if (!userExist) throw new BadRequestException('User not found.');

    // Mã hóa password
    const salt = bcrypt.genSaltSync(10); //tạo ra 1 chuỗi ngẫu nhiên để làm tăng phức tạp mã hóa
    const hashPassword = bcrypt.hashSync(password, salt);

    const result = await this.prisma.users.update({
      where: {
        isDeleted: false,
        userId: Number(userId),
      },
      data: {
        fullName: fullName,
        password: hashPassword,
        numberPhone: numberPhone,
        birthday: birthday,
        gender: gender,
      },
      select: {
        fullName: true,
        email: true,
        numberPhone: true,
        birthday: true,
        gender: true,
      },
    });

    return result;
  }

  async delete(id: number | string) {
    // kiểm tra user có tồn tại không
    const userExist = await this.prisma.users.findUnique({
      where: { userId: Number(id), isDeleted: false },
    });
    if (!userExist) throw new BadRequestException('User not found.');

    // xóa mềm dữ liệu
    await this.prisma.users.update({
      where: {
        userId: Number(id),
        isDeleted: false,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: Number(id),
      },
    });
    return { message: 'Xóa user thành công.' };
  }

  async findUserByName(name?: string) {
    // kiểm tra dữ liệu đầu vào
    if (!name) throw new BadRequestException('Name not valid.');

    const result = await this.prisma.users.findMany({
      where: {
        isDeleted: false,
        fullName: { contains: name },
      },
      select: {
        userId: true,
        fullName: true,
        email: true,
        numberPhone: true,
        birthday: true,
        gender: true,
      },
    });
    return result;
  }

  async uploadAvatarLocal(file: Express.Multer.File, user: any) {
    console.log('✌️user --->', { user });
    if (!file) {
      throw new Error('No file upload.');
    }

    if (!user) throw new BadRequestException('Không tìm thấy user.');

    if (user?.avatar) {
      // Nên dùng path để lấy ra đường dẫn chính xác trên mọi hệ điều hành (MacOS, Linux, Window)
      const oldFilePath = path.join('images', user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const userId = Number(user.userId);
    await this.prisma.users.update({
      where: {
        userId: userId,
      },
      data: {
        avatar: file.filename,
      },
    });

    return {
      user: user,
      folder: 'images/',
      filename: file.filename,
      imgUrl: `images/${file.filename}`,
    };
  }

  async searchUser(keyword: string) {
    const isNumberPhone = /^[0-9]{9,11}$/.test(keyword);
    const isEmail = keyword.includes('@');

    // Tìm theo numberPhone
    if (isNumberPhone) {
      return await this.prisma.users.findMany({
        where: { numberPhone: { contains: keyword }, isDeleted: false },
      });
    }

    // Tìm theo Email
    if (isEmail) {
      return await this.prisma.users.findMany({
        where: { email: { contains: keyword }, isDeleted: false },
      });
    }

    // Tìm theo nhiều cột
    return await this.prisma.users.findMany({
      where: {
        isDeleted: false,
        OR: [
          { fullName: { contains: keyword } },
          { email: { contains: keyword } },
          { numberPhone: { contains: keyword } },
        ],
      },
    });
  }
}
