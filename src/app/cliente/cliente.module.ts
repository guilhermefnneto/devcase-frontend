import { NgModule } from '@angular/core';
import { ClienteComponent } from './cliente.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ClienteComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        ClienteComponent
    ],
    providers: []
})
export class ClienteModule {

}