export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Билеты',
    path: '/',
    icon: 'mdi:ticket-outline',
    active: true,
    collapsible: false,
  },
  {
    title: 'Маршруты',
    path: 'routesBus',
    icon: 'mdi:bus',
    active: false,
    collapsible: false,
  },
  {
    title: 'Места',
    path: 'seats',
    icon: 'mdi:seat',
    active: false,
    collapsible: false,
  },
  {
    title: 'Authentication',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Sign In',
        path: 'login',
        active: true,
        collapsible: false,
      },
      {
        title: 'Sign Up',
        path: 'sign-up',
        active: true,
        collapsible: false,
      },
      {
        title: 'Forgot password',
        path: 'forgot-password',
        active: true,
        collapsible: false,
      },
      {
        title: 'Reset password',
        path: 'reset-password',
        active: true,
        collapsible: false,
      },
    ],
  },
];

export default navItems;
