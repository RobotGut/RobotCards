// modais.js

export function inicializarModais() {
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

        if (btnFechar) {
            btnFechar.addEventListener("click", () => fecharModal(modal, modais));
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharModal(modal, modais);
            }
        });
    });
}

function fecharModal(modalEspecifico, todosModais) {
    if (!modalEspecifico) return;
    modalEspecifico.classList.remove("active");
    
    const algumModalAberto = Array.from(todosModais).some(m => m.classList.contains("active"));
    if (!algumModalAberto) {
        document.body.style.overflow = "";
    }
}