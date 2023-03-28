import { UserProperties } from '@domain/user/user';

export type PostProperties = {
  id: number;
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
  id: number;
  author: UserProperties;
  post: PostProperties;
  parentComment: PostCommentProperties;
  content: string;
};
