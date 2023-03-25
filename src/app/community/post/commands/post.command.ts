import { UserProfileCommand } from '@app/user/user.commands';
import { PostProperties } from '@domain/post/post';
import { SocialGroupType } from '@domain/social/social-group';

type BoardInfo = { boardId: string };
type PostInfo = { postId: string };
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
export type PostUpdateRequestCommand = PostCreateRequestCommand;

export type PostsResponse = {
  posts: {
    questions: PostPreviewResponseCommand[];
    basics: PostPreviewResponseCommand[];
    memoirs: PostPreviewResponseCommand[];
  };
};

export type PostPreviewResponseCommand = {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  category: SocialGroupType[];
  author: UserProfileCommand;
  createdAt: Date;
};

export type PostProfileResponseCommand = {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  category: SocialGroupType[];
  author: UserProfileCommand;
  createdAt: Date;
};
