function formatarMoeda(valor) {
    return "R$" + valor.toFixed(2).replace('.', ',');
}

let creditos = 20.00;
let turboAtivo = false;
let caixa = 0.00;
let caixaReserva = 150.00;
let girosAutomaticos = 0;
let girandoAutomaticamente = false;
let forcarSemVitoria = false;
let forcarGanho = false;
let forcarBonus = false;
let forcarBtngirar = false;
let totalApostado = 0.00;
let totalPago = 0.00;
let RTP_ALVO = 0.95;
let LIMITE_LUCRO_CASA = 0.05;
let girando = false;

// Variáveis para rastrear comportamento do jogador (RNC)
let historicoApostas = [];
let sequenciaPerdas = 0;
let sequenciaVitorias = 0;
let ultimaAposta = 0.00;

const matrizesSemVitoria = [
    [["images/btngirar.png", "images/dragao.png", "images/dinheiro.png"], ["images/sorte.png", "images/dinheiro.png", "images/btngirar.png"], ["images/dragao.png", "images/sorte.png", "images/dinheiro.png"]],
    [["images/dragao.png", "images/sorte.png", "images/btngirar.png"], ["images/dinheiro.png", "images/btngirar.png", "images/dragao.png"], ["images/sorte.png", "images/dinheiro.png", "images/sorte.png"]],
    [["images/sorte.png", "images/dinheiro.png", "images/dragao.png"], ["images/btngirar.png", "images/sorte.png", "images/dinheiro.png"], ["images/dragao.png", "images/btngirar.png", "images/sorte.png"]],
    [["images/dinheiro.png", "images/btngirar.png", "images/sorte.png"], ["images/dragao.png", "images/dinheiro.png", "images/sorte.png"], ["images/sorte.png", "images/dragao.png", "images/btngirar.png"]],
    [["images/btngirar.png", "images/sorte.png", "images/dinheiro.png"], ["images/dragao.png", "images/dinheiro.png", "images/sorte.png"], ["images/sorte.png", "images/btngirar.png", "images/dragao.png"]],
    [["images/dragao.png", "images/dinheiro.png", "images/sorte.png"], ["images/sorte.png", "images/btngirar.png", "images/dragao.png"], ["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"]],
    [["images/sorte.png", "images/btngirar.png", "images/dragao.png"], ["images/dinheiro.png", "images/dragao.png", "images/sorte.png"], ["images/btngirar.png", "images/dinheiro.png", "images/sorte.png"]],
    [["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"], ["images/dragao.png", "images/sorte.png", "images/dinheiro.png"], ["images/sorte.png", "images/btngirar.png", "images/dragao.png"]]
];

const matrizesGanho = [
    [["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/sorte.png", "images/btngirar.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"]],
    [["images/sorte.png", "images/dinheiro.png", "images/btngirar.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/btngirar.png", "images/sorte.png", "images/dinheiro.png"]],
    [["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"], ["images/sorte.png", "images/btngirar.png", "images/dinheiro.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"]],
    [["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/sorte.png", "images/btngirar.png", "images/dragao.png"], ["images/btngirar.png", "images/sorte.png", "images/dragao.png"]],
    [["images/sorte.png", "images/dinheiro.png", "images/btngirar.png"], ["images/dragao.png", "images/dinheiro.png", "images/sorte.png"], ["images/btngirar.png", "images/dinheiro.png", "images/dragao.png"]],
    [["images/dragao.png", "images/sorte.png", "images/sorte.png"], ["images/btngirar.png", "images/dinheiro.png", "images/sorte.png"], ["images/sorte.png", "images/dragao.png", "images/sorte.png"]],
    [["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/sorte.png", "images/dinheiro.png", "images/dragao.png"], ["images/dragao.png", "images/sorte.png", "images/dinheiro.png"]],
    [["images/sorte.png", "images/dragao.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"], ["images/dinheiro.png", "images/sorte.png", "images/dragao.png"]]
];

