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
exports.ChannelMember = void 0;
const typeorm_1 = require("typeorm");
const channel_entity_1 = require("./channel.entity");
const user_entity_1 = require("../user/user.entity");
let ChannelMember = class ChannelMember {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], ChannelMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'uuid' }),
    __metadata("design:type", String)
], ChannelMember.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'int' }),
    __metadata("design:type", Number)
], ChannelMember.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.Channel, (channels) => channels.channelMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", channel_entity_1.Channel)
], ChannelMember.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ChannelMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ChannelMember.prototype, "user", void 0);
ChannelMember = __decorate([
    (0, typeorm_1.Index)(['userId']),
    (0, typeorm_1.Entity)('channel_members')
], ChannelMember);
exports.ChannelMember = ChannelMember;
//# sourceMappingURL=channelMember.entity.js.map