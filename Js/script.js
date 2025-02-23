// js/script.js
// Arquivo JavaScript único contendo todas as funções do jogo de slot machine

// Função para formatar valores como moeda brasileira
function formatarMoeda(valor) {
    return "R$" + valor.toFixed(2).replace('.', ',');
}

// Variáveis globais
let creditos = 20.00;
let turboAtivo = false;
let caixa = 0.00;
let caixaReserva = 0.00;
let girosAutomaticos = 0;
let girandoAutomaticamente = false;

const btnEscolherAposta = document.getElementById('btnEscolherAposta');
const btnAposta2 = document.getElementById('btnAposta2'); // Novo seletor para rodape-aposta2
const modalAposta = document.getElementById('modalAposta');
const spanCloseAposta = modalAposta ? modalAposta.querySelector('.close') : null;
const opcoesAposta = modalAposta ? modalAposta.querySelectorAll('.opcao-aposta') : [];
const modalPagamentos = document.getElementById('modalPagamentos');
const spanClosePagamentos = modalPagamentos ? modalPagamentos.querySelector('.close') : null;
const modalGirosAutomaticos = document.getElementById('modalGirosAutomaticos');
const spanCloseGiros = modalGirosAutomaticos ? modalGirosAutomaticos.querySelector('.close') : null;
const opcoesGiros = modalGirosAutomaticos ? modalGirosAutomaticos.querySelectorAll('.opcao-giros') : [];
const valorApostaElement = document.getElementById('valorAposta');
const creditosElement = document.getElementById('creditos');
const resultadoElement = document.getElementById('resultado');
const mensagemAnimada = document.querySelector('.mensagem-animada');
const botaoGirar = document.querySelector('.rodape-meio img');
const subPaginaDireita = document.querySelector('.sub-pagina-direita');

// Sons adicionados
const somFundo = new Audio('sounds/fundo.mp3');
const somRoleta = new Audio('sounds/roleta.mp3');
const somParar = new Audio('sounds/parar.mp3');

const simbolos = ["images/btngirar.png", "images/dragao.png", "images/dinheiro.png", "images/sorte.png"];
const rolos = document.querySelectorAll('.simbolos');
const alturaSimbolo = 195;
const simbolosVisiveis = 3;

// Inicializa a animação padrão do botão girar e o som de fundo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (botaoGirar) {
        botaoGirar.classList.add('girarDevagar');
        botaoGirar.classList.remove('girarRapido');
    }
    somFundo.loop = true;
    somFundo.play();
    preencherRolos();
    if (subPaginaDireita) {
        subPaginaDireita.textContent = `Caixa: ${formatarMoeda(caixa)}`;
    }
});

// Funções relacionadas aos modais
if (btnEscolherAposta) {
    btnEscolherAposta.addEventListener('click', function() {
        if (modalGirosAutomaticos) modalGirosAutomaticos.style.display = 'block'; // Abre o modal de giros automáticos
    });
}

if (btnAposta2) {
    btnAposta2.addEventListener('click', function() {
        if (modalAposta) modalAposta.style.display = 'block'; // Abre o modal de apostas
    });
}

if (spanCloseAposta) {
    spanCloseAposta.addEventListener('click', function() {
        if (modalAposta) modalAposta.style.display = 'none';
    });
}

if (modalAposta) {
    modalAposta.addEventListener('click', function(event) {
        if (event.target === modalAposta) {
            modalAposta.style.display = 'none';
        }
    });
}

opcoesAposta.forEach(function(botao) {
    botao.addEventListener('click', function() {
        const novoValor = parseFloat(botao.getAttribute('data-aposta'));
        if (valorApostaElement) valorApostaElement.textContent = formatarMoeda(novoValor);
        if (modalAposta) modalAposta.style.display = 'none';
    });
});

function mostrarModalPagamentos() {
    if (modalPagamentos) modalPagamentos.style.display = 'block';
}

if (spanClosePagamentos) {
    spanClosePagamentos.addEventListener('click', function() {
        if (modalPagamentos) modalPagamentos.style.display = 'none';
    });
}