const matrizesBonus = [
    [["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"]],
    [["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"]],
    [["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"]],
    [["images/sorte.png", "images/sorte.png", "images/sorte.png"], ["images/sorte.png", "images/sorte.png", "images/sorte.png"], ["images/sorte.png", "images/sorte.png", "images/sorte.png"]],
    [["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"]],
    [["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"], ["images/dragao.png", "images/dragao.png", "images/dragao.png"]],
    [["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/dinheiro.png", "images/dinheiro.png"]],
    [["images/sorte.png", "images/sorte.png", "images/sorte.png"], ["images/sorte.png", "images/sorte.png", "images/sorte.png"], ["images/sorte.png", "images/sorte.png", "images/sorte.png"]]
];

const matrizesBtngirar = [
    [["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/dragao.png", "images/sorte.png", "images/dinheiro.png"], ["images/sorte.png", "images/dinheiro.png", "images/dragao.png"]],
    [["images/dragao.png", "images/sorte.png", "images/dinheiro.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"], ["images/sorte.png", "images/dinheiro.png", "images/dragao.png"]],
    [["images/dragao.png", "images/sorte.png", "images/dinheiro.png"], ["images/sorte.png", "images/dinheiro.png", "images/dragao.png"], ["images/btngirar.png", "images/btngirar.png", "images/btngirar.png"]],
    [["images/btngirar.png", "images/dragao.png", "images/sorte.png"], ["images/btngirar.png", "images/dinheiro.png", "images/sorte.png"], ["images/btngirar.png", "images/sorte.png", "images/dinheiro.png"]],
    [["images/dragao.png", "images/btngirar.png", "images/sorte.png"], ["images/sorte.png", "images/btngirar.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/btngirar.png", "images/dragao.png"]],
    [["images/dragao.png", "images/sorte.png", "images/btngirar.png"], ["images/sorte.png", "images/dinheiro.png", "images/btngirar.png"], ["images/dinheiro.png", "images/dragao.png", "images/btngirar.png"]],
    [["images/btngirar.png", "images/dragao.png", "images/sorte.png"], ["images/sorte.png", "images/btngirar.png", "images/dinheiro.png"], ["images/dinheiro.png", "images/sorte.png", "images/btngirar.png"]],
    [["images/dragao.png", "images/sorte.png", "images/btngirar.png"], ["images/sorte.png", "images/btngirar.png", "images/dinheiro.png"], ["images/btngirar.png", "images/dinheiro.png", "images/dragao.png"]]
];

const btnEscolherAposta = document.getElementById('btnEscolherAposta');
const btnAposta2 = document.getElementById('btnAposta2');
const btnForcarSemVitoria = document.getElementById('btnForcarSemVitoria');
const btnForcarGanho = document.getElementById('btnForcarGanho');
const btnForcarBonus = document.getElementById('btnForcarBonus');
const btnForcarBtngirar = document.getElementById('btnForcarBtngirar');
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
const caixaElement = document.getElementById('caixa');
const caixaReservaElement = document.getElementById('caixaReserva');
const totalApostadoElement = document.getElementById('totalApostado');
const totalPagoElement = document.getElementById('totalPago');
const rtpAtualElement = document.getElementById('rtpAtual');
const rtpAlvoInput = document.getElementById('rtpAlvo');
const limiteLucroCasaInput = document.getElementById('limiteLucroCasa');
const resultadoElement = document.getElementById('resultado');
const mensagemAnimada = document.querySelector('.mensagem-animada');
const botaoGirar = document.querySelector('.rodape-meio img');

const somFundo = new Audio('sounds/fundo.mp3');
const somRoleta = new Audio('sounds/roleta.mp3');
const somParar = new Audio('sounds/parar.mp3');

const simbolos = ["images/btngirar.png", "images/dragao.png", "images/dinheiro.png", "images/sorte.png"];
const rolos = document.querySelectorAll('.simbolos');
const alturaSimbolo = 195;
const simbolosVisiveis = 3;

let somFundoIniciado = false;

