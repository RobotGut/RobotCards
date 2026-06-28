document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total-price");

    // Função para recalcular o total do carrinho
    function updateTotals() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll(".cart-item");

        cartItems.forEach(item => {
            const price = parseFloat(item.getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".qty-number").textContent);
            subtotal += price * quantity;
        });

        // Formata os valores para a moeda local (BRL)
        subtotalElement.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        totalElement.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Caso o carrinho fique vazio
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p style='text-align:center; padding: 20px; color: #7f8c8d;'>Seu carrinho está vazio.</p>";
        }
    }

    // Evento de clique para aumentar, diminuir quantidade ou remover item
    cartItemsContainer.addEventListener("click", (event) => {
        const target = event.target;
        const cartItem = target.closest(".cart-item");

        if (!cartItem) return;

        const qtyElement = cartItem.querySelector(".qty-number");
        let currentQty = parseInt(qtyElement.textContent);

        // Botão de Mais (+)
        if (target.classList.contains("plus")) {
            qtyElement.textContent = currentQty + 1;
            updateTotals();
        }

        // Botão de Menos (-)
        if (target.classList.contains("minus")) {
            if (currentQty > 1) {
                qtyElement.textContent = currentQty - 1;
                updateTotals();
            }
        }

        // Botão de Remover (Lixeira) - funciona clicando no botão ou no ícone de dentro
        if (target.classList.contains("btn-remove") || target.closest(".btn-remove")) {
            cartItem.style.opacity = "0";
            cartItem.style.transform = "scale(0.9)";
            cartItem.style.transition = "all 0.3s ease";
            
            // Espera a animação acabar para remover do HTML
            setTimeout(() => {
                cartItem.remove();
                updateTotals();
            }, 300);
        }
    });

    // Inicializa os valores na primeira carga da página
    updateTotals();
});




const botao = document.getElementById('btnModal');
const modal = document.getElementById('modalJS');

// Mostra o modal quando o mouse entra no botão
botao.addEventListener('mouseenter', () => {
  modal.classList.add('mostrar');
});

// Esconde o modal quando o mouse sai do botão
botao.addEventListener('mouseleave', () => {
  modal.classList.remove('mostrar');
});


function voltarPagina() {
        // Verifica se existe página anterior no histórico
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Caso não haja histórico, redireciona para uma página padrão
            window.location.href = "index.html";
        }
    }