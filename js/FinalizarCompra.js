document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. SISTEMA DE ABAS DE PAGAMENTO
    // ==========================================
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            // Remove classe ativa de todas as opções e abas
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));

            // Ativa a opção (botão) clicada
            option.classList.add('active');
            
            // Pega o valor (ex: 'pix', 'cartao') e ativa a aba correspondente
            const selectedValue = option.querySelector('input').value;
            const tabContent = document.getElementById(`tab-${selectedValue}`);
            
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. EXTRAÇÃO E EXIBIÇÃO DO CARRINHO
    // ==========================================
    
    // Puxa o carrinho do LocalStorage
    const carrinho = JSON.parse(localStorage.getItem('meu_carrinho')) || [];
    
    // Mapeia os elementos do Resumo da Compra na tela
    const listaItensCheckout = document.getElementById('checkout-items-list');
    const subtotalCheckout = document.getElementById('checkout-subtotal');
    const totalCheckout = document.getElementById('checkout-total');

    // Função para renderizar os itens
    function renderizarResumo() {
        if (!listaItensCheckout) return;

        // Limpa o conteúdo HTML base (aquele "RobotCard Pro x1" manual)
        listaItensCheckout.innerHTML = '';

        if (carrinho.length === 0) {
            listaItensCheckout.innerHTML = `
                <div class="preview-item">
                    <span style="color: #aaa;">Carrinho vazio</span>
                    <strong>R$ 0,00</strong>
                </div>
            `;
            if (subtotalCheckout) subtotalCheckout.textContent = "R$ 0,00";
            if (totalCheckout) totalCheckout.textContent = "R$ 0,00";
            return;
        }

        let totalSoma = 0;

        // Passa por cada item do carrinho e cria a linha no resumo
        carrinho.forEach(item => {
            const subtotalItem = item.preco * item.quantidade;
            totalSoma += subtotalItem;

            const divItem = document.createElement('div');
            divItem.className = 'preview-item';
            divItem.innerHTML = `
                <span>${item.nome} <strong style="color: #00ffcc;">x${item.quantidade}</strong></span>
                <strong>R$ ${subtotalItem.toFixed(2).replace('.', ',')}</strong>
            `;
            listaItensCheckout.appendChild(divItem);
        });

        // Atualiza os valores finais na tela
        const totalFormatado = `R$ ${totalSoma.toFixed(2).replace('.', ',')}`;
        if (subtotalCheckout) subtotalCheckout.textContent = totalFormatado;
        if (totalCheckout) totalCheckout.textContent = totalFormatado;
    }

    // Executa a função para montar o resumo assim que a página carrega
    renderizarResumo();

    // ==========================================
    // 3. FINALIZAÇÃO DO PEDIDO (BOTÃO CONCLUIR)
    // ==========================================
    const formCheckout = document.getElementById('checkout-form');
    
    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
                window.location.href = "index.html"; // Redireciona para a home
                return;
            }

            // Exemplo de conclusão com sucesso
            alert("Pedido concluído com sucesso! Verificando pagamento...");
            
            // Limpa o carrinho
            localStorage.removeItem('meu_carrinho');
            
            // Redireciona para uma página de sucesso ou para a home
            window.location.href = "index.html"; 
        });
    }
});