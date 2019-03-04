import { NgModule } from '@angular/core';
import { PontuacaoComponent } from './pontuacao.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        PontuacaoComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        PontuacaoComponent
    ],
    providers: []
})
export class PontuacaoModule { }