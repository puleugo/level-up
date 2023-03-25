"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProfileResponse = void 0;
const user_profile_response_1 = require("../../../user/dto/user-profile.response");
class PostProfileResponse {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.likeCount = post.likeCount;
        this.commentCount = post.commentCount;
        this.category = post.category;
        this.createdAt = post.createdAt;
        this.author = new user_profile_response_1.UserProfileResponse(post.author);
    }
}
exports.PostProfileResponse = PostProfileResponse;
//# sourceMappingURL=post-profile.response.js.map