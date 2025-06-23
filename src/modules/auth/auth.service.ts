import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/signin-auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { SignUpDto } from './dto/signup-auth.dto';

@Injectable()
class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}
  async signin(signinDTO: SignInDto) {
    const { email, password } = signinDTO;

    // Kiểm tra email có tồn tại không
    const userExist = await this.prisma.users.findUnique({
      where: { email: email },
      select: {
        userId: true,
        fullName: true,
        email: true,
        password: true,
        numberPhone: true,
        birthday: true,
        avatar: true,
        gender: true,
        isDeleted: true,
        Roles: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    if (!userExist)
      throw new BadRequestException(
        'Tài khoản không tồn tại, vui lòng đăng kí',
      );

    // kiểm tra tài khoản đã tồn tại nhưng bị xóa
    if (userExist.isDeleted === true)
      throw new BadRequestException(
        'Tài khoản không tồn tại, vui lòng đăng kí',
      );

    const isPassword = bcrypt.compareSync(password, userExist.password);
    if (!isPassword) throw new BadRequestException('Mật khẩu không chính xác');

    const tokens = this.tokenService.createTokens(userExist.userId);
    const { accessToken } = tokens;
    const { password: _, ...user } = userExist;

    return { user, accessToken };
  }

  async signup(signupDTO: SignUpDto) {
    const { fullName, email, password, numberPhone, birthday, gender } =
      signupDTO;

    const userExist = await this.prisma.users.findUnique({
      where: { email: email },
    });

    // Kiểm tra tài khoản đã tồn tại chưa
    if (userExist) throw new BadRequestException('Tài khoản đã tồn tại');

    // Nếu chưa tồn tại thì thêm mới tài khoản
    // Mã hóa password
    const salt = bcrypt.genSaltSync(10); //tạo ra 1 chuỗi ngẫu nhiên để làm tăng phức tạp mã hóa
    const hashPassword = bcrypt.hashSync(password, salt);

    const userNew = await this.prisma.users.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
        numberPhone: numberPhone,
        birthday: birthday,
        gender: gender,
      },
    });

    // xóa password khi trả dữ liệu về cho FE để tránh bị hack
    const { password: _, ...user } = userNew;

    return { user };
  }
}
export default AuthService;
