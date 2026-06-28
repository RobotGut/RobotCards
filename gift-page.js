<<<<<<< HEAD
// 1. Array que vai guardar os itens do carrinho
let carrinho = [];

// 2. Seleção dos elementos do HTML que vamos manipular
const botoesAdicionar = document.querySelectorAll('.add-to-cart');
const listaCarrinho = document.getElementById('itens-carrinho'); // Agora aponta para o tbody
const elementoTotal = document.getElementById('valor-total');

// 3. Função para adicionar o produto ao array do carrinho
function adicionarAoCarrinho(evento) {
    const botao = evento.currentTarget; 
    
    const id = botao.getAttribute('data-id');
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        // Se já existe, apenas aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se não existe, adiciona um novo objeto ao array
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    // Atualiza a tela após modificar o array
    atualizarInterfaceCarrinho();
}

// 4. Função para atualizar o HTML do carrinho e recalcular o total
function atualizarInterfaceCarrinho() {
    // Limpa o carrinho antes de redesenhar
    listaCarrinho.innerHTML = '';

    // Se o carrinho estiver vazio, mostra a linha informativa correspondente
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

    // Percorre o array do carrinho e cria uma LINHA DE TABELA (tr) para cada item
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        valorTotalCarrinho += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>x${item.quantidade}</td>
            <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
        `;
        listaCarrinho.appendChild(tr);
    });

    // Atualiza o valor total na tela
    elementoTotal.textContent = valorTotalCarrinho.toFixed(2).replace('.', ',');
}

// 5. Executa as configurações assim que a página carregar
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script JavaScript carregado com sucesso!");

    // Adiciona o evento de clique em todos os botões "Adicionar ao Carrinho"
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script JavaScript carregado com sucesso!");

    /* ==========================================================================
       1. CONTROLE UNIVERSAL DOS MODAIS
=======
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CONTROLE UNIVERSAL DOS MODAIS (COMO RESGATAR)
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
       ========================================================================== */
    const botoesResgatar = document.querySelectorAll(".como-resgatar");
    const modais = document.querySelectorAll(".tutorial-modal-overlay");

<<<<<<< HEAD
=======
    // Configura o evento de clique para cada botão de resgate encontrado
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
    botoesResgatar.forEach(botao => {
        botao.addEventListener("click", () => {
            const targetId = botao.getAttribute("data-target");
            const modalTarget = document.getElementById(targetId);
            
            if (modalTarget) {
<<<<<<< HEAD
                modalTarget.classList.add("active");
=======
                modalTarget.classList.add("active"); // Abre o modal específico
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
                document.body.style.overflow = "hidden"; // Trava o scroll da página
            }
        });
    });

<<<<<<< HEAD
    modais.forEach(modal => {
        const btnFechar = modal.querySelector(".tutorial-close-btn");

=======
    // Configura o fechamento para todos os modais da página
    modais.forEach(modal => {
        const btnFechar = modal.querySelector(".tutorial-close-btn");

        // Fecha ao clicar no botão 'X'
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
        if (btnFechar) {
            btnFechar.addEventListener("click", () => fecharModal(modal));
        }

<<<<<<< HEAD
        // Fecha ao clicar fora do card (no fundo escuro)
=======
        // Fecha ao clicar do lado fora do card (no fundo escuro)
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharModal(modal);
            }
        });
    });

<<<<<<< HEAD
    function fecharModal(modalEspecifico) {
        if (!modalEspecifico) return;
        modalEspecifico.classList.remove("active");
        
        // Só libera o scroll se não houver mais nenhum modal aberto
=======
    // Função interna para fechar o modal
    function fecharModal(modalEspecifico) {
        modalEspecifico.classList.remove("active");
        
        // Só libera o scroll do corpo se não houver nenhum outro modal ativo na tela
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
        const algumModalAberto = Array.from(modais).some(m => m.classList.contains("active"));
        if (!algumModalAberto) {
            document.body.style.overflow = "";
        }
    }

    /* ==========================================================================
       2. SELEÇÃO DE VALORES (BOTÕES DE PREÇO)
       ========================================================================== */
    const containersPrecos = document.querySelectorAll(".prices");

    containersPrecos.forEach(container => {
        const botoesPreco = container.querySelectorAll("button");
        
        botoesPreco.forEach(botao => {
            botao.addEventListener("click", () => {
<<<<<<< HEAD
                botoesPreco.forEach(b => b.classList.remove("active"));
=======
                // Remove a classe ativa de todos os botões DESTE produto
                botoesPreco.forEach(b => b.classList.remove("active"));
                // Adiciona a classe ativa no botão clicado
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
                botao.classList.add("active");
            });
        });
    });

    /* ==========================================================================
       3. ANIMAÇÕES DE FEEDBACK (BOTÕES DE COMPRA E CARRINHO)
       ========================================================================== */
    const botoesAcao = document.querySelectorAll(".actions button");

    botoesAcao.forEach(botao => {
        botao.addEventListener("click", function() {
<<<<<<< HEAD
            // Efeito de clique físico
=======
            // Cria um leve efeito de clique físico (escala)
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 100);

<<<<<<< HEAD
            // Checkout
            if (this.classList.contains("buy")) {
                console.log("Redirecionando para o checkout...");
            }
            
            // Lógica do botão Carrinho com verificação de segurança contra cliques duplos
            if (this.classList.contains("cart") && !this.classList.contains("adicionado")) {
                this.classList.add("adicionado");
                const iconeOriginal = this.innerHTML;
                
                this.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
                this.style.backgroundColor = "#2ecc71"; // Verde temporário
                this.style.color = "#ffffff";
                
                setTimeout(() => {
                    this.innerHTML = iconeOriginal;
                    this.style.backgroundColor = ""; 
                    this.style.color = "";
                    this.classList.remove("adicionado");
=======
            // Se o botão for o de "Comprar Agora"
            if (this.classList.contains("buy")) {
                console.log("Redirecionando para o checkout...");
                // Aqui você pode adicionar a lógica de abrir o carrinho ou redirecionar
            }
            
            // Se o botão for o de "Carrinho"
            if (this.classList.contains("cart")) {
                const iconeOriginal = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
                this.style.backgroundColor = "#2ecc71"; // Muda para verde temporariamente
                
                setTimeout(() => {
                    this.innerHTML = iconeOriginal;
                    this.style.backgroundColor = ""; // Resgata a cor original do CSS
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
                }, 2000);
            }
        });
    });
});
<<<<<<< HEAD

 document.addEventListener("DOMContentLoaded", function() {
            const selectGift = document.getElementById("valor-gift");
            const btnCarrinho = document.getElementById("btn-carrinho-main");

            function atualizarBotaoCarrinho() {
                // Pega a opção selecionada atual
                const opcaoSelecionada = selectGift.options[selectGift.selectedIndex];
                
                const preco = parseFloat(opcaoSelecionada.value).toFixed(2);
                const qtdMoedas = opcaoSelecionada.getAttribute("data-moedas");
                
                // Monta o nome dinâmico ex: "Overwatch 500 Moedas"
                const nomeProduto = `Overwatch ${qtdMoedas} Moedas`;
                const idProduto = `ow_gift_${opcaoSelecionada.value}`;

                // Atualiza os atributos HTML do botão do carrinho
                btnCarrinho.setAttribute("data-id", idProduto);
                btnCarrinho.setAttribute("data-nome", nomeProduto);
                btnCarrinho.setAttribute("data-preco", preco);
            }

            // Monitora a mudança de opção no select
            selectGift.addEventListener("change", atualizarBotaoCarrinho);

            // Executa uma vez ao carregar a página para garantir o estado inicial correto (R$ 50)
            atualizarBotaoCarrinho();
        });
        
                document.addEventListener("DOMContentLoaded", function() {
            const selectGift = document.getElementById("valor-gift");
            const btnCarrinho = document.getElementById("btn-carrinho-main");

            function atualizarBotaoCarrinho() {
                const opcaoSelecionada = selectGift.options[selectGift.selectedIndex];
                
                const preco = parseFloat(opcaoSelecionada.value).toFixed(2);
                const saldoTexto = opcaoSelecionada.getAttribute("data-saldo");
                
                const nomeProduto = `Gift Card Xbox ${saldoTexto}`;
                const idProduto = `xbox_gift_${opcaoSelecionada.value}`;

                btnCarrinho.setAttribute("data-id", idProduto);
                btnCarrinho.setAttribute("data-nome", nomeProduto);
                btnCarrinho.setAttribute("data-preco", preco);
            }

            selectGift.addEventListener("change", atualizarBotaoCarrinho);
            atualizarBotaoCarrinho();
        });
=======
>>>>>>> 93a3f0b8286e09adf94c130b5c101d9c2c2fbb6b
