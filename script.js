const items = document.querySelectorAll('.item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Encontra o item ativo inicial
items.forEach((item, index) => {
    if (item.classList.contains('active')) {
        currentIndex = index;
    }
});

// A função que faz a mágica da transição
function updateCarousel() {
    // 1. Encontra o item que está visível atualmente
    const currentActiveItem = document.querySelector('.item.active');
    
    // 2. Se houver um item visível, inicia a transição de saída
    if (currentActiveItem) {
        // Adiciona a classe de saída para iniciar a animação de slide-down
        currentActiveItem.classList.add('is-leaving');
        // Remove a classe 'active' imediatamente (o CSS ainda anima)
        currentActiveItem.classList.remove('active'); 
        
        // Espera o tempo da animação (0.5s no CSS) para remover a classe 'is-leaving'
        currentActiveItem.addEventListener('transitionend', function handler() {
            currentActiveItem.classList.remove('is-leaving');
            // Remove o listener para que não se acumule
            currentActiveItem.removeEventListener('transitionend', handler);
        }, {once: true});
    }

    // 3. Adiciona a classe 'active' ao NOVO item (que está pronto para deslizar para cima)
    // O item novo já está na posição (currentIndex)
    items[currentIndex].classList.add('active');
}

// Manipulador do botão 'Próximo'
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
});

// Manipulador do botão 'Anterior'
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
});