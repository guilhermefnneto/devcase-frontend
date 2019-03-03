import { Component } from '@angular/core';

import { Pontuacao } from './pontuacao'

@Component({
    selector: 'dev-pontuacao',
    templateUrl: './pontuacao.component.html',
    styleUrls: [ './pontuacao.component.css' ]
})
export class PontuacaoComponent {

    pontuacao: Pontuacao = null;

    

}