// 현재 온라인인 유저들의 목록을 저장하는 객체
// TODO: 현재는 서버가 죽으면 온라인 유저 목록이 초기화됨. 영구적으로 저장해야 함.(Redis 등)
export const onlineMap = {};
