"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccessDeniedException = exports.UserNotFoundException = exports.DuplicatedUsernameException = exports.USER_ERRORS = void 0;
const common_1 = require("@nestjs/common");
exports.USER_ERRORS = {
    DUPLICATED_USERNAME: 'DUPLICATED_USERNAME',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_ACCESS_DENIED: 'USER_ACCESS_DENIED',
};
class DuplicatedUsernameException extends common_1.ConflictException {
    constructor() {
        super('이미 사용중인 아이디입니다.', exports.USER_ERRORS.DUPLICATED_USERNAME);
    }
}
exports.DuplicatedUsernameException = DuplicatedUsernameException;
class UserNotFoundException extends common_1.BadRequestException {
    constructor() {
        super('사용자를 찾을 수 없습니다.', exports.USER_ERRORS.USER_NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class UserAccessDeniedException extends common_1.BadRequestException {
    constructor() {
        super('접근 권한이 없습니다.', exports.USER_ERRORS.USER_ACCESS_DENIED);
    }
}
exports.UserAccessDeniedException = UserAccessDeniedException;
//# sourceMappingURL=user.errors.js.map