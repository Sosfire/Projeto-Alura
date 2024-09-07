// Banco de dados local simulado com informações de filmes
const moviesData = [
  { 
    title: 'Um Sonho de Liberdade', 
    director: 'Frank Darabont', 
    year: 1994, 
    genre: 'Drama', 
    link: 'https://pt.wikipedia.org/wiki/The_Shawshank_Redemption', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/The_Shawshank_Redemption_p%C3%B4ster.png',
    synopsis: 'Um banqueiro é preso por um crime que não cometeu e encontra uma forma de superar as dificuldades da vida na prisão, enquanto planeja sua fuga.'
  },
  { 
    title: 'O Poderoso Chefão', 
    director: 'Francis Ford Coppola', 
    year: 1972, 
    genre: 'Crime, Drama', 
    link: 'https://pt.wikipedia.org/wiki/The_Godfather',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/de/Godfather_1972.jpg',
    synopsis: 'A história da família Corleone, um dos clãs mafiosos mais poderosos dos EUA, e a luta de Michael Corleone para se tornar o novo Don.'
  },
  // ... outros filmes
];

// Função para filtrar filmes com base na consulta de pesquisa
function filterMovies(query) {
  const lowerCaseQuery = query.toLowerCase();
  return moviesData.filter(movie =>
    movie.title.toLowerCase().includes(lowerCaseQuery) ||
    movie.director.toLowerCase().includes(lowerCaseQuery) ||
    movie.genre.toLowerCase().includes(lowerCaseQuery) ||
    movie.year.toString().includes(lowerCaseQuery)
  );
}

// Exibir os resultados da pesquisa
function displayResults(movies) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  movies.forEach(movie => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    resultItem.innerHTML = `
      <img src="${movie.imageUrl}" alt="${movie.title}">
      <div>
        <h3>${movie.title}</h3>
        <p>Diretor: ${movie.director}</p>
        <p>Ano: ${movie.year}</p>
        <p>Gênero: ${movie.genre}</p>
      </div>
    `;

    resultItem.addEventListener('click', () => openModal(movie));
    resultsContainer.appendChild(resultItem);
  });
}

// Event listener para clicar fora do campo de pesquisa
document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target)) {
    clearResults();
  }
});

// Limpar resultados quando clicar fora do campo de pesquisa
function clearResults() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
}

// Função para abrir o modal com as informações detalhadas do filme
function openModal(movie) {
  const modal = document.getElementById('movieModal');
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalDirector').textContent = `Diretor: ${movie.director}`;
  document.getElementById('modalYear').textContent = `Ano: ${movie.year}`;
  document.getElementById('modalGenre').textContent = `Gênero: ${movie.genre}`;
  document.getElementById('modalSynopsis').textContent = movie.synopsis;
  document.getElementById('modalImage').src = movie.imageUrl;
  document.getElementById('wikiLink').href = movie.link;

  modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById('movieModal');
  modal.style.display = 'none';
}

// Configurar evento de fechamento do modal
document.getElementById('closeBtn').addEventListener('click', closeModal);

// Fechar modal ao clicar fora da área do modal
window.addEventListener('click', (event) => {
  const modal = document.getElementById('movieModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Evento de pesquisa
document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value;
  const filteredMovies = filterMovies(query);
  displayResults(filteredMovies);
});

// Limpar a pesquisa e os resultados ao clicar fora do campo de pesquisa
window.addEventListener('click', (event) => {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');
  
  // Verifica se o clique foi fora da barra de pesquisa
  if (event.target !== searchInput && !searchInput.contains(event.target)) {
    searchInput.value = ''; // Limpa o valor do campo de pesquisa
    resultsContainer.innerHTML = ''; // Limpa os resultados exibidos
  }
});
