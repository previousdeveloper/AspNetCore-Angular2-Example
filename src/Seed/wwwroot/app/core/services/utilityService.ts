import { Injectable } from '@angular/core';
import {Router} from '@angular/router'

@Injectable()
export class UtilityService {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    convertDateTime(date: Date) {
        var formattedDate = new Date(date.toString());
        return formattedDate.toDateString();
    }

    navigate(path: string) {
        this.router.navigate([path]);
    }

    navigateToSignIn() {
        this.navigate('/Account/Login');
    }
}