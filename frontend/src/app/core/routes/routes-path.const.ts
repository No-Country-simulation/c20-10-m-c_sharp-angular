export const ROUTES_PATH = {
  LANDING_HOME: 'inicio',
  LANDING_BROWSER: 'explorar',
  LANDING_BROWSER_CATEGORIES: 'explorar/categoria',
  LANDING_BROWSER_CATEGORIES_ID: 'explorar/categoria/:categoryName',
  LANDING_BROWSER_CATEGORIES_ID_ESPECIALITY:
    'explorar/categoria/:categoryName/especialidad/:specialityName',

  LANDING_BROWSER_DETAILED_POST: 'explorar/post',
  LANDING_BROWSER_DETAILED_POST_ID: 'explorar/post/:id',

  LANDING_PROFILE_PROFESSIONAL: '',
  LANDING_PROFILE_CLIENT: '',

  DASHBOARD_HOME: 'dashboard',

  DASHBOARD_PROFILE: 'perfil',
  DASHBOARD_PUBLIC_PROFILE_USER: 'perfil/publico',
  DASHBOARD_PUBLIC_PROFILE_USER_ID: 'perfil/publico/:id',

  DASHBOARD_MESSAGES: 'mensajes',
  DASHBOARD_MESSAGES_INBOX: 'mensajes/:id',
  DASHBOARD_CREATE_POST: 'crear-publicacion',
  DASHBOARD_PUBLIC_PROFILE: 'perfil-publico',

  AUTH_LOGIN: 'iniciar-sesion',
  AUTH_REGISTER: 'registrarse',
  AUTH_REGISTER_PROFESSIONAL: 'registro-profesional',
  AUTH_FORGOT_PASSWORD: 'restablecer-contrase%C3%B1a',
} as const;
