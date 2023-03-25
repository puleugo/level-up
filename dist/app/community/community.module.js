"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityModule = void 0;
const common_1 = require("@nestjs/common");
const board_module_1 = require("./board/board.module");
const comment_module_1 = require("./comment/comment.module");
const post_module_1 = require("./post/post.module");
let CommunityModule = class CommunityModule {
};
CommunityModule = __decorate([
    (0, common_1.Module)({
        imports: [post_module_1.PostModule, board_module_1.BoardModule, comment_module_1.CommentModule],
    })
], CommunityModule);
exports.CommunityModule = CommunityModule;
//# sourceMappingURL=community.module.js.map