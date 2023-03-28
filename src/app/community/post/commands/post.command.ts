import { UserProfileCommand } from '@app/user/user.commands';
import { PostProperties } from '@domain/community/post/post';

type BoardInfo = { boardId: number };
type PostInfo = { postId: number };
type UserInfo = { userId: string };
type ImagesInfo = { images: string[] };

export type PostQuery = BoardInfo & PostInfo;

export type PostListQuery = {
  page: number;
  limit: number;
} & BoardInfo;

export type PostCreateRequestCommand = Pick<
  PostProperties,
  'title' | 'content'
>;
export type PostUpdateRequestCommand = Partial<PostCreateRequestCommand>;

export type PostsResponse = {
  posts: {
    questions: PostPreviewResponseCommand[];
    basics: PostPreviewResponseCommand[];
    memoirs: PostPreviewResponseCommand[];
  };
};

export type PostPreviewResponseCommand = {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  author: UserProfileCommand;
  createdAt: Date;
};

export type PostProfileResponseCommand = {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  category?: string;
  author: UserProfileCommand;
  createdAt: Date;
};

export type PostLikeRequestCommand = UserInfo & PostInfo;
