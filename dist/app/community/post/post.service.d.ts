import { FindOptionsWhere, Repository } from 'typeorm';
import { BoardService } from '@app/community/board/board.service';
import { MemoirCreateRequestCommand, MemoirProfileResponseCommand } from '@app/community/post/commands/memoir.command';
import { PostCreateRequestCommand, PostListQuery, PostProfileResponseCommand, PostUpdateRequestCommand } from '@app/community/post/commands/post.command';
import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { Pagination } from '@app/infrastructure/types/pagination.types';
import { UserService } from '@app/user/user.service';
import { Board } from '@domain/post/board.entity';
import { Memoir } from '@domain/post/memoir.entity';
import { Post } from '@domain/post/post.entity';
import { User } from '@domain/user/user.entity';
export declare class PostService {
    private readonly boardService;
    private readonly userService;
    private readonly boardRepository;
    private readonly postRepository;
    private readonly memoirRepository;
    constructor(boardService: BoardService, userService: UserService, boardRepository: Repository<Board>, postRepository: Repository<Post>, memoirRepository: Repository<Memoir>);
    getPosts(data: PostListQuery): Promise<Pagination<PostProfileResponse>>;
    getPostProfile(postId: string): Promise<PostProfileResponse>;
    createPost(data: {
        boardId: string;
        author: User;
        postCreateRequest: PostCreateRequestCommand;
    }): Promise<PostProfileResponseCommand>;
    updatePost(data: {
        postId: string;
        author: User;
        postUpdateRequest: PostUpdateRequestCommand;
    }): Promise<PostProfileResponseCommand>;
    deletePost(data: {
        postId: string;
        author: User;
    }): Promise<void>;
    findById(postId: string, where?: FindOptionsWhere<PostProfileResponseCommand>): Promise<Post>;
    hitLike(): Promise<void>;
    postMemoir(param: {
        memoirCreateRequest: MemoirCreateRequestCommand;
        author: User;
    }): Promise<MemoirProfileResponseCommand>;
}
