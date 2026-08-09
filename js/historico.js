// historico.js
export function inicializarHistorico() {
    const selectFilter = document.getElementById('filter-status');
    const searchInput = document.getElementById('search-input');
    const historyItems = document.querySelectorAll('.history-item');

    // Se não estiver na página de histórico, para a execução sem dar erro
    if (!historyItems.length) return;

    function filtrarHistorico() {
        const statusValue = selectFilter ? selectFilter.value : 'all';
        const searchTerms = searchInput ? searchInput.value.toLowerCase().trim() : '';

        historyItems.forEach(item => {
            const matchesStatus = (statusValue === 'all') || item.classList.contains(`status-${statusValue}`);
            const itemText = item.textContent.toLowerCase();
            const matchesSearch = itemText.includes(searchTerms);

            if (matchesStatus && matchesSearch) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (selectFilter) selectFilter.addEventListener('change', filtrarHistorico);
    if (searchInput) searchInput.addEventListener('input', filtrarHistorico);
}