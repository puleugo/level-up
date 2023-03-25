"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRepository = void 0;
class MockRepository {
    constructor(data = []) {
        this.data = data;
    }
    findOne(options) {
        const { where } = options;
        const result = this.data.find((board) => {
            return Object.entries(where).every(([key, value]) => board[key] === value && board.deletedAt === null);
        });
        return Promise.resolve(result || null);
    }
    find() {
        return this.data;
    }
    softDelete(id) {
        const index = this.data.findIndex((board) => board.id === id);
        this.data[index].deletedAt = new Date();
    }
    save(data) {
        const index = this.data.findIndex((board) => board.id === data.id);
        if (index === -1) {
            this.data.push(data);
        }
        else {
            this.data[index] = data;
        }
        return data;
    }
}
exports.MockRepository = MockRepository;
//# sourceMappingURL=mockRepository.js.map