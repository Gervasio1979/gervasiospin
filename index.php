<?php
// index.php
// Arquivo principal da aplicação PHP para o jogo de slot machine
// Inclui o cabeçalho, corpo, e rodapé, além de carregar os estilos e scripts necessários

// Inicia a sessão (se necessário para funcionalidades futuras, como autenticação)
session_start();

// Inclui o cabeçalho comum
include_once 'includes/header.php';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Jogo do Palhaço - Slot Machine</title>
    <!-- Carrega o arquivo CSS externo -->
    <link rel="stylesheet" href="css/styles.css" type="text/css" />
</head>

<body>
    <div class="geral">
        <!-- Topo da página -->
        <div class="topo">
            <div class="box-topo"></div>
        </div>
        
        <!-- Seção da página com a slot machine -->
        <div class="pagina">
            <div class="pagina-esquerda"></div>
            <div class="pagina-meio">
                <div class="rolos-container">
                    <div class="rolo"><div class="simbolos" id="rolo1"></div></div>
                    <div class="rolo"><div class="simbolos" id="rolo2"></div></div>
                    <div class="rolo"><div class="simbolos" id="rolo3"></div></div>
                </div>
                <!-- Overlay para combinação vencedora -->
                <div id="overlayCombinacao" class="overlay">
                    <div class="overlay-content">
                        <span class="overlay-close">×</span>
                        <img id="imagemCombinacao" src="" alt="Combinação Vencedora">
                        <span id="ganho-texto" class="ganho-texto"></span>
                    </div>
                </div>
            </div>
            <div class="pagina-direita"></div>
        </div>
        
        <!-- Grade de rifa com mensagem inicial -->
        <div class="rifa-grid" id="rifa-grid">
            <h2 class="saldo-texto">
                <p id="resultado"></p>
                <span class="mensagem-animada">BEM-VINDO AO JOGO DO PALHAÇO</span>
            </h2>
        </div>
        
<!-- Sub-página com informações de créditos e aposta -->
<div class="sub-pagina">
    <div class="sub-pagina-esquerda">Créditos: <span id="creditos">R$20,00</span></div>
    <div class="sub-pagina-meio">Valor da aposta: <span id="valorAposta">R$1,00</span></div>
    <div class="sub-pagina-direita">Caixa: R$0,00</div>
</div>

<!-- Rodapé com controles do jogo -->
<!-- Rodapé com controles do jogo -->
<div class="rodape">
    <div class="rodape-esquerda" onclick="toggleTurbo()">
        <img src="images/turbo_icon.png" alt="Turbo" class="rodape-img">
    </div>
    <div class="rodape-aposta" onclick="mostrarModalPagamentos()">
        <img src="images/pagamentos_icon.png" alt="Tabela de Pagamentos" class="rodape-img">
    </div>
    <div class="rodape-meio">
        <img src="images/btngirar.png" onclick="girarRolos()" alt="Girar">
    </div>
    <div class="rodape-aposta2" id="btnAposta2">
        <img src="images/aposta2_icon.png" alt="Escolher Aposta" class="rodape-img">
    </div>
    <div class="rodape-direita" id="btnEscolherAposta">
        <img src="images/direita_icon.png" alt="Giros Automáticos" class="rodape-img">
    </div>
</div>

<!-- Modal de seleção de aposta -->
<?php include_once 'includes/modal_aposta.php'; ?>

<!-- Modal de Tabela de Pagamentos -->
<?php include_once 'includes/modal_pagamentos.php'; ?>

<!-- Modal de Giros Automáticos -->
<div id="modalGirosAutomaticos" class="modal">
    <div class="modal-content">
        <span class="close">×</span>
        <h2>Escolha a quantidade de giros automáticos</h2>
        <div class="opcoes-giros">
            <button class="opcao-giros" data-giros="2">2 Giros</button>
            <button class="opcao-giros" data-giros="3">3 Giros</button>
            <button class="opcao-giros" data-giros="4">4 Giros</button>
            <button class="opcao-giros" data-giros="5">5 Giros</button>
            <button class="opcao-giros" data-giros="6">6 Giros</button>
            <button class="opcao-giros" data-giros="7">7 Giros</button>
            <button class="opcao-giros" data-giros="8">8 Giros</button>
            <button class="opcao-giros" data-giros="9">9 Giros</button>
            <button class="opcao-giros" data-giros="10">10 Giros</button>
        </div>
    </div>
</div>

    <!-- Carrega o único arquivo JavaScript externo -->
    <script src="js/script.js"></script>
</body>

<?php
// Inclui o rodapé comum
include_once 'includes/footer.php';
?>

</html>