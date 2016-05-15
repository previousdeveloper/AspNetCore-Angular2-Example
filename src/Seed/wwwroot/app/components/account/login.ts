import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { AppRoutes, APP_ROUTES } from '../../routes';
import { AccountRoutes, ACCOUNT_ROUTES } from './routes';
import { User } from '../../core/domain/user';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'login',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/login.html',
    bindings: [MembershipService, NotificationService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Login implements OnInit {

    private appRoutes = AppRoutes;
    private accountRoutes = AccountRoutes;

    private router: Router;
    private user: User;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                router: Router) {
        this.user = new User('', '');
        this.router = router;
        this.accountRoutes = AccountRoutes;
        this.appRoutes = AppRoutes;
    }

    ngOnInit() {
       
    }

    login(): void {
        var authenticationResult: OperationResult = new OperationResult(false, '');

        this.membershipService.login(this.user)
            .subscribe(res => {
                authenticationResult.Succeeded = res.Succeeded;
                authenticationResult.Message = res.Message;
            },
            error => console.error('Error: ' + error),
            () => {
                if (authenticationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Welcome back ' + this.user.Username + '!');
                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.router.navigateByUrl('/');
                }
                else {
                    this.notificationService.printErrorMessage(authenticationResult.Message);
                }
            });
    };
}