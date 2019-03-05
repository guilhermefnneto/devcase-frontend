import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { ApiSettings } from '../app.api.settings';


/**
 * Serviço correspondente à manutenção e recuperação dos clientes cadastrados.
 * Interação entre cliente e servidor.
 */
@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(
        private http: HttpClient
    ) { }


     /**
     * Cria um novo cliente enviando para o servidor a responsabilidade da efetivação do cadastro.
     * @param cliente O cliente a ser criado.
     */
    create(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(ApiSettings.host+'/cliente', cliente);
    }

    /**
     * Recupera do servidor um cliente pelo seu id.
     * @param id O id do cliente a ser recuperado.
     */
    read(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(ApiSettings.host+'/cliente/'+id);
    }

    /**
     * Recupera do servidor todos os clientes cadastrados.
     */
    readAll(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(ApiSettings.host+'/cliente');
    }

    /**
     * Envia um cliente para que o servidor atualize os seus dados.
     * @param cliente O cliente a ser atualizado. 
     */
    update(cliente: Cliente):Observable<Boolean> {
        return this.http.put<Boolean>(ApiSettings.host+'/cliente/'+cliente.id, cliente);
    }

    /**
     * Remove um cliente pelo seu id.
     * @param id O id do cliente a ser removido.
     */
    delete(id: number): Observable<Boolean> {
        return this.http.delete<Boolean>(ApiSettings.host+'/cliente/'+id);
    }

}