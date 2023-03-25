"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentProfileResponse = void 0;
const user_profile_response_1 = require("../../../user/dto/user-profile.response");
class PostCommentProfileResponse {
    constructor(comment) {
        this.id = comment.id;
        this.content = comment.content;
        this.author = new user_profile_response_1.UserProfileResponse(comment.author);
        this.post = comment.post;
        this.parentComment = comment.parentComment
            ? new PostCommentProfileResponse(comment.parentComment)
            : null;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
    }
}
exports.PostCommentProfileResponse = PostCommentProfileResponse;
//# sourceMappingURL=post-comment-profile.response.js.map