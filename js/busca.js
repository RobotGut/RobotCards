// busca.js

export function inicializarBusca() {
    const campoBusca = document.getElementById("busca-produtos");

    if (campoBusca) {
        campoBusca.addEventListener("input", () => {
            const texto = campoBusca.value.toLowerCase().trim();

            const cardsTodos = [];
            const inicioTodos = document.getElementById("Todos");

            if (inicioTodos) {
                let proximoElemento = inicioTodos.nextElementSibling;
                
                while (proximoElemento && !proximoElemento.classList.contains("categorias")) {
                    if (proximoElemento.classList.contains("card")) {
                        cardsTodos.push(proximoElemento);
                    }
                    proximoElemento = proximoElemento.nextElementSibling;
                }
            }

            cardsTodos.forEach(card => {
                const nome = card.querySelector(".brand")?.textContent.toLowerCase();

                if (nome && nome.includes(texto)) {
                    card.style.display = ""; 
                } else {
                    card.style.display = "none"; 
                }
            });
        });
    }
}