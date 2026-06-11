document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CONTROLE UNIVERSAL DOS MODAIS (COMO RESGATAR)
       ========================================================================== */
    const botoesResgatar = document.querySelectorAll(".como-resgatar");
    const modais = document.querySelectorAll(".tutorial-modal-overlay");

    // Configura o evento de clique para cada botão de resgate encontrado
    botoesResgatar.forEach(botao => {
        botao.addEventListener("click", () => {
            const targetId = botao.getAttribute("data-target");
            const modalTarget = document.getElementById(targetId);
            
            if (modalTarget) {
                modalTarget.classList.add("active"); // Abre o modal específico
                document.body.style.overflow = "hidden"; // Trava o scroll da página
            }
        });
    });

    // Configura o fechamento para todos os modais da página
    modais.forEach(modal => {
        const btnFechar = modal.querySelector(".tutorial-close-btn");

        // Fecha ao clicar no botão 'X'
        if (btnFechar) {
            btnFechar.addEventListener("click", () => fecharModal(modal));
        }

        // Fecha ao clicar do lado fora do card (no fundo escuro)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharModal(modal);
            }
        });
    });

    // Função interna para fechar o modal
    function fecharModal(modalEspecifico) {
        modalEspecifico.classList.remove("active");
        
        // Só libera o scroll do corpo se não houver nenhum outro modal ativo na tela
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
                // Remove a classe ativa de todos os botões DESTE produto
                botoesPreco.forEach(b => b.classList.remove("active"));
                // Adiciona a classe ativa no botão clicado
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
            // Cria um leve efeito de clique físico (escala)
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 100);

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
                }, 2000);
            }
        });
    });
});
