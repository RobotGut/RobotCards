// navegacao.js

export function inicializarNavegacao() {
    // 1. MENU MOBILE
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

    // 2. LINKS ATIVOS DO MENU
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

    // 3. INTERSECTION OBSERVER (Detectar Seção no Scroll)
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
}