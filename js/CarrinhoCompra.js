// Inicialização do array buscando dados salvos no LocalStorage
let carrinho = JSON.parse(localStorage.getItem("meu_carrinho")) || [];

// Referências de Elementos do DOM
const listaCarrinho = document.getElementById("itens-carrinho");
const elementoTotal = document.getElementById("valor-total");

const containerCarrinhoCompleto = document.getElementById("cart-items-container");
const subtotalCompleto = document.getElementById("subtotal");
const totalCompleto = document.getElementById("total-price");

// Inicialização automática ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarInterfaces();
});

// Salva o carrinho no LocalStorage e sincroniza as telas
function salvarEAtualizar() {
    localStorage.setItem("meu_carrinho", JSON.stringify(carrinho));
    atualizarInterfaces();
}

// Atualiza todas as exibições ativas na tela
export function atualizarInterfaces() {
    atualizarInterfaceMiniCarrinho();
    atualizarInterfaceCarrinhoCompleto();
}

// 1. MINI-CARRINHO (Header Dropdown)
function atualizarInterfaceMiniCarrinho() {
    if (!listaCarrinho || !elementoTotal) return;

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <tr id="carrinho-vazio">
                <td colspan="3" style="text-align: center; padding: 15px; color: #777;">O carrinho está vazio.</td>
            </tr>
        `;
        elementoTotal.textContent = "0,00";
        return;
    }

    let valorTotalCarrinho = 0;

    carrinho.forEach((item) => {
        const subtotal = item.preco * item.quantidade;
        valorTotalCarrinho += subtotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td style="text-align: center;">x${item.quantidade}</td>
            <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
        `;
        listaCarrinho.appendChild(tr);
    });

    elementoTotal.textContent = valorTotalCarrinho.toFixed(2).replace(".", ",");
}

// Formatação amigável para busca de imagens dos produtos
function formataNome(str) {
    if (!str) return "produto";

    const lowerStr = str.toLowerCase();

    if (lowerStr.includes("sea of thieves")) return "sea-of-thieves";
    if (lowerStr.includes("league of legends")) return "league-of-legends";
    if (lowerStr.includes("roblox")) return "roblox";
    if (lowerStr.includes("uber")) return "uber";

    const nome = str.match(/[a-zA-Z]{2,}/g);
    if (!nome) return "produto";

    return nome.length > 1 ? nome.join("-").toLowerCase() : nome.join("").toLowerCase();
}

// 2. PÁGINA PRINCIPAL DO CARRINHO
function atualizarInterfaceCarrinhoCompleto() {
    if (!containerCarrinhoCompleto) return;

    const btnCheckout = document.getElementById("btn-finalizar-compra");

    containerCarrinhoCompleto.innerHTML = "";

    // Tratamento quando o carrinho está vazio
    if (carrinho.length === 0) {
        containerCarrinhoCompleto.innerHTML = `
            <div class="carrinho-vazio-mensagem">
                <i class="fa-solid fa-cart-flatbed"></i>
                <p>Seu carrinho de compras está vazio.</p>
            </div>
        `;

        if (subtotalCompleto) subtotalCompleto.textContent = "R$ 0,00";
        if (totalCompleto) totalCompleto.textContent = "R$ 0,00";

        if (btnCheckout) {
            btnCheckout.classList.add("disabled");
        }

        configurarEventosBotoes();
        return;
    }

    // Quando existem itens no carrinho
    if (btnCheckout) {
        btnCheckout.classList.remove("disabled");
    }

    let valorTotalAcumulado = 0;

    carrinho.forEach((item, index) => {
        const subtotalItem = item.preco * item.quantidade;
        valorTotalAcumulado += subtotalItem;

        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <div class="img-info-group">
                    <img src="imgs/${formataNome(item.nome)}.png" alt="${item.nome}" onerror="this.src='imgs/icons/favicon.png'">
                    <div class="item-info">
                        <h3>${item.nome}</h3>
                        <p class="item-category">Código Digital</p>
                    </div>
                </div>

                <div class="item-group">
                    <div class="item-quantity">
                        <button class="btn-qty minus" data-index="${index}">-</button>
                        <span class="qty-number">${item.quantidade}</span>
                        <button class="btn-qty plus" data-index="${index}">+</button>
                    </div>

                    <div class="item-price">
                        R$ ${subtotalItem.toFixed(2).replace(".", ",")}
                    </div>

                    <button class="btn-remove" data-index="${index}" title="Remover item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        containerCarrinhoCompleto.innerHTML += cartItemHTML;
    });

    const totalFormatado = `R$ ${valorTotalAcumulado.toFixed(2).replace(".", ",")}`;

    if (subtotalCompleto) subtotalCompleto.textContent = totalFormatado;
    if (totalCompleto) totalCompleto.textContent = totalFormatado;

    configurarEventosBotoes();
}

// 3. AVISO CUSTOMIZADO (ESTILO MODAL/CARD)
export function exibirAvisoCustomizado(titulo, mensagem) {
    const avisoExistente = document.getElementById('custom-alert-box');
    if (avisoExistente) avisoExistente.remove();

    const alertBox = document.createElement('div');
    alertBox.id = 'custom-alert-box';
    alertBox.className = 'custom-alert-box';

    alertBox.innerHTML = `
        <div class="custom-alert-content">
            <i class="fa-solid fa-circle-exclamation custom-alert-icon"></i>
            <h3>${titulo}</h3>
            <p>${mensagem}</p>
            <button id="btn-fechar-aviso" class="custom-alert-btn">Entendido</button>
        </div>
    `;

    document.body.appendChild(alertBox);

    const fecharBtn = document.getElementById('btn-fechar-aviso');
    fecharBtn.onclick = () => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 250);
    };
}

// 4. VINÇULAÇÃO DE EVENTOS DE INTERAÇÃO
function configurarEventosBotoes() {
    const btnCheckout = document.getElementById("btn-finalizar-compra");
    if (btnCheckout) {
        btnCheckout.onclick = (e) => {
            e.preventDefault();
            if (carrinho.length > 0) {
                window.location.href = 'FinalizarCompra.html';
            } else {
                exibirAvisoCustomizado(
                    "Carrinho Vazio!",
                    "Adicione pelo menos um produto ao carrinho antes de prosseguir com a compra."
                );
            }
        };
    }

    document.querySelectorAll(".btn-qty.plus").forEach((botao) => {
        botao.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            carrinho[index].quantidade += 1;
            salvarEAtualizar();
        };
    });

    document.querySelectorAll(".btn-qty.minus").forEach((botao) => {
        botao.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            carrinho[index].quantidade -= 1;

            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
            }

            salvarEAtualizar();
        };
    });

    document.querySelectorAll(".btn-remove").forEach((botao) => {
        botao.onclick = (e) => {
            const botaoLixeira = e.target.closest(".btn-remove");
            const index = botaoLixeira.getAttribute("data-index");

            carrinho.splice(index, 1);
            salvarEAtualizar();
        };
    });
}

// Exportações do Carrinho
export function obterCarrinho() {
    return carrinho;
}

export function adicionarAoCarrinho(evento) {
    const botao = evento.currentTarget;

    const id = botao.dataset.id;
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);

    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            id,
            nome,
            preco,
            quantidade: 1
        });
    }

    salvarEAtualizar();
}