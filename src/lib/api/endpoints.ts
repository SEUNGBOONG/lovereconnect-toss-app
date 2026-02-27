export const API = {
  AUTH: {
    ME: "/auth/me",
    CHECK_EMAIL: "/email/check-email",
    SEND_CODE: "/email/send-code",
    VERIFY_CODE: "/email/verify-code",
    CHANGE_PASSWORD: "/email/change-password",
  },
  PHONE: {
    SEND: "/phone/send",
    VERIFY: "/phone/verify",
  },
  MEMBER: {
    SIGNUP: "/normalMembers",
    LOGIN: "/login",
    TOSS_LOGIN: "/api/v1/toss/login",
    TOSS_ADDITIONAL_INFO: "/api/v1/toss/additional-info",
    LOGOUT: "/api/v1/toss/logout",
    PROFILE: "/profile/me",
    RESET_PASSWORD: "/auth/reset-password",
  },
  MATCH: {
    REQUEST: "/matches/request",
    RESULT: "/matches/result",
  },
  ATTACHMENT: {
    QUESTIONS: "/attachment-test/questions",
    SUBMIT: "/attachment-test/submit",
    RESULT: "/attachment-test/result",
  },
  COMMUNITY: {
    POSTS: "/posts",
    POSTS_PAGED: "/posts/paged",
    COMMENTS_PAGED: (postId: number) => `/comments/post/${postId}/paged`,
    COMMENTS: "/comments",
  },
} as const;
