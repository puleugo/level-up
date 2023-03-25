"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelChat = void 0;
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const user_entity_1 = require("../user/user.entity");
let ChannelChat = class ChannelChat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], ChannelChat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ChannelChat.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ChannelChat.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ChannelChat.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.channelChats, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ChannelChat.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.Channel, (channel) => channel.channelChats, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'channelId', referencedColumnName: 'id' }),
    __metadata("design:type", channel_entity_1.Channel)
], ChannelChat.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChannelChat.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChannelChat.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ChannelChat.prototype, "deletedAt", void 0);
ChannelChat = __decorate([
    (0, typeorm_1.Index)(['channelId', 'userId']),
    (0, typeorm_1.Entity)('channel_chats')
], ChannelChat);
exports.ChannelChat = ChannelChat;
//# sourceMappingURL=channel-chat.entity.js.map