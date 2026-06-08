document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SISTEMA DE SELEÇÃO DE PRODUTOS E BOTÃO DE COMPRA
    // ==========================================================================
    const produtos = [
        { nome: "Netflix R$ 150", preco: "149,99" },
        { nome: "Netflix R$ 250", preco: "249,99" },
        { nome: "Netflix R$ 120", preco: "119,99" },
        { nome: "Netflix R$ 100", preco: "99,99" },
        { nome: "Netflix R$ 90", preco: "89,99" },
        { nome: "Netflix R$ 70", preco: "69,99" }
    ];

    const container = document.getElementById("products");
    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const buyBtn = document.getElementById("buyBtn");

    let selecionado = produtos[0];

    // Só executa a geração de produtos se o container existir na página atual
    if (container) {
        produtos.forEach((p, index) => {
            const div = document.createElement("div");
            div.classList.add("card");
            if (index === 0) div.classList.add("active");

            div.innerHTML = `
                <img src="https://lojadosgifts.com.br/images/products/netflix-categoria-c6d0b91236b7f980.webp">
                <div>
                    <p>${p.nome}</p>
                    <span class="price">R$ ${p.preco}</span>
                </div>
            `;

            div.onclick = () => {
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                div.classList.add("active");

                selecionado = p;
                
                // Atualiza os textos se os elementos existirem na página
                if (productName) productName.innerText = p.nome;
                if (productPrice) productPrice.innerText = "R$ " + p.preco;
            };

            container.appendChild(div);
        });
    }

    // Ação do Botão Comprar (WhatsApp)
    if (buyBtn) {
        buyBtn.onclick = () => {
            // Substitua pelo seu número com DDD (Ex: 5511999999999)
            const numeroWhats = "SEUNUMERO"; 
            const msg = `Quero comprar ${selecionado.nome} por R$ ${selecionado.preco}`;
            window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(msg)}`);
        };
    }


    // ==========================================================================
    // 2. SISTEMA DE CONTROLE MODULAR DO MODAL DE TUTORIAL
    // ==========================================================================
    
    // Captura todos os botões de gatilho do tutorial na página (que usam a classe ou ID correto)
    const tutorialButtons = document.querySelectorAll('.resgatar, .btn-tutorial-trigger');

    tutorialButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Pega o ID do modal alvo através do atributo data-target
            const targetId = button.getAttribute('data-target');
            const modal = document.getElementById(targetId);

            if (modal) {
                openModal(modal);
            }
        });
    });

    // Função para abrir o Modal
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Remove o scroll do site ao fundo

        const closeBtn = modal.querySelector('.tutorial-close-btn');
        
        // Remove ouvintes antigos para evitar duplicações e fecha no botão X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal), { once: true });
        }

        // Fecha se o usuário clicar na área borrada de fora do card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    // Função para fechar o Modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura o scroll da página
    }

    // Atalho global: Pressionar 'ESC' fecha qualquer modal que esteja aberto
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.tutorial-modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
