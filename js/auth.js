// auth.js

export function inicializarAutenticacao() {
    const inputNome = document.getElementById("nome");
    const inputContainerNome = document.querySelector(".input-container:has(#nome)");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("senha");
    const inputsModal = document.querySelectorAll(".input-container input");

    // Animação de foco nos inputs
    inputsModal.forEach((input) => {
        input.addEventListener("focus", () => {
            input.classList.add("focused");
        });

        input.addEventListener("blur", () => {
            if (input.value.length === 0) {
                input.classList.remove("focused");
            }
        });
    });

    const btnsEntrar = document.querySelectorAll(".btn-login");
    const btnsCriarConta = document.querySelectorAll(".btn-register");
    const modal = document.getElementById("modalConta");
    const fecharModal = document.getElementById("fecharModal");
    const btnEnviar = document.getElementById("btn-enviar");

    const tituloModal = document.querySelector(".modal-box h2");
    const textoModal = document.querySelector(".modal-box p");

    if (modal && btnEnviar) {
        // Configura modo "Entrar"
        btnsEntrar.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.classList.add("active");
                tituloModal.innerText = "Entrar";
                textoModal.innerText = "Faça login para acessar sua conta.";

                if (inputContainerNome) {
                    inputContainerNome.style.display = "none";
                }

                btnEnviar.innerText = "Entrar";
            });
        });

        // Configura modo "Criar Conta"
        btnsCriarConta.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.classList.add("active");
                tituloModal.innerText = "Criar Conta";
                textoModal.innerText = "Cadastre-se para comprar gift cards premium.";

                if (inputContainerNome) {
                    inputContainerNome.style.display = "block";
                }

                btnEnviar.innerText = "Criar Conta";
            });
        });

        // Fechar clicando no 'X'
        fecharModal?.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("active");
            limparCampos(inputNome, inputEmail, inputSenha, inputsModal);
        });

        // Fechar clicando no fundo escuro
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                limparCampos(inputNome, inputEmail, inputSenha, inputsModal);
            }
        });

        // Envio do formulário (Validação)
        btnEnviar.addEventListener("click", (e) => {
            e.preventDefault();

            const nome = inputNome ? inputNome.value : "";
            const email = inputEmail ? inputEmail.value : "";
            const senha = inputSenha ? inputSenha.value : "";

            if (btnEnviar.innerText === "Entrar") {
                if (email === "" || senha === "") {
                    alert("Preencha todos os campos.");
                    return;
                }

                if (email === "admin@robotcard.com" && senha === "123456") {
                    alert("Login realizado com sucesso!");
                    modal.classList.remove("active");
                    limparCampos(inputNome, inputEmail, inputSenha, inputsModal);
                } else {
                    alert("E-mail ou senha incorretos.");
                }
            } else {
                if (nome === "" || email === "" || senha === "") {
                    alert("Preencha todos os campos.");
                    return;
                }

                alert("Conta criada com sucesso!");
                modal.classList.remove("active");
                limparCampos(inputNome, inputEmail, inputSenha, inputsModal);
            }
        });
    }
}

function limparCampos(inputNome, inputEmail, inputSenha, inputsModal) {
    if (inputNome) inputNome.value = "";
    if (inputEmail) inputEmail.value = "";
    if (inputSenha) inputSenha.value = "";

    inputsModal.forEach((input) => {
        input.classList.remove("focused");
    });
}