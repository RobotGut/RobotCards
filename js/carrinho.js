// carrinho.js

// 1. Altere a inicialização do array para tentar pegar dados já salvos
let carrinho = JSON.parse(localStorage.getItem('meu_carrinho')) || [];

const listaCarrinho = document.getElementById('itens-carrinho');
const elementoTotal = document.getElementById('valor-total');

// Adicione essa nova função no final do arquivo para expor os dados para fora
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
            name: nome,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    // 2. SALVA NO LOCALSTORAGE SEMPRE QUE ADICIONAR
    localStorage.setItem('meu_carrinho', JSON.stringify(carrinho));

    atualizarInterfaceCarrinho();
}

// Altere a função para que possamos chamá-la de fora ao iniciar a página
export function atualizarInterfaceCarrinho() {
    if (!listaCarrinho || !elementoTotal) return;

    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <tr id="carrinho-vazio">
                <td colspan="3" style="text-align: center; padding: 15px; color: #777;">O carrinho está vazio.</td>
            </tr>
        `;
        elementoTotal.textContent = '0.00';
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