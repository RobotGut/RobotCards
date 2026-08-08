// Função interna para formatar/limpar o HTML e evitar ataques XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Exportamos a função principal para poder ser usada em outros arquivos
export function initReviews() {
    const starBtns = document.querySelectorAll('.star-btn');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    let selectedRating = 5;

    if (!reviewForm || !reviewsList) return;

    // Lógica para selecionar as estrelas interativamente
    starBtns.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.getAttribute('data-value'));
            updateStarInputs();
        });
    });

    function updateStarInputs() {
        starBtns.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));
            if (val <= selectedRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Submissão do Formulário de Avaliação
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('review-name').value;
        const comment = document.getElementById('review-comment').value;

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= selectedRating) {
                starsHtml += '<i class="fa-solid fa-star"></i> ';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i> ';
            }
        }

        const newCard = document.createElement('div');
        newCard.className = 'review-card';

        newCard.innerHTML = `
            <div class="review-header">
                <div class="user-info">
                    <span class="user-name">${escapeHTML(name)}</span>
                    <span class="verified-badge">
                        <i class="fa-solid fa-circle-check"></i> Compra Verificada
                    </span>
                </div>
                <span class="review-date">Agora mesmo</span>
            </div>
            <div class="stars-gold">${starsHtml}</div>
            <p class="review-text">${escapeHTML(comment)}</p>
        `;

        reviewsList.insertBefore(newCard, reviewsList.firstChild);

        reviewForm.reset();
        selectedRating = 5;
        updateStarInputs();

        alert('Obrigado pela sua avaliação!');
    });
}

// Inicializa automaticamente se o script for carregado diretamente
document.addEventListener('DOMContentLoaded', () => {
    initReviews();
});