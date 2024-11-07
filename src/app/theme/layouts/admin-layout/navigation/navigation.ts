export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Home',
        type: 'item',
        classes: 'nav-item',
        url: '/',
        icon: 'bi-house',
        
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'AFFIDAVIT ',
    title: 'AFFIDAVIT ',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'LIQUIDATORS', 
        title: 'Liquidators',
        type: 'item',
        classes: 'nav-item',
        url: '/liquidators',
        icon: 'bi-file-pdf-fill',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'track',
        title: 'Track',
        type: 'item',
        classes: 'nav-item',
        url: '/track',
        icon: 'bi-eye',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Applications',
        type: 'item',
        classes: 'nav-item',
        url: '/applications',
        icon: 'bi-files',
        target: true,
        breadcrumbs: false
      }
    ]
  },

  
];