function tentarTocarSomFundo() {
    somFundo.loop = true;
    somFundo.play()
        .then(() => {
            somFundoIniciado = true;
            console.log("Som de fundo iniciado com sucesso.");
        })
        .catch(err => {
            console.log("Erro ao tocar som de fundo:", err);
            document.addEventListener('click', tocarSomFundoAposInteracao, { once: true });
        });
}

function tocarSomFundoAposInteracao() {
    if (!somFundoIniciado) {
        somFundo.play()
            .then(() => {
                somFundoIniciado = true;
                console.log("Som de fundo iniciado após interação.");
            })
            .catch(err => console.log("Erro ao tocar som após interação:", err));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (botaoGirar) {
        botaoGirar.classList.add('girarDevagar');
        botaoGirar.classList.remove('girarRapido');
    }
    tentarTocarSomFundo();
    preencherRolos();
    atualizarCaixa();

    rtpAlvoInput.addEventListener('change', () => {
        RTP_ALVO = parseFloat(rtpAlvoInput.value) / 100 || 0.95;
        ajustarRTP();
    });
    limiteLucroCasaInput.addEventListener('change', () => {
        LIMITE_LUCRO_CASA = parseFloat(limiteLucroCasaInput.value) / 100 || 0.05;
        ajustarRTP();
    });

    if (btnForcarSemVitoria) btnForcarSemVitoria.addEventListener('click', toggleForcarSemVitoria);
    if (btnForcarGanho) btnForcarGanho.addEventListener('click', toggleForcarGanho);
    if (btnForcarBonus) btnForcarBonus.addEventListener('click', toggleForcarBonus);
    if (btnForcarBtngirar) btnForcarBtngirar.addEventListener('click', toggleForcarBtngirar);
});

if (btnEscolherAposta) {
    btnEscolherAposta.addEventListener('click', function() {
        if (modalGirosAutomaticos) modalGirosAutomaticos.style.display = 'block';
    });
}