if (modalPagamentos) {
    modalPagamentos.addEventListener('click', function(event) {
        if (event.target === modalPagamentos) {
            modalPagamentos.style.display = 'none';
        }
    });
}

if (spanCloseGiros) {
    spanCloseGiros.addEventListener('click', function() {
        if (modalGirosAutomaticos) modalGirosAutomaticos.style.display = 'none';
    });
}

if (modalGirosAutomaticos) {
    modalGirosAutomaticos.addEventListener('click', function(event) {
        if (event.target === modalGirosAutomaticos) {
            modalGirosAutomaticos.style.display = 'none';
        }
    });
}

opcoesGiros.forEach(function(botao) {
    botao.addEventListener('click', function() {
        girosAutomaticos = parseInt(botao.getAttribute('data-giros'));
        if (modalGirosAutomaticos) modalGirosAutomaticos.style.display = 'none';
        iniciarGirosAutomaticos();
    });
});

// Funções principais do jogo
function toggleTurbo() {
    turboAtivo = !turboAtivo;
    const rodapeEsquerda = document.querySelector('.rodape-esquerda');
    if (rodapeEsquerda) {
        if (turboAtivo) {
            rodapeEsquerda.classList.add('turbo-ativo');
        } else {
            rodapeEsquerda.classList.remove('turbo-ativo');
        }
    }
}

function resetBlink() {
    document.querySelectorAll('.blink').forEach(el => {
        el.classList.remove('blink');
    });
}

function preencherRolos() {
    rolos.forEach(rolo => {
        rolo.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            let simbolo = document.createElement("div");
            simbolo.classList.add("simbolo");
            let img = document.createElement("img");
            img.src = simbolos[Math.floor(Math.random() * simbolos.length)];
            img.style.width = "100%";
            img.style.height = "100%";
            simbolo.appendChild(img);
            rolo.appendChild(simbolo);
        }
    });
}

function girarRolos() {
    const apostaTexto = valorApostaElement ? valorApostaElement.textContent.replace('R$', '').replace(',', '.') : '0';
    const aposta = parseFloat(apostaTexto);
    if (creditos < aposta) {
        alert("Créditos insuficientes!");
        if (girandoAutomaticamente) {
            girosAutomaticos = 0;
            girandoAutomaticamente = false;
        }
        return;
    }

    const overlay = document.getElementById('overlayCombinacao');
    if (overlay) overlay.style.display = 'none';

    if (botaoGirar) {
        botaoGirar.classList.remove('girarDevagar');
        botaoGirar.classList.add('girarRapido');
        somRoleta.play();
    }

    const valorCaixa = aposta * 0.10;
    const valorReserva = aposta * 0.90;
    caixa += valorCaixa;
    caixaReserva += valorReserva;
    if (subPaginaDireita) subPaginaDireita.textContent = `Caixa: ${formatarMoeda(caixa)}`;

    resetBlink();
    let resultadoSimbolos = [[], [], []];
    let posicoesAleatorias = [];

    const tempoSpin = turboAtivo ? 400 : 900;

    rolos.forEach((rolo, index) => {
        rolo.style.animation = 'none';
        void rolo.offsetWidth;
        rolo.style.animation = `rolar ${tempoSpin / 1000}s linear`;

        setTimeout(() => {
            const totalSimbolos = rolo.children.length;
            const posicaoAleatoria = Math.floor(Math.random() * (totalSimbolos - simbolosVisiveis));
            posicoesAleatorias.push(posicaoAleatoria);
            const posicaoFinal = -(posicaoAleatoria * alturaSimbolo);
            const offsetCorrecao = (alturaSimbolo * simbolosVisiveis) / 3;
            rolo.style.transform = `translateY(${posicaoFinal + offsetCorrecao}px)`;
            rolo.style.animation = '';

            for (let i = 0; i < simbolosVisiveis; i++) {
                resultadoSimbolos[i].push(rolo.children[posicaoAleatoria + i].querySelector('img'));
            }

            if (index === rolos.length - 1) {
                verificarVitoria(resultadoSimbolos);
                exibirMatriz(resultadoSimbolos);
                piscarCombinacao(resultadoSimbolos, posicoesAleatorias);
                if (botaoGirar) {
                    botaoGirar.classList.remove('girarRapido');
                    botaoGirar.classList.add('girarDevagar');
                }
                somRoleta.pause();
                somRoleta.currentTime = 0;
                somParar.play();

                if (girandoAutomaticamente && girosAutomaticos > 0) {
                    girosAutomaticos--;
                    if (girosAutomaticos > 0) {
                        setTimeout(girarRolos, tempoSpin + 1000);
                    } else {
                        girandoAutomaticamente = false;
                    }
                }
            }
        }, tempoSpin);
    });
}

