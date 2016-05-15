import { Route, Router, ROUTER_DIRECTIVES} from '@angular/router';
import { Login } from './Login';
import { Register } from './Register';

export var AccountRoutes = {
    login: new Route({ path: '/login', component: Login}),
    register: new Route({ path: '/register', component: Register })
};

export const ACCOUNT_ROUTES = Object.keys(AccountRoutes).map(r => AccountRoutes[r]);
