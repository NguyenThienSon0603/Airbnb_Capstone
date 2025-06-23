import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CommentService from './comment.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CommentCreateDto, CommentUpdateDto } from './dto/comment.dto';
import { GetUser } from 'src/common/decorator/getUser.decorator';

@ApiTags('Comments')
@ApiBearerAuth('accessToken')
@Controller('/comments')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.commentService.findOne(id);
  }

  @Post()
  async create(
    @Body() commentCreateDto: CommentCreateDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.commentService.create(commentCreateDto, userId);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() commentUpdateDto: CommentUpdateDto,
  ) {
    return await this.commentService.update(id, commentUpdateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @GetUser('userId') userId: number) {
    return await this.commentService.delete(id, userId);
  }
}
