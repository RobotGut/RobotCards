const inputNome = document.getElementById("nome");
const inputContainerNome = document.querySelector(
    ".input-container:has(#nome)",
);
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const inputsModal = document.querySelectorAll(".input-container input");

inputsModal.forEach((input) => {
    input.addEventListener("focus", (e) => {
        input.classList.add("focused");
    });

    input.addEventListener("blur", () => {
        if (input.value.length == 0) input.classList.remove("focused");
    });
});

const btnEntrar = document.querySelector(".btn-login");
const btnCriarConta = document.querySelector(".btn-register");
const modal = document.getElementById("modalConta");
const fecharModal = document.getElementById("fecharModal");
const btnEnviar = document.getElementById("btnEnviar");

const tituloModal = document.querySelector(".modal-box h2");
const textoModal = document.querySelector(".modal-box p");

btnEntrar.addEventListener("click", () => {
    modal.classList.add("active");

    tituloModal.innerText = "Entrar";
    textoModal.innerText = "Faça login para acessar sua conta.";

    inputContainerNome.style.display = "none";

    btnEnviar.innerText = "Entrar";
});

btnCriarConta.addEventListener("click", () => {
    modal.classList.add("active");

    tituloModal.innerText = "Criar Conta";
    textoModal.innerText = "Cadastre-se para comprar gift cards premium.";

    inputContainerNome.style.display = "block";

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
    } else {
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

    inputsModal.forEach((inp) => {
        inp.classList.remove("focused");
    });
}

fecharModal.addEventListener("click", limparCampos);

const sidebarOverlay = document.getElementById("sidebar-overlay");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
    sidebarOverlay.classList.toggle("show");
});

sidebarOverlay.addEventListener("click", (e) => {
    if (e.target == sidebarOverlay) sidebarOverlay.classList.remove("show");
});

const sidebarNavLinks = document.querySelectorAll("#sidebar nav a");

let isNavigating = false;

sidebarNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        isNavigating = true;
        const activeElem = document.querySelector("a.active");
        if (activeElem) activeElem.classList.remove("active");
        e.currentTarget.classList.add("active");

        setTimeout(() => (isNavigating = false), 500);
    });
});

const sections = document.querySelectorAll(
    "#cards, #populares, #jogos, #servicos, #benefits, #support",
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (isNavigating) return;
            if (entry.isIntersecting) {
                const activeElem = document.querySelector("a.active");
                if (activeElem) activeElem.classList.remove("active");

                const activeLink = document.querySelector(
                    `#sidebar a[href="#${entry.target.id}"]`,
                );
                activeLink.classList.add("active");
            }
        });
    },
    {
        threshold: 0.5,
    },
);

sections.forEach((section) => observer.observe(section));
