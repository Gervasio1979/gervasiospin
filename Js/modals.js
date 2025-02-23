// JavaScript Document
// js/modals.js
// Arquivo JavaScript contendo funções para manipular os modais de aposta e pagamentos

const btnEscolherAposta = document.getElementById('btnEscolherAposta');
const modalAposta = document.getElementById('modalAposta');
const spanCloseAposta = modalAposta.querySelector('.close');
const opcoesAposta = modalAposta.querySelectorAll('.opcao-aposta');
const modalPagamentos = document.getElementById('modalPagamentos');
const spanClosePagamentos = modalPagamentos.querySelector('.close');

btnEscolherAposta.addEventListener('click', function() {
    // Mostra o modal de seleção de aposta
    modalAposta.style.display = 'block';
});

spanCloseAposta.addEventListener('click', function() {
    // Fecha o modal de seleção de aposta
    modalAposta.style.display = 'none';
});

modalAposta.addEventListener('click', function(event) {
    // Fecha o modal de seleção de aposta ao clicar fora dele
    if (event.target === modalAposta) {
        modalAposta.style.display = 'none';
    }
});

opcoesAposta.forEach(function(botao) {
    botao.addEventListener('click', function() {
        // Atualiza o valor da aposta e fecha o modal
        const novoValor = parseFloat(botao.getAttribute('data-aposta'));
        document.getElementById('valorAposta').textContent = formatarMoeda(novoValor);
        modalAposta.style.display = 'none';
    });
});

function mostrarModalPagamentos() {
    // Mostra o modal de tabela de pagamentos
    modalPagamentos.style.display = 'block';
}

spanClosePagamentos.addEventListener('click', function() {
    // Fecha o modal de tabela de pagamentos
    modalPagamentos.style.display = 'none';
});

modalPagamentos.addEventListener('click', function(event) {
    // Fecha o modal de tabela de pagamentos ao clicar fora dele
    if (event.target === modalPagamentos) {
        modalPagamentos.style.display = 'none';
    }
});