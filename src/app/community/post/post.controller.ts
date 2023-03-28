import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { MemoirCreateRequest } from '@app/community/post/dto/memoir-create.request';
import { MemoirProfileResponse } from '@app/community/post/dto/memoir-profile.response';
import { PostCreateRequest } from '@app/community/post/dto/post-create.request';
import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { PostUpdateRequest } from '@app/community/post/dto/post-update.requests';
import { PostService } from '@app/community/post/post.service';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@ApiTags('[커뮤니티] 게시글')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('board/:boardId/posts')
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<Pagination<PostProfileResponse>> {
    return this.postService.getPosts({ page, limit, boardId });
  }

  @Get('posts/:postId')
  @ApiOperation({ summary: '게시글 상세 조회' })
  async getPostProfile(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.getPostProfile(postId);
    return new PostProfileResponse(post);
  }

  @Post('board/:boardId/posts')
  @ApiOperation({ summary: '게시글 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPost(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Req() { user: author }: Request,
    @Body() postCreateRequest: PostCreateRequest,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.createPost({
      boardId,
      author,
      postCreateRequest,
    });
    return new PostProfileResponse(post);
  }

  @Post('posts/:postId/like')
  @ApiOperation({ summary: '게시글 좋아요 클릭' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async hitLike(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() { user: author }: Request,
  ): Promise<void> {
    return await this.postService.hitLike({ postId, userId: author.id });
  }

  @Put('posts/:postId')
  @ApiOperation({ summary: '게시글 수정' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() { user: author }: Request,
    @Body() postUpdateRequest: PostUpdateRequest,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.updatePost({
      postId,
      author,
      postUpdateRequest,
    });
    return new PostProfileResponse(post);
  }

  @Delete('posts/:postId')
  @ApiOperation({ summary: '게시글 삭제' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() { user: author }: Request,
  ): Promise<void> {
    return await this.postService.deletePost({ postId, author });
  }

  @Post('memoirs')
  async postMemoir(
    @Req() { user: author }: Request,
    @Body() memoirCreateRequest: MemoirCreateRequest,
  ): Promise<MemoirProfileResponse> {
    const memoir = await this.postService.postMemoir({
      author,
      memoirCreateRequest,
    });
    return new MemoirProfileResponse(memoir);
  }
}
