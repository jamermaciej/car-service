import { FlowRoutes } from './../../enums/flow';

export const navItem = [
    {
        displayName: 'sidebar.nav_item.dashboard',
        iconName: 'dashboard',
        route: FlowRoutes.DASHBOARD,
        // children: [
        //   {
        //     displayName: 'Car List',
        //     iconName: 'list',
        //     route: '/dashboard/admin',
        //   }
        // ]
      },
      {
        displayName: 'sidebar.nav_item.profile',
        iconName: 'person',
        route: FlowRoutes.PROFILE
      },
      {
        displayName: 'sidebar.nav_item.account',
        iconName: 'lock',
        route: FlowRoutes.ACCOUNT
      },
      {
        displayName: 'sidebar.nav_item.orders_service',
        iconName: 'calendar_today',
        route: FlowRoutes.ORDERS
      },
      {
        displayName: 'sidebar.nav_item.cars',
        iconName: 'directions_cars',
        route: FlowRoutes.CARS
      },
      {
        displayName: 'sidebar.nav_item.customers',
        iconName: 'people',
        route: FlowRoutes.CUSTOMERS
      },
      {
        displayName: 'sidebar.nav_item.settings',
        iconName: 'settings',
        route: FlowRoutes.SETTINGS
      }
];
