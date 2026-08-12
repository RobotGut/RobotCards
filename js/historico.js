// historico.js

document.addEventListener('DOMContentLoaded', () => {
    inicializarHistorico();
    inicializarNavegacao();
});

export function inicializarHistorico() {
    const selectFilter = document.getElementById('filter-status');
    const searchInput = document.getElementById('search-input');
    const historyContainer = document.getElementById('history-container');
    const allItems = Array.from(document.querySelectorAll('.history-item'));
    const paginationButtons = document.querySelectorAll('.pagination .page-btn');

    if (!allItems.length) return;

    // Configurações de Paginação
    const itemsPerPage = 3; // Quantidade de itens por página
    let currentPage = 1;
    let filteredItems = [...allItems];

    // Aplica filtros combinados (Texto + Status)
    function aplicarFiltros() {
        const statusValue = selectFilter ? selectFilter.value : 'all';
        const searchTerms = searchInput ? searchInput.value.toLowerCase().trim() : '';

        filteredItems = allItems.filter(item => {
            const matchesStatus = (statusValue === 'all') || item.classList.contains(`status-${statusValue}`);
            const itemText = item.textContent.toLowerCase();
            const matchesSearch = itemText.includes(searchTerms);

            return matchesStatus && matchesSearch;
        });

        currentPage = 1; // Reseta para a primeira página ao filtrar
        renderizar();
    }

    // Renderiza a lista exibindo apenas os itens da página atual
    function renderizar() {
        // Oculta todos os itens
        allItems.forEach(item => (item.style.display = 'none'));

        // Se nenhum item foi encontrado
        if (filteredItems.length === 0) {
            let emptyState = document.getElementById('empty-history-msg');
            if (!emptyState) {
                emptyState = document.createElement('p');
                emptyState.id = 'empty-history-msg';
                emptyState.style.textAlign = 'center';
                emptyState.style.padding = '20px 0';
                emptyState.textContent = 'Nenhuma atividade encontrada com os filtros aplicados.';
                historyContainer.appendChild(emptyState);
            } else {
                emptyState.style.display = 'block';
            }
        } else {
            const emptyState = document.getElementById('empty-history-msg');
            if (emptyState) emptyState.style.display = 'none';

            // Calcula intervalo de exibição
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const itemsToShow = filteredItems.slice(start, end);

            itemsToShow.forEach(item => {
                item.style.display = 'flex';
            });
        }

        atualizarPaginacao();
    }

    // Atualiza o estado visual dos botões da paginação
    function atualizarPaginacao() {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

        paginationButtons.forEach((btn, index) => {
            const isPrev = btn.querySelector('.fa-chevron-left');
            const isNext = btn.querySelector('.fa-chevron-right');

            if (isPrev) {
                btn.disabled = currentPage === 1;
                btn.classList.toggle('disabled', currentPage === 1);
            } else if (isNext) {
                btn.disabled = currentPage === totalPages;
                btn.classList.toggle('disabled', currentPage === totalPages);
            } else {
                // Botões numéricos (1, 2, 3)
                const pageNum = parseInt(btn.textContent.trim());
                if (!isNaN(pageNum)) {
                    btn.classList.toggle('active', pageNum === currentPage);
                    btn.disabled = pageNum > totalPages;
                    btn.classList.toggle('disabled', pageNum > totalPages);
                }
            }
        });
    }

    // Eventos dos Controles
    if (selectFilter) selectFilter.addEventListener('change', aplicarFiltros);
    if (searchInput) searchInput.addEventListener('input', aplicarFiltros);

    // Eventos da Paginação
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isPrev = btn.querySelector('.fa-chevron-left');
            const isNext = btn.querySelector('.fa-chevron-right');
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

            if (isPrev && currentPage > 1) {
                currentPage--;
            } else if (isNext && currentPage < totalPages) {
                currentPage++;
            } else if (!isPrev && !isNext) {
                const pageNum = parseInt(btn.textContent.trim());
                if (!isNaN(pageNum) && pageNum <= totalPages) {
                    currentPage = pageNum;
                }
            }

            renderizar();
        });
    });

    // Renderização Inicial
    renderizar();
}

// Suporte para o botão Menu e Ações Gerais da Header
function inicializarNavegacao() {
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert('Menu aberto'); // Insira o comportamento de toggle da sidebar/menu mobile aqui
        });
    }
}