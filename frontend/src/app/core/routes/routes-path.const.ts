export const ROUTES_PATH = {
  LANDING_HOME: 'inicio',
  LANDING_BROWSER: 'explorar',
  LANDING_BROWSER_CATEGORIES: 'explorar/categoria',
  LANDING_BROWSER_CATEGORIES_ID: 'explorar/categoria/:categoryName',

  DASHBOARD_HOME: 'dashboard',

  DASHBOARD_PROFILE: 'perfil',
  DASHBOARD_PUBLIC_PROFILE_USER: 'perfil/publico',
  DASHBOARD_PUBLIC_PROFILE_USER_ID: 'perfil/publico/:id',

  DASHBOARD_MESSAGES: 'mensajes',
  DASHBOARD_MESSAGES_INBOX: 'mensajes/:id',

  AUTH_LOGIN: 'iniciar-sesion',
  AUTH_REGISTER: 'registrarse',
  AUTH_REGISTER_PROFESSIONAL: 'registro-profesional',
  AUTH_FORGOT_PASSWORD: 'restablecer-contrase%C3%B1a',

  DASHBOARD_PROFILE: 'perfil',
} as const;
