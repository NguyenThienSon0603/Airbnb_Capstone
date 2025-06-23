import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import CommentModule from './modules/comments/comment.module';
import { ProtectStrategy } from './common/protectAPI/protectApi.strategy';
import { PrismaService } from './modules/prisma/prisma.service';
import BookingModule from './modules/bookings/booking.module';
import UserModule from './modules/user/user.module';

@Module({
  imports: [AuthModule, TokenModule, CommentModule, BookingModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProtectStrategy],
})
export class AppModule {}
