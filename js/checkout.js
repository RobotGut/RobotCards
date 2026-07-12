// js/checkout.js
import { inicializarAutenticacao } from './auth.js';
import { inicializarNavegacao } from './navegacao.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Página de Checkout carregada!");

    // Carrega o menu e login se eles existirem na página de checkout também
    inicializarAutenticacao();
    inicializarNavegacao();

    // 1. Puxa os dados que foram colocados na outra página!
    const carrinho = JSON.parse(localStorage.getItem('meu_carrinho')) || [];

    // 2. Mapeia onde você quer injetar os dados na tela de checkout
    // (Ajuste esses IDs de acordo com o HTML da sua página "Carrinho de Compra.html")
    const listaProdutosCheckout = document.getElementById("produtos-checkout"); 
    const precoTotalCheckout = document.getElementById("total-checkout");
    const btnPagar = document.getElementById("btn-pagar");

    if (!listaProdutosCheckout) return;

    if (carrinho.length === 0) {
        listaProdutosCheckout.innerHTML = "<p style='padding: 20px;'>Seu carrinho está vazio.</p>";
        if (precoTotalCheckout) precoTotalCheckout.textContent = "R$ 0,00";
        return;
    }

    let totalGeral = 0;
    listaProdutosCheckout.innerHTML = "";

    // 3. Monta a lista completa na nova página
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "item-checkout-lista";
        itemDiv.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:10px; background:#f9f9f9; border-radius:5px;">
                <strong>${item.nome} (x${item.quantidade})</strong>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
        listaProdutosCheckout.appendChild(itemDiv);
    });

    if (precoTotalCheckout) {
        precoTotalCheckout.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    }

    // 4. Limpar o carrinho ao concluir o pedido
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            alert("Pedido recebido! Processando pagamento...");
            localStorage.removeItem('meu_carrinho'); // Limpa a memória
            window.location.href = "index.html"; // Volta para a home
        });
    }
});