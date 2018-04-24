import { Component } from '@angular/core';

@Component({
    selector: 'loading-indicator',
    template: `
        <div class="row no-margin-right">
            <div class="col-md-12">
                <mat-progress-spinner class="center-progress" [color]="red" [mode]="'indeterminate'"></mat-progress-spinner>
            </div>
        </div>
    `
})
export class LoadingIndicator { }



export class StatePage {

    state: string;


    constructor() {
    }

    standby() {
        this.state = "loading";
    }

    ready() {
        this.state = "ready";
    }

}