function iniciarGirosAutomaticos() {
    if (girosAutomaticos > 0 && !girandoAutomaticamente) {
        girandoAutomaticamente = true;
        girarRolos();
    }
}

function verificarVitoria(resultadoSimbolos) {
    let vitoria = false;
    let winningSymbol = null;
    const apostaTexto = valorApostaElement ? valorApostaElement.textContent.replace('R$', '').replace(',', '.') : '0';
    const aposta = parseFloat(apostaTexto);
    let ganho = 0;

    for (let i = 0; i < simbolosVisiveis; i++) {
        if (
            resultadoSimbolos[i][0].src === resultadoSimbolos[i][1].src &&
            resultadoSimbolos[i][1].src === resultadoSimbolos[i][2].src
        ) {
            vitoria = true;
            winningSymbol = resultadoSimbolos[i][0].src;
            break;
        }
    }

    if (!vitoria) {
        for (let j = 0; j < simbolosVisiveis; j++) {
            if (
                resultadoSimbolos[0][j].src === resultadoSimbolos[1][j].src &&
                resultadoSimbolos[1][j].src === resultadoSimbolos[2][j].src
            ) {
                vitoria = true;
                winningSymbol = resultadoSimbolos[0][j].src;
                break;
            }
        }
    }

    if (!vitoria) {
        if (
            resultadoSimbolos[0][0].src === resultadoSimbolos[1][1].src &&
            resultadoSimbolos[1][1].src === resultadoSimbolos[2][2].src
        ) {
            vitoria = true;
            winningSymbol = resultadoSimbolos[0][0].src;
        }
    }

    if (!vitoria) {
        if (
            resultadoSimbolos[0][2].src === resultadoSimbolos[1][1].src &&
            resultadoSimbolos[1][1].src === resultadoSimbolos[2][0].src
        ) {
            vitoria = true;
            winningSymbol = resultadoSimbolos[0][2].src;
        }
    }

    if (vitoria) {
        if (winningSymbol.includes("images/btngirar.png")) {
            ganho = aposta * 10;
            creditos += ganho;
        } else if (winningSymbol.includes("images/dragao.png")) {
            ganho = aposta * 2;
            creditos += ganho;
        } else if (winningSymbol.includes("images/dinheiro.png")) {
            ganho = aposta * 3;
            creditos += ganho;
        } else if (winningSymbol.includes("images/sorte.png")) {
            ganho = aposta * 0.8;
            creditos += ganho;
        }
        if (resultadoElement) resultadoElement.textContent = "";
        if (mensagemAnimada) mensagemAnimada.textContent = formatarMoeda(ganho);
        setTimeout(() => {
            mostrarImagemCombinacao(winningSymbol, ganho);
        }, 1500);
    } else {
        creditos -= aposta;
        if (resultadoElement) resultadoElement.textContent = "";
        if (mensagemAnimada) mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
    }

    if (creditosElement) creditosElement.textContent = formatarMoeda(creditos);
}

function exibirMatriz(resultadoSimbolos) {
    const matrizTexto = resultadoSimbolos.map(linha => 
        linha.map(img => img.src.split('/').pop()).join(' | ')
    ).join('\n');
    const matrizCombinacao = document.getElementById('matrizCombinacao');
    if (matrizCombinacao) matrizCombinacao.value = matrizTexto;
}

