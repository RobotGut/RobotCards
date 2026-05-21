
const btnEntrar = document.querySelector(".btn-login");
const btnCriarConta = document.querySelector(".btn-register");

const modal = document.getElementById("modalConta");
const fecharModal = document.getElementById("fecharModal");
const btnEnviar = document.getElementById("btnEnviar");

const tituloModal = document.querySelector(".modal-box h2");
const textoModal = document.querySelector(".modal-box p");

const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");



btnEntrar.addEventListener("click", () => {

    modal.classList.add("active");

    tituloModal.innerText = "Entrar";
    textoModal.innerText = "Faça login para acessar sua conta.";

    inputNome.style.display = "none";

    btnEnviar.innerText = "Entrar";
});



btnCriarConta.addEventListener("click", () => {

    modal.classList.add("active");

    tituloModal.innerText = "Criar Conta";
    textoModal.innerText = "Cadastre-se para comprar gift cards premium.";

    inputNome.style.display = "block";

    btnEnviar.innerText = "Criar Conta";
});



fecharModal.addEventListener("click", () => {
    modal.classList.remove("active");
});


modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("active");
    }

});

==================

btnEnviar.addEventListener("click", () => {

    const nome = inputNome.value;
    const email = inputEmail.value;
    const senha = inputSenha.value;


    if (btnEnviar.innerText === "Entrar") {

        if (email === "" || senha === "") {

            alert("Preencha todos os campos.");
            return;

        }

        
        if (email === "admin@robotcard.com" && senha === "123456") {

            alert("Login realizado com sucesso!");

            modal.classList.remove("active");

        } else {

            alert("E-mail ou senha incorretos.");

        }

    }

  
    else {

        if (nome === "" || email === "" || senha === "") {

            alert("Preencha todos os campos.");
            return;

        }

        alert("Conta criada com sucesso!");

        modal.classList.remove("active");

    }

});


function limparCampos() {

    inputNome.value = "";
    inputEmail.value = "";
    inputSenha.value = "";

}

fecharModal.addEventListener("click", limparCampos);
