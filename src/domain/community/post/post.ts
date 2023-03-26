import { UserProperties } from '@domain/user/user';

export type PostProperties = {
  id: string;
  title: string;
  content: string;
  author: UserProperties;
  views: number;
  likes: PostLikeProperties[];
  likeCount: number;
  comments: PostCommentProperties[];
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type PostLikeProperties = {
  user: UserProperties;
  post: PostProperties;
};

export type PostCommentProperties = {
  id: string;
  author: UserProperties;
  post: PostProperties;
  parentComment: PostCommentProperties;
  content: string;
};

export enum PostType {
  QUESTION = '질문',
  FREE = '자유',
  MEMOIR = '회고록',
}
