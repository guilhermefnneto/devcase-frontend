import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pontuacao } from './pontuacao';
import { ApiSettings } from '../app.api.settings';


/**
 * Serviço correspondente à manutenção e recuperação das pontuações cadastradas.
 * Interação entre cliente e servidor.
 */
@Injectable({
    providedIn: 'root'
})
export class PontuacaoService {

    constructor(
        private http: HttpClient
    ) { }

    
    /**
     * Cria uma nova pontuação enviando para o servidor a responsabilidade da efetivação do cadastro.
     * @param pontuacao A pontuação a ser criada.
     */
    create(pontuacao: Pontuacao): Observable<Pontuacao> {
        return this.http.post<Pontuacao>(ApiSettings.host+'/pontuacao', pontuacao);
    }

    /**
     * Recupera do servidor uma pontuação pelo seu id.
     * @param id O id da pontuação a ser recuperada.
     */
    read(id: number): Observable<Pontuacao> {
        return this.http.get<Pontuacao>(ApiSettings.host+'/pontuacao/'+id);
    }

    /**
     * Recupera do servidor todas as pontuações cadastradas.
     */
    readAll(): Observable<Pontuacao[]> {
        return this.http.get<Pontuacao[]>(ApiSettings.host+'/pontuacao');
    }

    /**
     * Envia uma pontuação para que o servidor atualize os seus dados.
     * @param pontuacao A pontuação a ser atualizada. 
     */
    update(pontuacao: Pontuacao):Observable<Boolean> {
        return this.http.put<Boolean>(ApiSettings.host+'/pontuacao/'+pontuacao.id, pontuacao);
    }

    /**
     * Remove uma pontuação pelo seu id.
     * @param id O id da pontuação a ser removida.
     */
    delete(id: number): Observable<Boolean> {
        return this.http.delete<Boolean>(ApiSettings.host+'/pontuacao/'+id);
    }

}