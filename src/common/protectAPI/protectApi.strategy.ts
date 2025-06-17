import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protectApi') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET || 'Không lấy được ACCESS_TOKEN_SECRET trong env',
    });
  }

  async validate(decode: any) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: decode.userId,
      },
      include: {
        Roles: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found.');
    return user;
  }
}