function piscarCombinacao(resultadoSimbolos, posicoesAleatorias) {
    let tipo = null;
    let indice = null;

    for (let i = 0; i < simbolosVisiveis; i++) {
        if (
            resultadoSimbolos[i][0].src === resultadoSimbolos[i][1].src &&
            resultadoSimbolos[i][1].src === resultadoSimbolos[i][2].src
        ) {
            tipo = 'horizontal';
            indice = i;
            break;
        }
    }

    if (!tipo) {
        for (let j = 0; j < simbolosVisiveis; j++) {
            if (
                resultadoSimbolos[0][j].src === resultadoSimbolos[1][j].src &&
                resultadoSimbolos[1][j].src === resultadoSimbolos[2][j].src
            ) {
                tipo = 'vertical';
                indice = j;
                break;
            }
        }
    }

    if (!tipo) {
        if (
            resultadoSimbolos[0][0].src === resultadoSimbolos[1][1].src &&
            resultadoSimbolos[1][1].src === resultadoSimbolos[2][2].src
        ) {
            tipo = 'diagonal-ltr';
        }
    }

    if (!tipo) {
        if (
            resultadoSimbolos[0][2].src === resultadoSimbolos[1][1].src &&
            resultadoSimbolos[1][1].src === resultadoSimbolos[2][0].src
        ) {
            tipo = 'diagonal-rtl';
        }
    }

    if (tipo === 'horizontal') {
        for (let j = 0; j < rolos.length; j++) {
            let el = rolos[j].children[posicoesAleatorias[j] + indice];
            el.classList.add('blink');
        }
    } else if (tipo === 'vertical') {
        for (let i = 0; i < simbolosVisiveis; i++) {
            let el = rolos[indice].children[posicoesAleatorias[indice] + i];
            el.classList.add('blink');
        }
    } else if (tipo === 'diagonal-ltr') {
        for (let i = 0; i < rolos.length; i++) {
            let el = rolos[i].children[posicoesAleatorias[i] + i];
            el.classList.add('blink');
        }
    } else if (tipo === 'diagonal-rtl') {
        for (let i = 0; i < rolos.length; i++) {
            let rowIndex = simbolosVisiveis - 1 - i;
            let el = rolos[i].children[posicoesAleatorias[i] + rowIndex];
            el.classList.add('blink');
        }
    }
}

function mostrarImagemCombinacao(symbolSrc, ganho) {
    const overlay = document.getElementById('overlayCombinacao');
    const imagemCombinacao = document.getElementById('imagemCombinacao');
    const ganhoTexto = document.getElementById('ganho-texto');

    if (overlay && imagemCombinacao && ganhoTexto) {
        imagemCombinacao.src = symbolSrc;
        ganhoTexto.textContent = formatarMoeda(ganho);
        overlay.style.display = 'flex';
        if (botaoGirar) botaoGirar.classList.add('disabled');

        setTimeout(() => {
            ganhoTexto.classList.add('fade-out');
            setTimeout(() => {
                ganhoTexto.textContent = "GERVÁSIO RIBEIRO";
                ganhoTexto.classList.remove('fade-out');
            }, 500);
        }, 1500);

        setTimeout(() => {
            overlay.style.display = 'none';
            ganhoTexto.textContent = '';
            if (mensagemAnimada) mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
            if (botaoGirar) {
                botaoGirar.classList.remove('disabled');
                botaoGirar.classList.add('girarDevagar');
            }
            if (girandoAutomaticamente && girosAutomaticos > 0) {
                setTimeout(girarRolos, 500);
            }
        }, 2000);

        const overlayClose = overlay.querySelector('.overlay-close');
        if (overlayClose) {
            overlayClose.onclick = function() {
                overlay.style.display = 'none';
                ganhoTexto.textContent = '';
                if (mensagemAnimada) mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
                if (botaoGirar) {
                    botaoGirar.classList.remove('disabled');
                    botaoGirar.classList.add('girarDevagar');
                }
                if (girandoAutomaticamente && girosAutomaticos > 0) {
                    setTimeout(girarRolos, 500);
                }
            };
        }
    }
}

// Funções para os novos botões (removido acaoAposta2, substituído por evento direto)