"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGroup = exports.API_GROUP_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.API_GROUP_METADATA = 'API_GROUP_METADATA';
const ApiGroup = (group) => (0, common_1.SetMetadata)(exports.API_GROUP_METADATA, group);
exports.ApiGroup = ApiGroup;
//# sourceMappingURL=api-group.decorator.js.map