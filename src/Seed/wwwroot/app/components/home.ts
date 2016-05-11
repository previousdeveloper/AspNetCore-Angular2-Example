import {Component} from 'angular2/core';
import { MembershipService } from '../core/services/membershipService';

@Component({
    selector: 'home',
    templateUrl: './app/components/home.html',
    directives: []
})
export class Home {

    constructor(public membershipService: MembershipService) {

    }
    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }
}