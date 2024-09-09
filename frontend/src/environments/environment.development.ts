export const environment = {
  BASE_URL: 'https://www.contratapp.somee.com/',
  ENDPOINT: {
    LOGIN: 'identity/login',
    REGISTER: 'identity/register',
    USER: 'api/user',
    REFRESH_TOKEN: 'identity/refresh',
    CATEGORY: 'api/category',
    SPECIALITY: 'api/speciality',
    FORGOT_SEND_EMAIL: 'identity/forgotPassword',
    FORGOT_CONFIRM: 'identity/resetPassword',
    USER_MESSAGES_ONE: '/api/user/messages/:idOtherUser',
    USER_MESSAGES_ALL: '/api/user/messages',
    CREATE_USER_MESSAGE: '/api/user/messages/:idOtherUser',
  },
  COOKIES: {
    TOKEN: 'token',
    REFRESH_TOKEN: 'refresh_token',
    USER_THEME: 'user_theme',
  },
};
