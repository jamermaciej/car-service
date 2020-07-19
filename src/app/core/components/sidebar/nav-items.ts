import { FlowRoutes } from './../../enums/flow';

export const navItem = [
    {
        displayName: 'Dashboard',
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
        displayName: 'Profile',
        iconName: 'person',
        route: FlowRoutes.PROFILE
      },
      {
        displayName: 'Orders service',
        iconName: 'calendar_today',
        route: FlowRoutes.ORDERS
      },
      {
        displayName: 'Cars',
        iconName: 'directions_cars',
        route: FlowRoutes.CARS
      },
      {
        displayName: 'Customers',
        iconName: 'people',
        route: FlowRoutes.CUSTOMERS
      },
      {
        displayName: 'Settings',
        iconName: 'settings',
        route: FlowRoutes.SETTINGS
      }
];
