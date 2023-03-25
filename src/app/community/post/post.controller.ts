import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MemoirCreateRequest } from '@app/community/post/dto/memoir-create.request';
import { MemoirProfileResponse } from '@app/community/post/dto/memoir-profile.response';
import { PostCreateRequest } from '@app/community/post/dto/post-create.request';
import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { PostUpdateRequest } from '@app/community/post/dto/post-update.requests';
import { PostService } from '@app/community/post/post.service';
import { Pagination } from '@app/infrastructure/types/pagination.types';
import { User } from '@domain/user/user.entity';

@ApiTags('[커뮤니티] 게시글')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('board/:boardId/posts')
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ): Promise<Pagination<PostProfileResponse>> {
    return this.postService.getPosts({ page, limit, boardId });
  }

  @Get('posts/:postId')
  async getPostProfile(
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<PostProfileResponse> {
    return this.postService.getPostProfile(postId);
  }

  @Post('board/:boardId/posts')
  async createPost(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Req() author: User,
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
  async hitLike(): Promise<void> {
    return await this.postService.hitLike();
  }

  @Put('posts/:postId')
  async updatePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() author: User,
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
  async deletePost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() author: User,
  ): Promise<void> {
    return await this.postService.deletePost({ postId, author });
  }

  @Post('memoirs')
  async postMemoir(
    @Req() author: User,
    @Body() memoirCreateRequest: MemoirCreateRequest,
  ): Promise<MemoirProfileResponse> {
    const memoir = await this.postService.postMemoir({
      author,
      memoirCreateRequest,
    });
    return new MemoirProfileResponse(memoir);
  }
}
