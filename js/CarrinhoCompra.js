// carrinho.js

// Inicialização do array buscando dados já salvos
let carrinho = JSON.parse(localStorage.getItem('meu_carrinho')) || [];

// Elementos do Mini-Carrinho (Dropdown do Header)
const listaCarrinho = document.getElementById('itens-carrinho');
const elementoTotal = document.getElementById('valor-total');

// Elementos da Página Completa de Carrinho (Carrinho de Compra.html)
const containerCarrinhoCompleto = document.getElementById('cart-items-container');
const subtotalCompleto = document.getElementById('subtotal');
const totalCompleto = document.getElementById('total-price');

// Executa automaticamente ao carregar a página para atualizar as interfaces existentes
document.addEventListener('DOMContentLoaded', () => {
    atualizarInterfaces();
});

// Salva o estado atual do carrinho no LocalStorage e atualiza as telas
function salvarEAtualizar() {
    localStorage.setItem('meu_carrinho', JSON.stringify(carrinho));
    atualizarInterfaces();
}

// Reúne a atualização de todas as interfaces (Mini-Carrinho e Página Cheia)
export function atualizarInterfaces() {
    atualizarInterfaceMiniCarrinho();
    atualizarInterfaceCarrinhoCompleto();
}

// 1. MINI-CARRINHO (Dropdown no Header)
function atualizarInterfaceMiniCarrinho() {
    if (!listaCarrinho || !elementoTotal) return;

    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <tr id="carrinho-vazio">
                <td colspan="3" style="text-align: center; padding: 15px; color: #777;">O carrinho está vazio.</td>
            </tr>
        `;
        elementoTotal.textContent = '0,00';
        return;
    }

    let valorTotalCarrinho = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        valorTotalCarrinho += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td style="text-align: center;">x${item.quantidade}</td>
            <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
        `;
        listaCarrinho.appendChild(tr);
    });

    elementoTotal.textContent = valorTotalCarrinho.toFixed(2).replace('.', ',');
}

// 2. PAGINA COMPLETA DO CARRINHO (Carrinho de Compra.html)
function atualizarInterfaceCarrinhoCompleto() {
    if (!containerCarrinhoCompleto) return;

    containerCarrinhoCompleto.innerHTML = '';

    if (carrinho.length === 0) {
        containerCarrinhoCompleto.innerHTML = `
            <div class="carrinho-vazio-mensagem" style="text-align: center; padding: 40px; color: #777;">
                <i class="fa-solid fa-cart-flatbed" style="font-size: 48px; margin-bottom: 15px; color: #bbb;"></i>
                <p>Seu carrinho de compras está vazio.</p>
            </div>
        `;
        if (subtotalCompleto) subtotalCompleto.textContent = "R$ 0,00";
        if (totalCompleto) totalCompleto.textContent = "R$ 0,00";
        return;
    }

    let valorTotalAcumulado = 0;

    carrinho.forEach((item, index) => {
        const subtotalItem = item.preco * item.quantidade;
        valorTotalAcumulado += subtotalItem;

        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <img src="imgs/netflix.png" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <p class="item-category">Código Digital</p>
                </div>
                <div class="item-quantity">
                    <button class="btn-qty minus" data-index="${index}">-</button>
                    <span class="qty-number">${item.quantidade}</span>
                    <button class="btn-qty plus" data-index="${index}">+</button>
                </div>
                <div class="item-price">R$ ${subtotalItem.toFixed(2).replace('.', ',')}</div>
                <button class="btn-remove" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        containerCarrinhoCompleto.innerHTML += cartItemHTML;
    });

    const totalFormatado = `R$ ${valorTotalAcumulado.toFixed(2).replace('.', ',')}`;
    if (subtotalCompleto) subtotalCompleto.textContent = totalFormatado;
    if (totalCompleto) totalCompleto.textContent = totalFormatado;

    configurarEventosBotoes();
}

// Configura os cliques dos botões de + , - e lixeira da página do carrinho
function configurarEventosBotoes() {
    // Botões de Mais (+)
    document.querySelectorAll('.btn-qty.plus').forEach(botao => {
        botao.onclick = (e) => {
            const index = e.target.getAttribute('data-index');
            carrinho[index].quantidade += 1;
            salvarEAtualizar();
        };
    });

    // Botões de Menos (-)
    document.querySelectorAll('.btn-qty.minus').forEach(botao => {
        botao.onclick = (e) => {
            const index = e.target.getAttribute('data-index');
            carrinho[index].quantidade -= 1;
            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
            }
            salvarEAtualizar();
        };
    });

    // Botões de Remover (Lixeira)
    document.querySelectorAll('.btn-remove').forEach(botao => {
        botao.onclick = (e) => {
            const botaoLixeira = e.target.closest('.btn-remove');
            const index = botaoLixeira.getAttribute('data-index');
            carrinho.splice(index, 1);
            salvarEAtualizar();
        };
    });
}

// 3. FUNÇÕES DE EXPORTAÇÃO (Para páginas de produtos externos)
export function obterCarrinho() {
    return carrinho;
}

export function adicionarAoCarrinho(evento) {
    const botao = evento.currentTarget; 
    
    const id = botao.getAttribute('data-id');
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));

    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    salvarEAtualizar();
}