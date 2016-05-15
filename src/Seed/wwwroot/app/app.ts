/// <reference path="../../typings/browser.d.ts"/>
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, APP_BASE_HREF} from '@angular/common';
import {HTTP_BINDINGS, HTTP_PROVIDERS, Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { ROUTER_PROVIDERS} from '@angular/router';
// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
    PathLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/map';
import {enableProdMode} from '@angular/core';

enableProdMode();
import { AppRoutes, APP_ROUTES } from './routes';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { DataService } from './core/services/dataService';
import { MembershipService } from './core/services/membershipService';
import { UtilityService } from './core/services/utilityService';
import { User } from './core/domain/user';

@Component({
    selector: 'seed-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
@Routes(APP_ROUTES)
export class AppRoot implements OnInit{
    private routes = AppRoutes;

    constructor(public membershipService: MembershipService, private router: Router) {
        this.routes = AppRoutes;
    }

    ngOnInit() {
        this.router.navigate(['/']);
    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            var user = this.membershipService.getLoggedInUser();
            return user.Username;
        }
        else
            return 'Account';
    }

    logout(): void {
        this.membershipService.logout()
            .subscribe(res => {
                localStorage.removeItem('user');
            },
            error => console.error('Error: ' + error),
            () => { });
    }
}

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
}

bootstrap(AppRoot, [HTTP_PROVIDERS, ROUTER_PROVIDERS,
    provide(RequestOptions, { useClass: AppBaseRequestOptions }),
    provide(LocationStrategy, { useClass: PathLocationStrategy }),
    DataService, MembershipService, UtilityService])
    .catch(err => console.error(err));