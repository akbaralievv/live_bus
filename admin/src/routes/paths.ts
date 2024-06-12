export const rootPaths = {
  homeRoot: '',
  routesBusRoot: 'routesBus',
  ticketsBusRoot: 'tickets',
  seatsRoot: 'seats',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  routesBus: `/${rootPaths.routesBusRoot}`,
  tickets: `/${rootPaths.ticketsBusRoot}`,
  seats: `/${rootPaths.seatsRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
