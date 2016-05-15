import { Route, Router } from '@angular/router';
import { Home } from './components/home';
import { Account } from './components/account/account';

export var AppRoutes = {
    home: new Route({ path: '/', component: Home }),
    account: new Route({ path: '/account',  component: Account })
};

export const APP_ROUTES = Object.keys(AppRoutes).map(r => AppRoutes[r]);
