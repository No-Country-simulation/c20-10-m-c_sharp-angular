export const environment = {
  BASE_URL: 'https://www.contratapp.somee.com/',
  ENDPOINT: {
    USER_SPECIALITIES: 'api/userspecialities/',
    LOGIN: 'identity/login',
    REGISTER: 'identity/register',
    USER: 'api/user',
    REFRESH_TOKEN: 'identity/refresh',
    FORGOT_SEND_EMAIL: 'identity/forgotPassword',
    FORGOT_CONFIRM: 'identity/resetPassword',
    USER_MESSAGES_ONE: '/api/user/messages/:idOtherUser',
    USER_MESSAGES_ALL: '/api/user/messages',
    CREATE_USER_MESSAGE: '/api/user/messages/:idOtherUser',
    CATEGORIES: 'api/categories',
    SPECIALITIES: 'api/specialities',
    OFFEROR: 'api/offeror',
    OFFEROR_SPECIALITIES: 'api/offerorspecialities',
  },
  SESSION_STORAGE: {
    ALL_CATEGORIES: 'allCategories',
    ALL_SPECIALITIES: 'allSpecialities',
  },
  COOKIES: {
    TOKEN: 'token',
    REFRESH_TOKEN: 'refresh_token',
    USER_THEME: 'user_theme',
  },
};
