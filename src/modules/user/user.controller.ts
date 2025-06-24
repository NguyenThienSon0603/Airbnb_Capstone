import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import UserService from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import uploadLocal from '../multer/local.multer';
import { SearchUserDto } from './dto/search-user.dto';

@ApiTags('Users')
@ApiBearerAuth('accessToken')
@Controller('/users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/search-user/')
  async searchUser(@Query('keyword') keyword: string) {
    return await this.userService.searchUser(keyword);
  }

  @Get('/search/')
  async findUserByName(@Query('name') name?: string) {
    return await this.userService.findUserByName(name);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userDto: UserCreateDto) {
    return await this.userService.create(userDto);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', uploadLocal))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload Avatar Local',
    type: UploadAvatarDto,
  })
  async uploadAvatarLocal(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }), //1MB
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return await this.userService.uploadAvatarLocal(file, req.user);
  }
}
