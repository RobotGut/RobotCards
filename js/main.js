// main.js
import { inicializarModais } from './modais.js';
import { adicionarAoCarrinho, atualizarInterfaceCarrinho, obterCarrinho } from './carrinho.js';
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

    // 2. Sistema do Carrinho (Sincroniza do LocalStorage)
    atualizarInterfaceCarrinho();

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
                // Aqui você pode colocar o redirecionamento real caso queira:
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
    

    // 4. Atualização Dinâmica do Select de Gift Card
    const selectGift = document.getElementById("valor-gift");
    const btnCarrinhoMain = document.getElementById("btn-carrinho-main");

    if (selectGift && btnCarrinhoMain) {
        function atualizarBotaoCarrinho() {
            const opcaoSelecionada = selectGift.options[selectGift.selectedIndex];
            const valor = opcaoSelecionada.value;
            const preco = parseFloat(valor).toFixed(2);
            
            const saldoTexto = opcaoSelecionada.getAttribute("data-moedas") || `R$ ${valor}`;
            const tituloLimpo = document.title.replace("Gift Card", "").trim();
            const idAmigavel = tituloLimpo.toLowerCase().replace(/\s+/g, '_');

            const nomeProduto = `${tituloLimpo} ${saldoTexto}`;
            const idProduto = `${idAmigavel}_gift_${valor}`;

            btnCarrinhoMain.setAttribute("data-id", idProduto);
            btnCarrinhoMain.setAttribute("data-nome", nomeProduto);
            btnCarrinhoMain.setAttribute("data-preco", preco);
        }

        selectGift.addEventListener("change", atualizarBotaoCarrinho);
        atualizarBotaoCarrinho(); 
    }
});
