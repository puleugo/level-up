import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialCommentService {
  async getComments(data: { socialGroupPostId: string }) {
    return;
  }

  async createComment(data: { socialGroupPostId: string }) {
    return;
  }

  async createReply(data: {
    socialGroupPostId: string;
    socialGroupCommentId: string;
  }) {
    return;
  }

  async hitLike(data: {
    socialGroupPostId: string;
    socialGroupCommentId: string;
  }) {
    return;
  }

  async updateComment(data: {
    socialGroupPostId: string;
    socialGroupCommentId: string;
  }) {
    return;
  }

  async deleteComment(data: {
    socialGroupPostId: string;
    socialGroupCommentId: string;
  }) {
    return;
  }
}
