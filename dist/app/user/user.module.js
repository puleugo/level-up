"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coord2address_client_1 = require("../infrastructure/types/coord2address.client");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mission_entity_1 = require("../../domain/todo/mission.entity");
const oauth_type_entity_1 = require("../../domain/user/oauth-type.entity");
const user_address_entity_1 = require("../../domain/user/user-address.entity");
const user_profile_entity_1 = require("../../domain/user/user-profile.entity");
const user_sns_entity_1 = require("../../domain/user/user-sns.entity");
const user_entity_1 = require("../../domain/user/user.entity");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                user_address_entity_1.UserAddress,
                user_profile_entity_1.UserProfile,
                user_sns_entity_1.UserSns,
                oauth_type_entity_1.UserOauthType,
                mission_entity_1.Mission,
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, coord2address_client_1.Coord2addressClient],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map