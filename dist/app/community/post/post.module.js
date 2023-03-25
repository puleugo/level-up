"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const board_module_1 = require("../board/board.module");
const user_module_1 = require("../../user/user.module");
const board_entity_1 = require("../../../domain/post/board.entity");
const memoir_entity_1 = require("../../../domain/post/memoir.entity");
const post_comment_entity_1 = require("../../../domain/post/post-comment.entity");
const post_image_entity_1 = require("../../../domain/post/post-image.entity");
const post_entity_1 = require("../../../domain/post/post.entity");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([board_entity_1.Board, post_entity_1.Post, post_image_entity_1.PostImage, post_comment_entity_1.PostComment, memoir_entity_1.Memoir]),
            user_module_1.UserModule,
            board_module_1.BoardModule,
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        exports: [post_service_1.PostService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map