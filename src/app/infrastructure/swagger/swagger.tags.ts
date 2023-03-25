export const tags: SwaggerTag[] = [
  // 인증 관련 태그
  { name: '[인증] 인증', description: '인증 관련 기능' },

  // 유저 관련 태그
  { name: '[유저] 계정', description: '유저 관련 기능' },

  // 커뮤니티 관련 태그
  { name: '[커뮤니티] 게시판', description: '게시판 관련 기능' },
  { name: '[커뮤니티] 게시글', description: '게시글 관련 기능' },
  { name: '[커뮤니티] 댓글', description: '게시글 관련 기능' },

  // { name: '[커뮤니티] 소셜링 게시판', description: '소셜링 관련 기능' },
  // { name: '[커뮤니티] 소셜링 게시글', description: '소셜링 관련 기능' },
  // { name: '[커뮤니티] 소셜링 댓글', description: '소셜링 관련 기능' },

  //할일 관련 기능
  { name: '[할일] 할일', description: '할일 관련 기능' },

  //채팅 관련 기능
  // { name: '[채팅] 채널', description: '채팅 관련 기능' },
];
type SwaggerTag = { name: string; description: string };
