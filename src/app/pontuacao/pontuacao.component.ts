import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs';

import { Pontuacao } from './pontuacao'
import { PontuacaoService } from './pontuacao.service';


/**
 * Componente responsável pelo gerenciamento do sistema de pontuação.
 */
@Component({
    selector: 'dev-pontuacao',
    templateUrl: './pontuacao.component.html',
    styleUrls: [ './pontuacao.component.css' ]
})
export class PontuacaoComponent implements OnInit {

    title: String = "SISTEMA DE PONTUAÇÃO";

    pontuacao: Pontuacao = null;
    pontuacoes: Pontuacao[] = [];


    pontuacaoFormGroup: FormGroup;
    formModalRef: NgbModalRef = null;

    @Input() alert: any = {code: ''};


    constructor(
        private pontuacaoService: PontuacaoService,
        private formBuilder: FormBuilder,
        private modal: NgbModal
    ) { }


    /**
     * Quando a página de sistema de pontuação é requisitada, esta operação é primeiramente executada.
     * Todas as pontuações cadastradas serão exibidas ao usuário.
     */
    ngOnInit() {
        this.loadPontuacoes();

        this.pontuacaoFormGroup= this.formBuilder.group({
            id: [''],
            valorInicial: [''],
            valorFinal: [''],
            pontos: ['']
        });
    }

    /**
     * Solicita o serviço para buscar todas as pontuações cadastradas mostrando-as em seguida ao usuário.
     */
    loadPontuacoes(): void {
        this.pontuacaoService.readAll()
            .subscribe(
                pontuacoes => this.pontuacoes = <Pontuacao[]> pontuacoes
                , err => {
                    this.notice('error');
                }
            );
    }

    /**
     * Atualiza as informações para o usuário, após qualquer atualização de dados.
     */
    refresh(): void {
        this.loadPontuacoes();
    }

    /**
     * Limpa os campos do formulário.
     */
    limpar() {
        this.pontuacao = null;
        this.pontuacaoFormGroup.reset();
    }


    /**
     * Carrega o formulário com as informações da pontuação.
     * @param pontuacao A pontuação que será exibida no formulário.
     */
    private loadForm(pontuacao: Pontuacao): void {
        if (pontuacao) {
            this.pontuacaoFormGroup.setValue({
                id            : pontuacao.id,
                valorInicial  : pontuacao.valorInicial,
                valorFinal    : pontuacao.valorFinal,
                pontos        : pontuacao.pontos
            });
        } else {
            this.pontuacaoFormGroup.setValue({
                id            : '',
                valorInicial  : '',
                valorFinal    : '',
                pontos        : ''
            });
        }
    }


    /**
     * Abre o formulário para inserir uma nova pontuação.
     * @param pontuacaoFormModal O dialog modal que contém o formulário da pontuação.
     */
    novo(pontuacaoFormModal):void {
        this.formModalRef = this.modal.open(pontuacaoFormModal, {size: 'lg'});
        this.limpar();
    }

    /**
     * Abre o formulário para editar uma pontuação.
     * @param pontuacaoFormModal O dialog modal que contém o formulário da pontuação.
     * @param pontuacao A pontuação que será editada.
     */
    editar(pontuacaoFormModal, pontuacao: Pontuacao): void {
        this.novo(pontuacaoFormModal);
        this.limpar();

        this.loadForm(this.pontuacao = pontuacao);
    }

    /**
     * Grava uma pontuação.
     * Caso a pontuação já exista, chama o serviço de atualização para a pontuação.
     * Caso a pontuação não exista, chama o serviço de criação da pontuação.
     */
    gravar() {
        const pontuacao = {
            id            : this.pontuacaoFormGroup.get('id'           ).value,
            valorInicial  : this.pontuacaoFormGroup.get('valorInicial' ).value,
            valorFinal    : this.pontuacaoFormGroup.get('valorFinal'   ).value,
            pontos        : this.pontuacaoFormGroup.get('pontos'       ).value
        }


        const responsePontuacao: Observable<Object> = this.pontuacao
            ?this.pontuacaoService.update(pontuacao)
            :this.pontuacaoService.create(pontuacao);

        responsePontuacao.subscribe(
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
     * Abre o dialog para confirmar se o usuário deseja realmente remover a pontuação.
     * @param dialogRemove Representante do dialog.
     * @param pontuacao A pontuação a ser removida.
     */
    remover(dialogRemove, pontuacao: Pontuacao): void {
        this.pontuacao = pontuacao;

        this.modal.open(dialogRemove, {size: 'sm'});
    }

    /**
     * Solicita o serviço de remoção da pontuação selecionada.
     * @param pontuacao A pontuação a ser removida.
     */
    delete(pontuacao): void {
        this.pontuacaoService.delete(pontuacao.id)
            .subscribe(
                pontuacao => {
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