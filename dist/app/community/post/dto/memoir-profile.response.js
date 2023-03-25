"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoirProfileResponse = void 0;
class MemoirProfileResponse {
    constructor(memoir) {
        Object.assign(this, memoir);
        this.todoTitle = memoir.toDo.title;
    }
}
exports.MemoirProfileResponse = MemoirProfileResponse;
//# sourceMappingURL=memoir-profile.response.js.map