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
  { 
    title: 'Clube da Luta', 
    director: 'David Fincher', 
    year: 1999, 
    genre: 'Drama', 
    link: 'https://pt.wikipedia.org/wiki/Fight_Club',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/2/2b/FightClubPoster.jpg',
    synopsis: 'Um homem insatisfeito com sua vida, cria um clube de luta secreto onde homens podem descontar sua frustração e raiva. Através desse clube, ele busca um sentido para sua existência, mas acaba se envolvendo em uma trama complexa e violenta.'
  },
  { 
    title: 'Batman: O Cavaleiro das Trevas', 
    director: 'Christopher Nolan', 
    year: 2008, 
    genre: 'Ação, Crime, Drama', 
    link: 'https://pt.wikipedia.org/wiki/The_Dark_Knight',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/d1/The_Dark_Knight.jpg',
    synopsis: 'Um homem-morcego, um promotor público e um anarquista se enfrentam em uma batalha épica por Gotham City. Batman, com a ajuda do promotor Harvey Dent, tenta limpar a cidade da corrupção. No entanto, o Coringa, um psicopata brilhante e caótico, surge para testar os limites de ambos e mergulhar Gotham em um caos sem precedentes.',        
  },
  { 
    title: 'Pulp Fiction: Tempo de Violência', 
    director: 'Quentin Tarantino', 
    year: 1994, 
    genre: 'Crime, Drama', 
    link: 'https://pt.wikipedia.org/wiki/Pulp_Fiction',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/8/82/Pulp_Fiction_cover.jpg',
    synopsis:'Várias histórias interligadas se desenrolam em um submundo de crime em Los Angeles. Assassinos, boxeadores e mafiosos se cruzam em narrativas não lineares, repletas de diálogos afiados, violência gráfica e um humor peculiar.'
  },
    { 
    title: 'A Origem', 
    director: 'Christopher Nolan', 
    year: 2010, 
    genre: 'Ação, Aventura, Ficção Científica', 
    link: 'https://pt.wikipedia.org/wiki/Inception',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg',
      synopsis:'Um ladrão especializado em roubar ideias penetra nos sonhos alheios para extrair seus segredos mais profundos. Dom Cobb e sua equipe embarcam em uma missão impossível: implantar uma ideia na mente de um empresário, alterando assim o curso de sua vida. Para isso, eles precisam adentrar o subconsciente do alvo, enfrentando perigos e desafios inimagináveis no mundo dos sonhos.'
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
