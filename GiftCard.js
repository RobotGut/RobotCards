function comprar(produto, valor) {
  alert(`Você selecionou ${produto} no valor de R$ ${valor}`);

  // Simulação de checkout
  const confirmacao = confirm("Deseja continuar para o pagamento?");

  if (confirmacao) {
    alert("Redirecionando para pagamento...");
    
    // Aqui você integraria com pagamento real
    // Ex: Mercado Pago, Stripe, Pix API
  }
}
    // Captura o botão e a seção de destino
    const btn = document.getElementById('btnDescer');
    const destino = document.getElementById('destino');

    btn.addEventListener('click', () => {
        // Faz a rolagem suave até o elemento
        destino.scrollIntoView({ behavior: 'smooth' });
    });