// js/main.js
// Arquivo JavaScript contendo as funções principais do jogo, como gerenciamento de créditos e rotação dos rolos

// Função para formatar valores como moeda brasileira
function formatarMoeda(valor) {
    return "R$" + valor.toFixed(2).replace('.', ',');
}

// Variáveis globais
let creditos = 20.00;
let turboAtivo = false;

const btnEscolherAposta = document.getElementById('btnEscolherAposta');
const valorApostaElement = document.getElementById('valorAposta');
const creditosElement = document.getElementById('creditos');
const resultadoElement = document.getElementById('resultado');
const mensagemAnimada = document.querySelector('.mensagem-animada');

const simbolos = ["images/btngirar.png", "images/dragao.png", "images/dinheiro.png", "images/sorte.png"];
const rolos = document.querySelectorAll('.simbolos');
const alturaSimbolo = 195;
const simbolosVisiveis = 3;

function toggleTurbo() {
    // Alterna o modo turbo
    turboAtivo = !turboAtivo;
    const rodapeEsquerda = document.querySelector('.rodape-esquerda');
    if (turboAtivo) {
        rodapeEsquerda.classList.add('turbo-ativo');
    } else {
        rodapeEsquerda.classList.remove('turbo-ativo');
    }
}

function resetBlink() {
    // Remove a classe de piscar de todos os elementos
    document.querySelectorAll('.blink').forEach(el => {
        el.classList.remove('blink');
    });
}

function preencherRolos() {
    // Preenche os rolos com símbolos aleatórios
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
    // Função para girar os rolos da slot machine
    const apostaTexto = valorApostaElement.textContent.replace('R$', '').replace(',', '.');
    const aposta = parseFloat(apostaTexto);
    if (creditos < aposta) {
        alert("Créditos insuficientes!");
        return;
    }

    const overlay = document.getElementById('overlayCombinacao');
    overlay.style.display = 'none';

    const botaoGirar = document.querySelector('.rodape-meio img');
    botaoGirar.classList.add('girarRapido');

    resetBlink();
    let resultadoSimbolos = [[], [], []];
    let posicoesAleatorias = [];

    const tempoSpin = turboAtivo ? 500 : 800;

    rolos.forEach((rolo, index) => {
        rolo.style.animation = 'none';
        void rolo.offsetWidth;
        rolo.style.animation = `rolar ${tempoSpin / 1000}s linear infinite`;

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
                botaoGirar.classList.remove('girarRapido');
            }
        }, tempoSpin);
    });
}

function verificarVitoria(resultadoSimbolos) {
    // Verifica se houve uma combinação vencedora e atualiza os créditos
    let vitoria = false;
    let winningSymbol = null;
    const apostaTexto = valorApostaElement.textContent.replace('R$', '').replace(',', '.');
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
        resultadoElement.textContent = "";
        mensagemAnimada.textContent = formatarMoeda(ganho);
        setTimeout(() => {
            mostrarImagemCombinacao(winningSymbol, ganho);
        }, 2000);
    } else {
        creditos -= aposta;
        resultadoElement.textContent = "";
        mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
    }

    creditosElement.textContent = formatarMoeda(creditos);
}

function exibirMatriz(resultadoSimbolos) {
    // Exibe a matriz de combinações no textarea
    const matrizTexto = resultadoSimbolos.map(linha => 
        linha.map(img => img.src.split('/').pop()).join(' | ')
    ).join('\n');
    document.getElementById('matrizCombinacao').value = matrizTexto;
}

// Chama a função para preencher os rolos ao carregar a página
preencherRolos();