if (btnAposta2) {
    btnAposta2.addEventListener('click', function() {
        if (modalAposta) modalAposta.style.display = 'block';
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

function toggleForcarSemVitoria() {
    forcarSemVitoria = !forcarSemVitoria;
    forcarGanho = false;
    forcarBonus = false;
    forcarBtngirar = false;
    atualizarBotoesForcar();
    atualizarForcarSemVitoria();
}

function toggleForcarGanho() {
    forcarGanho = !forcarGanho;
    forcarSemVitoria = false;
    forcarBonus = false;
    forcarBtngirar = false;
    atualizarBotoesForcar();
}

function toggleForcarBonus() {
    forcarBonus = !forcarBonus;
    forcarSemVitoria = false;
    forcarGanho = false;
    forcarBtngirar = false;
    atualizarBotoesForcar();
}

function toggleForcarBtngirar() {
    forcarBtngirar = !forcarBtngirar;
    forcarSemVitoria = false;
    forcarGanho = false;
    forcarBonus = false;
    atualizarBotoesForcar();
}

function atualizarBotoesForcar() {
    if (btnForcarSemVitoria) btnForcarSemVitoria.classList.toggle('ativo', forcarSemVitoria);
    if (btnForcarGanho) btnForcarGanho.classList.toggle('ativo', forcarGanho);
    if (btnForcarBonus) btnForcarBonus.classList.toggle('ativo', forcarBonus);
    if (btnForcarBtngirar) btnForcarBtngirar.classList.toggle('ativo', forcarBtngirar);
}

function atualizarCaixa() {
    if (caixaElement) caixaElement.textContent = formatarMoeda(caixa);
    if (caixaReservaElement) caixaReservaElement.textContent = formatarMoeda(caixaReserva);
    if (totalApostadoElement) totalApostadoElement.textContent = formatarMoeda(totalApostado);
    if (totalPagoElement) totalPagoElement.textContent = formatarMoeda(totalPago);
    if (rtpAtualElement) rtpAtualElement.textContent = (calcularRTP() * 100).toFixed(2) + '%';
    atualizarForcarSemVitoria();
}

function atualizarForcarSemVitoria() {
    if (caixaReserva < 100.00 && !forcarGanho && !forcarBonus && !forcarBtngirar) {
        forcarSemVitoria = true;
    }
    atualizarBotoesForcar();
}

function calcularRTP() {
    if (totalApostado === 0) return 0;
    return totalPago / totalApostado;
}

function ajustarRTP(aposta) {
    const rtpAtual = calcularRTP();
    console.log(`RTP Atual: ${(rtpAtual * 100).toFixed(2)}%`);

    forcarSemVitoria = false;
    forcarGanho = false;
    forcarBonus = false;
    forcarBtngirar = false;

    if (caixaReserva < 100.00) {
        forcarSemVitoria = true;
    } else if (rtpAtual > RTP_ALVO + LIMITE_LUCRO_CASA) {
        forcarSemVitoria = true;
    } else if (rtpAtual < RTP_ALVO - LIMITE_LUCRO_CASA) {
        const escolha = Math.random() < 0.5 ? 'ganho' : 'btngirar';
        forcarGanho = escolha === 'ganho';
        forcarBtngirar = escolha === 'btngirar';
    } else {
        const ganhosBaixosFrequentes = historicoApostas.length > 3 && 
            historicoApostas.slice(-3).every(h => h.ganho > 0 && h.ganho < h.aposta * 2);
        const apostaAumentou = aposta > ultimaAposta * 1.5;
        if (ganhosBaixosFrequentes && apostaAumentou) {
            forcarSemVitoria = Math.random() < 0.8;
            forcarGanho = !forcarSemVitoria;
        } else if (aposta > 5.00) {
            forcarSemVitoria = Math.random() < 0.7;
            forcarGanho = !forcarSemVitoria;
        } else if (sequenciaPerdas >= 3) {
            forcarSemVitoria = false;
            forcarGanho = true;
        } else if (rtpAtual > 1.0 || sequenciaVitorias >= 3) {
            forcarSemVitoria = Math.random() < 0.9;
            forcarGanho = !forcarSemVitoria;
        } else {
            const escolha = Math.random();
            forcarSemVitoria = escolha < 0.6;
            forcarGanho = escolha >= 0.6 && escolha < 0.8;
            forcarBtngirar = escolha >= 0.8 && escolha < 0.95;
            forcarBonus = escolha >= 0.95;
        }
    }
    atualizarBotoesForcar();
}

function resetBlink() {
    document.querySelectorAll('.blink').forEach(el => el.classList.remove('blink'));
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

function aplicarMatriz(resultadoSimbolos, matrizes) {
    const matrizEscolhida = matrizes[Math.floor(Math.random() * matrizes.length)];
    for (let i = 0; i < simbolosVisiveis; i++) {
        for (let j = 0; j < rolos.length; j++) {
            resultadoSimbolos[i][j].src = matrizEscolhida[i][j];
        }
    }
}

function girarRolos() {
    if (girando) return;

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

    girando = true;
    totalApostado += aposta;
    ultimaAposta = aposta;

    const overlay = document.getElementById('overlayCombinacao');
    if (overlay) overlay.style.display = 'none';

    if (botaoGirar) {
        botaoGirar.classList.remove('girarDevagar');
        botaoGirar.classList.add('girarRapido');
        botaoGirar.disabled = true;
        somRoleta.play();
    }

    ajustarRTP(aposta);
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
                if (forcarSemVitoria) {
                    aplicarMatriz(resultadoSimbolos, matrizesSemVitoria);
                } else if (forcarGanho) {
                    aplicarMatriz(resultadoSimbolos, matrizesGanho);
                } else if (forcarBonus) {
                    aplicarMatriz(resultadoSimbolos, matrizesBonus);
                } else if (forcarBtngirar) {
                    aplicarMatriz(resultadoSimbolos, matrizesBtngirar);
                }

                const resultado = verificarVitoria(resultadoSimbolos);
                exibirMatriz(resultadoSimbolos);
                piscarCombinacao(resultadoSimbolos, posicoesAleatorias);

                historicoApostas.push({ aposta: aposta, ganho: resultado.ganho || 0 });
                if (resultado.vitoria) {
                    sequenciaVitorias++;
                    sequenciaPerdas = 0;
                } else {
                    sequenciaPerdas++;
                    sequenciaVitorias = 0;
                }

                if (botaoGirar) {
                    botaoGirar.classList.remove('girarRapido');
                    botaoGirar.classList.add('girarDevagar');
                    botaoGirar.disabled = false;
                }
                somRoleta.pause();
                somRoleta.currentTime = 0;
                somParar.play();
                girando = false;

                if (girandoAutomaticamente && girosAutomaticos > 0) {
                    girosAutomaticos--;
                    setTimeout(() => {
                        if (girosAutomaticos > 0 && girandoAutomaticamente) {
                            girarRolos();
                        } else {
                            girandoAutomaticamente = false;
                        }
                    }, tempoSpin + 1000);
                }
            }
        }, tempoSpin);
    });
}

