import { MemoirCreateRequest } from '@app/community/post/dto/memoir-create.request';
import { MemoirProfileResponse } from '@app/community/post/dto/memoir-profile.response';
import { PostCreateRequest } from '@app/community/post/dto/post-create.request';
import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { PostUpdateRequest } from '@app/community/post/dto/post-update.requests';
import { PostService } from '@app/community/post/post.service';
import { Pagination } from '@app/infrastructure/types/pagination.types';
import { User } from '@domain/user/user.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(page: number, limit: number, boardId: string): Promise<Pagination<PostProfileResponse>>;
    getPostProfile(postId: string): Promise<PostProfileResponse>;
    createPost(boardId: string, author: User, postCreateRequest: PostCreateRequest): Promise<PostProfileResponse>;
    hitLike(): Promise<void>;
    updatePost(postId: string, author: User, postUpdateRequest: PostUpdateRequest): Promise<PostProfileResponse>;
    deletePost(postId: string, author: User): Promise<void>;
    postMemoir(author: User, memoirCreateRequest: MemoirCreateRequest): Promise<MemoirProfileResponse>;
}
