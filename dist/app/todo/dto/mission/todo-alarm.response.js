"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionAlarmResponse = void 0;
class MissionAlarmResponse {
    constructor(mission) {
        Object.assign(this, mission);
        this.isTeamAlarm = !!mission.teamId;
    }
}
exports.MissionAlarmResponse = MissionAlarmResponse;
//# sourceMappingURL=todo-alarm.response.js.map