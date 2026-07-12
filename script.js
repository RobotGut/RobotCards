// MODAL DE CONTA

const inputNome = document.getElementById("nome");
const inputContainerNome = document.querySelector(".input-container:has(#nome)");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");

const inputsModal = document.querySelectorAll(".input-container input");

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

    fecharModal?.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("active");
        limparCampos();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            limparCampos();
        }
    });

    btnEnviar.addEventListener("click", (e) => {
        e.preventDefault();

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
                limparCampos();
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
            limparCampos();
        }
    });
}

function limparCampos() {
    if (inputNome) inputNome.value = "";
    if (inputEmail) inputEmail.value = "";
    if (inputSenha) inputSenha.value = "";

    inputsModal.forEach((input) => {
        input.classList.remove("focused");
    });
}


// MENU MOBILE

const sidebarOverlay = document.getElementById("sidebar-overlay");
const menuBtn = document.getElementById("menu-btn");

if (menuBtn && sidebarOverlay) {

    menuBtn.addEventListener("click", () => {
        sidebarOverlay.classList.toggle("show");
    });

    sidebarOverlay.addEventListener("click", (e) => {
        if (e.target === sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }
    });
}


// LINKS ATIVOS DO MENU

const sidebarNavLinks = document.querySelectorAll("#sidebar nav a");
let isNavigating = false;

sidebarNavLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        isNavigating = true;

        const active = document.querySelector("a.active");

        if (active) {
            active.classList.remove("active");
        }

        e.currentTarget.classList.add("active");

        setTimeout(() => {
            isNavigating = false;
        }, 500);
    });
});


const sections = document.querySelectorAll("#cards, #populares, #jogos, #servicos, #benefits, #support");

if (sections.length) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (isNavigating) return;

            if (entry.isIntersecting) {

                const active = document.querySelector("a.active");

                if (active) {
                    active.classList.remove("active");
                }

                const activeLink = document.querySelector(`#sidebar a[href="#${entry.target.id}"]`);

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}


// PESQUISA EXCLUSIVA DENTRO DA CATEGORIA #Todos

const campoBusca = document.getElementById("busca-produtos");

if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        const texto = campoBusca.value.toLowerCase().trim();

        // Lista para armazenar apenas os cards que pertencem à seção #Todos
        const cardsTodos = [];
        const inicioTodos = document.getElementById("Todos");

        if (inicioTodos) {
            let proximoElemento = inicioTodos.nextElementSibling;
            
            // Percorre os elementos irmãos até encontrar a próxima categoria (#populares)
            while (proximoElemento && !proximoElemento.classList.contains("categorias")) {
                if (proximoElemento.classList.contains("card")) {
                    cardsTodos.push(proximoElemento);
                }
                proximoElemento = proximoElemento.nextElementSibling;
            }
        }

        // Filtra apenas os cartões pertencentes à seção #Todos
        cardsTodos.forEach(card => {
            const nome = card.querySelector(".brand")?.textContent.toLowerCase();

            if (nome && nome.includes(texto)) {
                card.style.display = ""; // Mostra o card se bater com a pesquisa
            } else {
                card.style.display = "none"; // Oculta se não bater
            }
        });
    });
}