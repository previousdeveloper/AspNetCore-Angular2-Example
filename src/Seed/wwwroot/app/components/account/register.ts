import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router} from '@angular/router'
import { AccountRoutes, ACCOUNT_ROUTES } from './routes';
import { Registration } from '../../core/domain/registration'
import { OperationResult } from '../../core/domain/operationResult'
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'register',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/register.html',
    bindings: [MembershipService, NotificationService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register implements OnInit  {

    private accountRoutes = AccountRoutes;
    private router: Router;
    private newUser: Registration;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                router: Router) {
        this.newUser = new Registration('', '', '');
        this.router = router;
        this.accountRoutes = AccountRoutes;
    }
    ngOnInit() {

    }
    register(): void {
        var registrationResult: OperationResult = new OperationResult(false, '');
        this.membershipService.register(this.newUser)
            .subscribe(res => {
                registrationResult.Succeeded = res.Succeeded;
                registrationResult.Message = res.Message;

            },
            error => console.error('Error: ' + error),
            () => {
                if (registrationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Dear ' + this.newUser.Username + ', please login with your credentials');
                    this.router.navigate([this.accountRoutes.login]);
                }
                else {
                    this.notificationService.printErrorMessage(registrationResult.Message);
                }
            });
    };
}