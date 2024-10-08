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

  DASHBOARD_NOTIFICATIONS: 'notificaciones',
  DASHBOARD_HOME: 'dashboard',
  DASHBOARD_PROFILE: 'perfil',
  DASHBOARD_PUBLISH: 'publicar',

  DASHBOARD_PUBLIC_PROFILE_USER: 'perfil/publico',
  DASHBOARD_PUBLIC_PROFILE_USER_ID: 'perfil/publico/:id',

  DASHBOARD_MESSAGES: 'mensajes',
  DASHBOARD_MESSAGES_INBOX: 'mensajes/:id',
  DASHBOARD_CREATE_POST: 'crear-publicacion',
  DASHBOARD_EDIT_POST: 'editar-publicacion/:id',
  DASHBOARD_PUBLIC_PROFILE: 'perfil-publico',
  DASHBOARD_PUBLIC_PROFILE_ID: 'perfil-publico/:id',

  DASHBOARD_MY_WORKS: 'mis-trabajos',
  DASHBOARD_MY_POSTS: 'mis-publicaciones',

  AUTH_LOGIN: 'iniciar-sesion',
  AUTH_REGISTER: 'registrarse',
  AUTH_REGISTER_PROFESSIONAL: 'registro-profesional',
  AUTH_FORGOT_PASSWORD: 'restablecer-contrase%C3%B1a',
} as const;
