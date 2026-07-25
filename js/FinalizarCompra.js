document.addEventListener("DOMContentLoaded", () => {
    // INICIALIZA O EMAILJS COM A SUA PUBLIC KEY
    emailjs.init("iuRQTaUbqt-8Us_Af");

    // ==========================================
    // 1. SISTEMA DE ABAS DE PAGAMENTO
    // ==========================================
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));

            option.classList.add('active');
            
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
    const carrinho = JSON.parse(localStorage.getItem('meu_carrinho')) || [];
    
    const listaItensCheckout = document.getElementById('checkout-items-list');
    const subtotalCheckout = document.getElementById('checkout-subtotal');
    const totalCheckout = document.getElementById('checkout-total');

    function renderizarResumo() {
        if (!listaItensCheckout) return;

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

        carrinho.forEach(item => {
            const subtotalItem = item.preco * item.quantidade;
            totalSoma += subtotalItem;

            const divItem = document.createElement('div');
            divItem.className = 'preview-item';
            divItem.innerHTML = `
                <span>${item.nome} <strong style="color: #767474;">x${item.quantidade}</strong></span>
                <strong>R$ ${subtotalItem.toFixed(2).replace('.', ',')}</strong>
            `;
            listaItensCheckout.appendChild(divItem);
        });

        const totalFormatado = `R$ ${totalSoma.toFixed(2).replace('.', ',')}`;
        if (subtotalCheckout) subtotalCheckout.textContent = totalFormatado;
        if (totalCheckout) totalCheckout.textContent = totalFormatado;
    }

    renderizarResumo();

    // ==========================================
    // 3. FINALIZAÇÃO DO PEDIDO E ENVIO DE E-MAIL
    // ==========================================
    const formCheckout = document.getElementById('checkout-form');
    
    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
                window.location.href = "index.html";
                return;
            }

            // Captura os dados do formulário preenchido pelo cliente
            const formData = new FormData(formCheckout);
            const dadosCliente = Object.fromEntries(formData.entries());

            // Formata a lista de produtos para o corpo do e-mail
            let resumoProdutos = "";
            let valorTotal = 0;
            carrinho.forEach(item => {
                let sub = item.preco * item.quantidade;
                valorTotal += sub;
                resumoProdutos += `- ${item.nome} (Qtd: ${item.quantidade}) - R$ ${sub.toFixed(2)}\n`;
            });

            // Parâmetros que serão enviados para o seu e-mail
            const templateParams = {
                to_email: "robot.lojas@gmail.com",
                cliente_nome: dadosCliente.nome || "Não informado",
                cliente_email: dadosCliente.email || "Não informado",
                cliente_telefone: dadosCliente.whatsapp || "Não informado",
                produtos: resumoProdutos,
                valor_total: `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
            };

            // Envio via EmailJS com tempo de espera seguro antes de sair da página
            emailjs.send('loja_gift_cards', 'template_4kcv3jm', templateParams)
                .then((response) => {
                    console.log('E-MAIL ENVIADO COM SUCESSO!', response.status, response.text);
                })
                .catch((error) => {
                    console.log('ERRO AO ENVIAR E-MAIL:', error);
                });

            alert("Pedido concluído com sucesso! E-mail enviado.");
            
            // Limpa o carrinho
            localStorage.removeItem('meu_carrinho');
            
            // Aguarda 1.5 segundos (1500 milissegundos) para garantir o envio e redireciona
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        });
    }
});