function iniciarGirosAutomaticos() {
    if (girosAutomaticos > 0 && !girando && !girandoAutomaticamente) {
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
        } else if (winningSymbol.includes("images/dragao.png")) {
            ganho = aposta * 2;
        } else if (winningSymbol.includes("images/dinheiro.png")) {
            ganho = aposta * 3;
        } else if (winningSymbol.includes("images/sorte.png")) {
            ganho = aposta * 0.8;
        }

        if (caixaReserva >= ganho) {
            caixaReserva -= ganho;
            creditos += ganho;
            totalPago += ganho;
        } else {
            creditos += caixaReserva;
            totalPago += caixaReserva;
            caixaReserva = 0;
        }

        if (resultadoElement) resultadoElement.textContent = "";
        if (mensagemAnimada) mensagemAnimada.textContent = formatarMoeda(ganho);
        setTimeout(() => {
            mostrarImagemCombinacao(winningSymbol, ganho);
        }, 1500);
    } else {
        creditos -= aposta;
        const valorCaixa = aposta * 0.10;
        const valorReserva = aposta * 0.90;
        caixa += valorCaixa;
        caixaReserva += valorReserva;

        if (resultadoElement) resultadoElement.textContent = "";
        if (mensagemAnimada) mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
    }

    if (creditosElement) creditosElement.textContent = formatarMoeda(creditos);
    atualizarCaixa();

    return { vitoria, ganho };
}

function exibirMatriz(resultadoSimbolos) {
    const matrizTexto = resultadoSimbolos.map(linha => 
        linha.map(img => img.src.split('/').pop()).join(' | ')
    ).join('\n');
    const matrizCombinacao = document.getElementById('matrizCombinacao');
    if (matrizCombinacao) matrizCombinacao.value = matrizTexto;
}

function piscarCombinacao(resultadoSimbolos, posicoesAleatorias) {
    // Se forçar bônus, pisca todos os símbolos visíveis
    if (forcarBonus) {
        for (let i = 0; i < simbolosVisiveis; i++) {
            for (let j = 0; j < rolos.length; j++) {
                let el = rolos[j].children[posicoesAleatorias[j] + i];
                if (el) el.classList.add('blink');
            }
        }
        return;
    }

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
            if (el) el.classList.add('blink');
        }
    } else if (tipo === 'vertical') {
        for (let i = 0; i < simbolosVisiveis; i++) {
            let el = rolos[indice].children[posicoesAleatorias[indice] + i];
            if (el) el.classList.add('blink');
        }
    } else if (tipo === 'diagonal-ltr') {
        for (let i = 0; i < rolos.length; i++) {
            let el = rolos[i].children[posicoesAleatorias[i] + i];
            if (el) el.classList.add('blink');
        }
    } else if (tipo === 'diagonal-rtl') {
        for (let i = 0; i < rolos.length; i++) {
            let rowIndex = simbolosVisiveis - 1 - i;
            let el = rolos[i].children[posicoesAleatorias[i] + rowIndex];
            if (el) el.classList.add('blink');
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