import { Route, Router } from 'angular2/router';
import { Home } from './components/home';
import { Account } from './components/account/account';

export var AppRoutes = {
    home: new Route({ path: '/', name: 'Home', component: Home, useAsDefault : true }),
    account: new Route({ path: '/account/...', name: 'Account', component: Account })
};

export const APP_ROUTES = Object.keys(AppRoutes).map(r => AppRoutes[r]);
