import { NgModule } from '@angular/core';
import { ClienteComponent } from './cliente.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';


@NgModule({
    declarations: [
        ClienteComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        HomeModule
    ],
    exports: [
        ClienteComponent
    ],
    providers: []
})
export class ClienteModule {

}