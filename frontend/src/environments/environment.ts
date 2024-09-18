export const environment = {
  BASE_URL: 'https://www.contratapp.somee.com/',
  ENDPOINT: {
    USER_SPECIALITIES: 'api/userspecialities',
    LOGIN: 'identity/login',
    REGISTER: 'identity/register',
    USER: 'api/user',
    REFRESH_TOKEN: 'identity/refresh',
    FORGOT_SEND_EMAIL: 'identity/forgotPassword',
    FORGOT_CONFIRM: 'identity/resetPassword',
    USER_MESSAGES: 'api/user/messages',
    USERS_PROFILE: 'api/user/list',
    CATEGORIES: 'api/categories',
    SPECIALITIES: 'api/specialities',
    OFFEROR: 'api/offeror',
    OFFEROR_SPECIALITIES: 'api/offerorspecialities',
  },
  LOCATION: {
    CURRENT_USER_LOCATION:
      'http://ip-api.com/json?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon',
    ADDRESS_AUTOCOMPLETE_BASE_URL: 'https://api.placekit.co/search',
    ADDRESS_AUTOCOMPLETE_KEY: '',
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
