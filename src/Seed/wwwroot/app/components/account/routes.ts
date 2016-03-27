import { Route, Router, Redirect } from 'angular2/router';
import { Login } from './Login';
import { Register } from './Register';

export var AccountRoutes = {
    login: new Route({ path: '/login', name: 'Login', component: Login, useAsDefault: true }),
    register: new Route({ path: '/register', name: 'Register', component: Register })
};

export const ACCOUNT_ROUTES = Object.keys(AccountRoutes).map(r => AccountRoutes[r]);
