import { inicializarModais } from './modais.js';
import { adicionarAoCarrinho, atualizarInterfaces } from './CarrinhoCompra.js';
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

    // 2. Sistema do Carrinho
    atualizarInterfaces();

    const botoesAdicionar = document.querySelectorAll('.add-to-cart');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });

    // 3. Botão "Comprar Agora" (Adiciona ao carrinho e redireciona)
    const btnComprarAgora = document.getElementById("btn-comprar-agora");
    const btnCarrinhoMain = document.getElementById("btn-carrinho-main");

    if (btnComprarAgora && btnCarrinhoMain) {
        btnComprarAgora.addEventListener("click", (e) => {
            e.currentTarget.style.transform = "scale(0.95)";
            setTimeout(() => { e.currentTarget.style.transform = ""; }, 100);

            // Simula o clique no botão principal de carrinho para garantir dados atualizados
            btnCarrinhoMain.click();

            // Redireciona para a página do carrinho após adicionar
            setTimeout(() => {
                window.location.href = "../CarrinhoCompra.html";
            }, 150);
        });
    }

    // 4. Animações de Feedback do Botão Carrinho
    if (btnCarrinhoMain) {
        btnCarrinhoMain.addEventListener("click", function() {
            if (!this.classList.contains("adicionado")) {
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
    }

    // 5. Atualização Dinâmica do Valor de Gift Card
    const selectGift = document.getElementById("valor-gift");

    if (selectGift && btnCarrinhoMain) {
        let grupoPersonalizado = document.getElementById("grupo-personalizado");
        const inputPersonalizado = document.getElementById("valor-personalizado");
        const avisoErro = document.getElementById("erro-valor");

        function atualizarBotaoCarrinho() {
            const opcaoSelecionada = selectGift.options[selectGift.selectedIndex];
            
            // Remove estritamente qualquer ponto (.) do título
            const tituloLimpo = document.title.replace("Gift Card", "").replace(/\./g, "").trim();
            const idAmigavel = tituloLimpo.toLowerCase().replace(/\s+/g, '_');

            let valorStr = opcaoSelecionada.value;
            let preco = 0;
            let saldoTexto = "";
            let idProduto = "";
            let nomeProduto = "";

            if (valorStr === "custom" || opcaoSelecionada.text.toLowerCase().includes("personalizado")) {
                if (grupoPersonalizado) grupoPersonalizado.style.display = "block";
                
                let valorCustom = parseInt(inputPersonalizado.value) || 0;
                
                if (inputPersonalizado.value !== "" && (valorCustom < 25 || valorCustom > 500)) {
                    if (avisoErro) avisoErro.style.display = "block";
                    btnCarrinhoMain.style.opacity = "0.5";
                    btnCarrinhoMain.style.pointerEvents = "none";
                } else {
                    if (avisoErro) avisoErro.style.display = "none";
                    btnCarrinhoMain.style.opacity = "1";
                    btnCarrinhoMain.style.pointerEvents = "auto";
                }

                // Cálculo garantindo o .99 no final para o personalizado
                let valorComDesconto = valorCustom * 0.80;
                let valorReduzido = Math.floor(valorComDesconto) - 1;
                if (valorReduzido < 0) valorReduzido = 0;
                preco = (valorReduzido + 0.99).toFixed(2);
                
                let valorInteiroCustom = Math.floor(valorCustom);
                saldoTexto = `- R$ ${valorInteiroCustom}`;
                
                nomeProduto = `${tituloLimpo} ${saldoTexto}`.replace(/\./g, "");
                idProduto = `${idAmigavel}_gift_custom_${valorCustom}`;
            } else {
                if (grupoPersonalizado) grupoPersonalizado.style.display = "none";
                if (avisoErro) avisoErro.style.display = "none";
                btnCarrinhoMain.style.opacity = "1";
                btnCarrinhoMain.style.pointerEvents = "auto";

                let brutoMoedas = opcaoSelecionada.getAttribute("data-moedas") || "";

                // VERIFICAÇÃO INTELIGENTE:
                // Se o data-moedas contiver "R$" (ex: "- R$ 5", "- R$ 15"), ele aplica o desconto de 20%.
                // Se o data-moedas for em moeda do jogo (ex: "800 Robux", "V-Bucks"), ele assume o value fixo direto.
                if (brutoMoedas.includes("R$")) {
                    let valorBase = parseFloat(brutoMoedas.replace(/[^0-9]/g, "")) || 0;
                    let valorComDesconto = valorBase * 0.80;
                    let valorReduzido = Math.floor(valorComDesconto) - 1;
                    if (valorReduzido < 0) valorReduzido = 0;
                    preco = (valorReduzido + 0.99).toFixed(2);
                } else {
                    // Para Roblox / Moedas virtuais: usa exatamente o preço informado no value (ex: 639,99)
                    preco = parseFloat(valorStr.replace(",", ".")).toFixed(2);
                }

                let saldoLimpo = brutoMoedas
                    .split(".")[0]
                    .replace(/\./g, "");

                if (!saldoLimpo.includes("-") && brutoMoedas.includes("R$")) {
                    saldoLimpo = `- ${saldoLimpo}`;
                }

                saldoTexto = saldoLimpo.trim();
                nomeProduto = `${tituloLimpo} ${saldoTexto}`.replace(/\./g, "");
                idProduto = `${idAmigavel}_gift_${valorStr.replace(",", "_")}`;
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
        if (inputPersonalizado) {
            inputPersonalizado.addEventListener("input", atualizarBotaoCarrinho);
        }
        
        atualizarBotaoCarrinho(); 
    }
});