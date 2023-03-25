"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPreviewResponse = void 0;
const user_profile_response_1 = require("../../../user/dto/user-profile.response");
class PostPreviewResponse {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.likeCount = post.likeCount;
        this.commentCount = post.commentCount;
        this.author = new user_profile_response_1.UserProfileResponse(post.author);
        this.category = post.category;
        this.createdAt = post.createdAt;
    }
}
exports.PostPreviewResponse = PostPreviewResponse;
//# sourceMappingURL=post-preview.response.js.map