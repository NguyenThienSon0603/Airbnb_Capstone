import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
class AuthModule {}
export default AuthModule;
