import {Component} from '@angular/core'
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common'
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import { AccountRoutes, ACCOUNT_ROUTES } from './routes';

@Component({
    selector: 'account',
    templateUrl: './app/components/account/account.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
@Routes(ACCOUNT_ROUTES)
export class Account {
    constructor() {

    }
}