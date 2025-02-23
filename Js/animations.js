// JavaScript Document
// js/animations.js
// Arquivo JavaScript contendo funções e animações do jogo

function piscarCombinacao(resultadoSimbolos, posicoesAleatorias) {
    // Faz os símbolos vencedores piscarem
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
    // Mostra a imagem da combinação vencedora e o ganho
    const overlay = document.getElementById('overlayCombinacao');
    const imagemCombinacao = document.getElementById('imagemCombinacao');
    const ganhoTexto = document.getElementById('ganho-texto');
    const overlayClose = overlay.querySelector('.overlay-close');
    const botaoGirar = document.querySelector('.rodape-meio img');
    const mensagemAnimada = document.querySelector('.mensagem-animada');

    imagemCombinacao.src = symbolSrc;
    ganhoTexto.textContent = formatarMoeda(ganho);
    overlay.style.display = 'flex';
    botaoGirar.classList.add('disabled');

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
        mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
        botaoGirar.classList.remove('disabled');
    }, 2000);

    overlayClose.onclick = function() {
        overlay.style.display = 'none';
        ganhoTexto.textContent = '';
        mensagemAnimada.textContent = "BEM-VINDO AO JOGO DO PALHAÇO";
        ganhoTexto.classList.remove('fade-out');
        botaoGirar.classList.remove('disabled');
    };
}