// main.js
import { inicializarModais } from './modais.js';
// MUDANÇA AQUI: Trocado 'atualizarInterfaceCarrinho' por 'atualizarInterfaces'
import { adicionarAoCarrinho, atualizarInterfaces, obterCarrinho } from './CarrinhoCompra.js';
// NOVOS IMPORTS:
import { inicializarAutenticacao } from './auth.js';
import { inicializarNavegacao } from './navegacao.js';
import { inicializarBusca } from './busca.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script JavaScript carregado com sucesso!");

    // 1. Inicializações de Layout e Sistema
    inicializarModais();
    inicializarAutenticacao();
    inicializarNavegacao();
    inicializarBusca();

    // 2. Sistema do Carrinho (Sincroniza do LocalStorage para todas as telas)
    // MUDANÇA AQUI: Chama a função unificada da versão 2 do carrinho.js
    atualizarInterfaces();

    // Configura botões de adicionar ao carrinho
    const botoesAdicionar = document.querySelectorAll('.add-to-cart');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });

    // 3. Animações de Feedback de Botões
    const botoesAcao = document.querySelectorAll(".actions button");
    botoesAcao.forEach(botao => {
        botao.addEventListener("click", function() {
            this.style.transform = "scale(0.95)";
            setTimeout(() => { this.style.transform = ""; }, 100);

            // Se o botão for de compra imediata, redireciona o usuário para o Checkout
            if (this.classList.contains("buy")) {
                console.log("Redirecionando para o checkout...");
                // window.location.href = "checkout.html";
            }
            
            if (this.classList.contains("cart") && !this.classList.contains("adicionado")) {
                this.classList.add("adicionado");
                const iconeOriginal = this.innerHTML;
                
                this.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
                this.style.backgroundColor = "#2ecc71";
                this.style.color = "#ffffff";
                
                setTimeout(() => {
                    this.innerHTML = iconeOriginal;
                    this.style.backgroundColor = "";
                    this.style.color = "";
                    this.classList.remove("adicionado");
                }, 2000);
            }
        });
    });

    // 4. Atualização Dinâmica do Valor de Gift Card (Com Limite de R$ 25 a R$ 500)
    const selectGift = document.getElementById("valor-gift");
    const btnCarrinhoMain = document.getElementById("btn-carrinho-main");

    if (selectGift && btnCarrinhoMain) {
        // Criação dinâmica do campo de input personalizado (com min=25 e max=500)
        let grupoPersonalizado = document.getElementById("grupo-personalizado");
        if (!grupoPersonalizado) {
            grupoPersonalizado = document.createElement("div");
            grupoPersonalizado.id = "grupo-personalizado";
            grupoPersonalizado.style.display = "none";
            grupoPersonalizado.style.marginTop = "15px";
            grupoPersonalizado.innerHTML = `
                <label for="valor-personalizado" style="font-size: 14px; font-weight: 500; display: block; margin-bottom: 5px;">Digite um valor (Entre R$ 25 e R$ 500):</label>
                <input type="number" id="valor-personalizado" min="25" max="500" step="1" placeholder="Ex: 150" style="padding: 10px; width: 100%; border: 1px solid #ccc; border-radius: 8px; font-size: 16px;">
                <span id="erro-valor" style="color: #e74c3c; font-size: 12px; display: none; margin-top: 5px;">O valor deve estar entre R$ 25 e R$ 500.</span>
            `;
            selectGift.parentNode.appendChild(grupoPersonalizado);
        }

        const inputPersonalizado = document.getElementById("valor-personalizado");
        const avisoErro = document.getElementById("erro-valor");

        function atualizarBotaoCarrinho() {
            const opcaoSelecionada = selectGift.options[selectGift.selectedIndex];
            const tituloLimpo = document.title.replace("Gift Card", "").trim();
            const idAmigavel = tituloLimpo.toLowerCase().replace(/\s+/g, '_');

            let valorStr = opcaoSelecionada.value;
            let preco = 0;
            let saldoTexto = "";
            let idProduto = "";
            let nomeProduto = "";

            if (valorStr === "custom" || opcaoSelecionada.text.toLowerCase().includes("personalizado")) {
                grupoPersonalizado.style.display = "block";
                
                let valorCustom = parseFloat(inputPersonalizado.value) || 0;
                
                // Validação de limite (25 a 500)
                if (inputPersonalizado.value !== "" && (valorCustom < 25 || valorCustom > 500)) {
                    avisoErro.style.display = "block";
                    btnCarrinhoMain.style.opacity = "0.5";
                    btnCarrinhoMain.style.pointerEvents = "none"; // Bloqueia o botão se passar do limite
                } else {
                    avisoErro.style.display = "none";
                    btnCarrinhoMain.style.opacity = "1";
                    btnCarrinhoMain.style.pointerEvents = "auto";
                }

                preco = valorCustom.toFixed(2);
                saldoTexto = `- R$${valorCustom}`;
                nomeProduto = `${tituloLimpo} Personalizado (R$ ${preco})`;
                idProduto = `${idAmigavel}_gift_custom_${valorCustom}`;
            } else {
                grupoPersonalizado.style.display = "none";
                avisoErro.style.display = "none";
                btnCarrinhoMain.style.opacity = "1";
                btnCarrinhoMain.style.pointerEvents = "auto";
                
                preco = (Math.floor(parseFloat(valorStr)) + 0.99).toFixed(2);
                saldoTexto = opcaoSelecionada.getAttribute("data-moedas") || `R$ ${valorStr}`;
                nomeProduto = `${tituloLimpo} ${saldoTexto} `;
                idProduto = `${idAmigavel}_gift_${valorStr}`;
            }

            btnCarrinhoMain.setAttribute("data-id", idProduto);
            btnCarrinhoMain.setAttribute("data-nome", nomeProduto);
            btnCarrinhoMain.setAttribute("data-preco", preco);
        }

        const opcaoCustom = Array.from(selectGift.options).find(opt => opt.text.toLowerCase().includes("personalizado"));
        if (opcaoCustom) {
            opcaoCustom.value = "custom";
        }

        selectGift.addEventListener("change", atualizarBotaoCarrinho);
        inputPersonalizado.addEventListener("input", atualizarBotaoCarrinho);
        
        atualizarBotaoCarrinho(); 
    }
});