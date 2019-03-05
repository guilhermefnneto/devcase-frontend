import { Component, OnInit, Input } from '@angular/core';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'dev-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: [ './cliente.component.css' ]
})
export class ClienteComponent implements OnInit {

    title: String = "CLIENTE";

    cliente: Cliente = null;
    clientes: Cliente[] = [];

    clienteFormGroup: FormGroup;
    formModalRef: NgbModalRef = null;

    @Input() alert: any = {code: ''};

    constructor(
        private clienteService: ClienteService,
        private formBuilder: FormBuilder,
        private modal: NgbModal
    ) { }


    /**
     * Quando a página de sistema de clientes é requisitada, esta operação é primeiramente executada.
     * Todos os clientes cadastrados serão exibidos ao usuário.
     */
    ngOnInit() {
        this.loadClientes();

        this.clienteFormGroup= this.formBuilder.group({
            id                  : [''],
            nome                : [''],
            dataNascimento      : [''],
            sexo                : [''],
            estadoCivil         : [''],
            telefoneResidencial : [''],
            telefoneCelular     : [''],
            email               : [''],
            pontos              : ['0']
        });
    }

    /**
     * Solicita o serviço para buscar todos os clientes cadastrados mostrando-os em seguida ao usuário.
     */
    loadClientes() {
        this.clienteService.readAll()
            .subscribe(
                clientes => this.clientes = <Cliente[]> clientes
                , err => {
                    this.notice('error');
                }
            );
    }

    /**
     * Atualiza as informações para o usuário, após qualquer atualização de dados.
     */
    refresh(): void {
        this.loadClientes();
    }

    /**
     * Limpa os campos do formulário.
     */
    limpar() {
        this.cliente = null;
        this.clienteFormGroup.reset();
    }

   /**
     * Carrega o formulário com as informações do cliente'.
     * @param cliente O cliente que será exibido no formulário.
     */
    private loadForm(cliente: Cliente): void {
        if (cliente) {
            this.clienteFormGroup.setValue({
                id                   : cliente.id,
                nome                 : cliente.nome,
                dataNascimento       : cliente.dataNascimento,
                sexo                 : cliente.sexo,
                estadoCivil          : cliente.estadoCivil,
                telefoneResidencial  : cliente.telefoneResidencial,
                telefoneCelular      : cliente.telefoneCelular,
                email                : cliente.email,
                pontos               : cliente.pontos
            });
        } else {
            this.clienteFormGroup.setValue({
                id                   : '',
                nome                 : '',
                dataNascimento       : '',
                sexo                 : '',
                estadoCivil          : '',
                telefoneResidencial  : '',
                telefoneCelular      : '',
                email                : '',
                pontos               : '0'
            });
        }
    }

    /**
     * Abre o formulário para inserir um novo cliente.
     * @param clienteFormModal O dialog modal que contém o formulário do cliente.
     */
    novo(clienteFormModal):void {
        this.formModalRef = this.modal.open(clienteFormModal, {size: 'lg'});
        this.limpar();
    }

    /**
     * Abre o formulário para editar um cliente.
     * @param clienteFormModal O dialog modal que contém o formulário do cliente.
     * @param cliente O cliente que será editado.
     */
    editar(clienteFormModal, cliente: Cliente): void {
        this.novo(clienteFormModal);
        this.limpar();

        console.log(cliente);

        this.loadForm(this.cliente = cliente);
    }

    /**
     * Grava um cliente.
     * Caso o cliente já exista, chama o serviço de atualização para o cliente.
     * Caso o cliente não exista, chama o serviço de criação do cliente.
     */
    gravar() {
        const cliente = {
            id                   : this.clienteFormGroup.get('id'                 ).value,
            nome                 : this.clienteFormGroup.get('nome'               ).value,
            dataNascimento       : this.clienteFormGroup.get('dataNascimento'     ).value,
            sexo                 : this.clienteFormGroup.get('sexo'               ).value,
            estadoCivil          : this.clienteFormGroup.get('estadoCivil'        ).value,
            telefoneResidencial  : this.clienteFormGroup.get('telefoneResidencial').value,
            telefoneCelular      : this.clienteFormGroup.get('telefoneCelular'    ).value,
            email                : this.clienteFormGroup.get('email'              ).value,
            pontos               : this.clienteFormGroup.get('pontos'             ).value
                                        ?this.clienteFormGroup.get('pontos').value
                                        :'0'
        }

        const responseCliente: Observable<Object> = this.cliente
            ?this.clienteService.update(cliente)
            :this.clienteService.create(cliente);

        responseCliente.subscribe(
            response => {
                this.refresh();
                this.formModalRef.close();
                this.notice('success');
            }, err => {
                this.notice('error');
            }
        );
    }

    /**
     * Abre o dialog para confirmar se o usuário deseja realmente remover o cliente.
     * @param dialogRemove Representante do dialog.
     * @param cliente O cliente a ser removido.
     */
    remover(dialogRemove, cliente: Cliente): void {
        this.cliente = cliente;

        this.modal.open(dialogRemove, {size: 'sm'});
    }

    /**
     * Solicita o serviço de remoção do cliente selecionado.
     * @param cliente O cliente a ser removido.
     */
    delete(cliente): void {
        this.clienteService.delete(cliente.id)
            .subscribe(
                cliente => {
                    this.refresh();
                    this.notice('success');
                },
                err => {
                    this.notice('error');
                }
            );
    }


    private notice(code: string) {
        this.alert.code = code;

        setTimeout(timeout=>{
            this.alert.code = null;
        }, 3000);
    }

}