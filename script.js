// COMPRA

function comprar(produto, valor) {

    alert(`Você selecionou ${produto} no valor de R$ ${valor}`);

    const confirmacao = confirm("Deseja continuar para o pagamento?");

    if (confirmacao) {

        alert("Redirecionando para pagamento...");

    }

}

// MODAL

const btnAbrir = document.querySelector('.btn-register');

const modal = document.getElementById('modalConta');

const fecharModal = document.getElementById('fecharModal');

const btnEnviar = document.getElementById('btnEnviar');

// ABRIR MODAL

btnAbrir.addEventListener('click', () => {

    modal.classList.add('active');

});

// FECHAR MODAL

fecharModal.addEventListener('click', () => {

    modal.classList.remove('active');

});

// FECHAR AO CLICAR FORA

modal.addEventListener('click', (e) => {

    if(e.target === modal){

        modal.classList.remove('active');

    }

});

// CADASTRO

btnEnviar.addEventListener('click', () => {

    const nome = document.getElementById('nome').value.trim();

    const email = document.getElementById('email').value.trim();

    const senha = document.getElementById('senha').value.trim();

    if(!nome || !email || !senha){

        alert('Preencha todos os campos.');

        return;
    }

    alert(`Conta criada com sucesso!\nBem-vindo(a), ${nome}`);

    modal.classList.remove('active');

});
