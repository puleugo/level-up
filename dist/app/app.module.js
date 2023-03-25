"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const community_module_1 = require("./community/community.module");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const channel_module_1 = require("./channel/channel.module");
const social_module_1 = require("./social/social.module");
const user_module_1 = require("./user/user.module");
const wish_bucket_module_1 = require("./wish-bucket/wish-bucket.module");
const todo_module_1 = require("./todo/todo.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            community_module_1.CommunityModule,
            social_module_1.SocialModule,
            user_module_1.UserModule,
            wish_bucket_module_1.WishBucketModule,
            channel_module_1.ChannelModule,
            todo_module_1.TodoModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map