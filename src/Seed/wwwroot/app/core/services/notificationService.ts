import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable()
export class NotificationService {
    private notifier: any = alertify;
    constructor() {
    }

    printSuccessMessage(message: string) {
        this.notifier.success(message);
    }

    printErrorMessage(message: string) {
        this.notifier.error(message);
    }

    printConfirmationDialog(message: string, okCallback: () => any) {
        this.notifier.confirm(message, function (e) {
            if (e) {
                okCallback();
            } else {
            }
        });
    }
}