// navegacao.js

export function inicializarNavegacao() {
    // ----------------------------------------------------
    // 1. MENU MOBILE (Abre e fecha a sidebar)
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // 2. LINKS ATIVOS DO MENU (Clique manual)
    // ----------------------------------------------------
    const sidebarNavLinks = document.querySelectorAll("#sidebar nav a");
    let isNavigating = false;

    sidebarNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            isNavigating = true;

            const active = document.querySelector("#sidebar a.active");
            if (active) {
                active.classList.remove("active");
            }

            e.currentTarget.classList.add("active");

            setTimeout(() => {
                isNavigating = false;
            }, 500);
        });
    });

    // ----------------------------------------------------
    // 3. INTERSECTION OBSERVER (Detecta Seção no Scroll para o Menu)
    // ----------------------------------------------------
    const sections = document.querySelectorAll("#cards, #populares, #jogos, #servicos, #benefits, #support");

    if (sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (isNavigating) return;

                if (entry.isIntersecting) {
                    const active = document.querySelector("#sidebar a.active");
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
            // Ajustado para 0.2 para funcionar bem mesmo em seções muito longas no mobile
            threshold: 0.2 
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // ----------------------------------------------------
    // 4. INTERSECTION OBSERVER (Animação Reveal que repete no Scroll)
    // ----------------------------------------------------
    const elementsToAnimate = document.querySelectorAll('.card, .benefit, .section-title');

    if (elementsToAnimate.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Quando o elemento ENTRA na tela: ativa a animação
                    entry.target.classList.add('active');
                } else {
                    // Quando o elemento SAI da tela: reseta a animação
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.15 // Dispara quando 15% do elemento estiver visível
        });

        elementsToAnimate.forEach((el) => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }
} // Fechamento da função que faltava