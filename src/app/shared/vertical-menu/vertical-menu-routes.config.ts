import { RouteInfo } from './vertical-menu.metadata';

// Sidebar menu Routes and data
export const SUPPLIER_ROUTES: RouteInfo[] = [
  {
    path: '/supplier/dashboard',
    title: 'Dashboard',
    icon: 'ft-home',
    class: '',
    badge: '2',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
    isExternalLink: false,
    submenu: [],
  },
  {
    path: '/supplier/dashboard/products',
    title: 'Products',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/supplier/dashboard/products/add',
        title: 'New Product',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/supplier/dashboard/products/manage',
        title: 'Manage Product',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/supplier/dashboard/orders',
    title: 'Orders',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: 'supplier/dashboard/orders/add',
        title: 'Pending Inquiry',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: 'supplier/dashboard/orders/manage',
        title: 'Manage Orders',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/supplier/dashboard/reviews',
    title: 'Reviews',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/supplier/dashboard/reviews/add',
        title: 'New Reviews',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/supplier/dashboard/reviews/manage',
        title: 'All Reviews',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/supplier/dashboard/promotions/',
    title: 'Promotions',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/supplier/dashboard/promotions/add',
        title: 'Add Promotion',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/supplier/dashboard/promotions/manage',
        title: 'Manage Promotions',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/supplier/dashboard/categories',
    title: 'Categories',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/supplier/dashboard/categories/add',
        title: 'Add Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/supplier/dashboard/categories/manage',
        title: 'Manage Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/supplier/dashboard/sub-categories',
    title: 'Sub Categories',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/supplier/dashboard/sub-categories/add',
        title: 'Add Sub Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/supplier/dashboard/sub-categories/manage',
        title: 'Manage Sub Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'ft-home',
    class: '',
    badge: '2',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
    isExternalLink: false,
    submenu: [],
  },
  {
    path: '/admin/dashboard/products',
    title: 'Products',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/products/add',
        title: 'New Product',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/products/manage',
        title: 'Manage Product',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/dashboard/orders',
    title: 'Orders',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/orders/add',
        title: 'Pending Inquiry',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/orders/manage',
        title: 'Manage Orders',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/dashboard/reviews',
    title: 'Reviews',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/reviews/add',
        title: 'New Reviews',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/reviews/manage',
        title: 'All Reviews',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/dashboard/promotions',
    title: 'Promotions',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/promotions/add',
        title: 'Add Promotion',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/promotions/manage',
        title: 'Manage Promotions',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/dashboard/suppliers',
    title: 'Manage Suppliers',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [],
  },
  {
    path: '/admin/dashboard/categories',
    title: 'Categories',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/categories/add',
        title: 'Add Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/categories/manage',
        title: 'Manage Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/dashboard/sub-categories',
    title: 'Sub Categories',
    icon: 'ft-file-text',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/admin/dashboard/sub-categories/add',
        title: 'Add Sub Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/dashboard/sub-categories/manage',
        title: 'Manage Sub Category',
        icon: 'ft-arrow-right submenu-icon',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];
