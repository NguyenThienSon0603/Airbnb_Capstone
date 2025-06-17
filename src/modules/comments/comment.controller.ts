import { Body, Controller, Get, Post } from '@nestjs/common';
import CommentService from './comment.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { GetUser } from 'src/common/decorator/getUser.decorator';

@ApiTags('Comments')
@ApiBearerAuth('accessToken')
@Controller('/comment')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Nhập accessToken',
  //   required: true,
  // })
  async findAll() {
    return await this.commentService.findAll();
  }

  @Post()
  async create(
    @Body() commentDTO: CommentDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.commentService.create(commentDTO, userId);
  }
}
