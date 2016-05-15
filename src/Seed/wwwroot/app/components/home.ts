import {Component, OnInit} from '@angular/core';
import { MembershipService } from '../core/services/membershipService';

@Component({
    selector: 'home',
    templateUrl: './app/components/home.html',
    directives: []
})
export class Home implements OnInit  {

    constructor(public membershipService: MembershipService) {
    }

    ngOnInit() {

    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }
}