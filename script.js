const searchInput = document.getElementById('search-input'); // Obtém o campo de entrada de busca.
const resultArtist = document.getElementById("result-artist"); // Obtém o elemento para exibir os resultados de artistas.
const resultPlaylist = document.getElementById('result-playlists'); // Obtém o elemento para exibir as playlists.

/*
Versão 1: Código desenvolvido durante a aula com orientação dos professores.  
Exibe apenas um artista por vez, atualizando um único elemento de imagem e nome.  
Mantido no arquivo apenas para referência e estudo.  
*/

// // Função que faz a requisição à API com o termo de pesquisa.
// const requestApi = (searchTerm) => {
//     const url = `http://localhost:5000/artists?name_like=^${searchTerm}`; // Cria a URL da API com o termo de busca.
//     fetch(url) // Faz a requisição para a API.
//         .then((response) => response.json()) // Converte a resposta para JSON.
//         .then((result) => displayResults(result)); // Chama a função displayResults para mostrar os resultados.
// }

// // Função que exibe os resultados na página.
// const displayResults = (result) => {
//     resultPlaylist.classList.add("hidden"); // Oculta a seção de playlists.
//     const artistName = document.getElementById('artist-name'); // Obtém o elemento para mostrar o nome do artista.
//     const artistImage = document.getElementById('artist-img'); // Obtém o elemento para mostrar a imagem do artista.

//     result.forEach(element => { // Itera sobre os resultados da busca.
//         artistName.innerText = element.name; // Define o nome do artista.
//         artistImage.src = element.urlImg; // Define a imagem do artista.
//     });

//     resultArtist.classList.remove('hidden'); // Exibe a seção de resultados dos artistas.
// }

// document.addEventListener('input', () => { // Ouve o evento de entrada no campo de busca.
//     const searchTerm = searchInput.value.toLowerCase(); // Obtém o valor do campo de busca em minúsculas.
//     if (searchTerm === '') { // Verifica se o campo de busca está vazio.
//         resultPlaylist.classList.remove('hidden'); // Exibe a seção de playlists.
//         resultArtist.classList.add('hidden'); // Oculta a seção de artistas.
//         return;
//     }

//     requestApi(searchTerm); // Chama a função requestApi com o termo de busca.
// });




/*
Versão 2: Desafio da aula.  
Cria múltiplos cartões de artistas dinamicamente, exibindo-os em um grid e filtrando os resultados no JavaScript.
*/

const requestApi = (searchTerm) => {
    const url = `http://localhost:5000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

// Função que exibe os resultados na página.
const displayResults = (result, searchTerm) => {
    resultPlaylist.classList.add("hidden"); // Oculta a seção de playlists para exibir os artistas.
    const gridContainer = document.querySelector('.grid-container'); // Obtém o contêiner onde os artistas serão exibidos.
    gridContainer.innerHTML = ''; // Remove os resultados anteriores antes de adicionar novos.

    // Filtra os artistas cujo nome contém as letras digitadas pelo usuário, ignorando maiúsculas e minúsculas.
    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    // Para cada artista filtrado, cria um card e adiciona ao grid.
    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div'); // Cria um elemento div para representar o card do artista.
        artistCard.classList.add('artist-card'); // Adiciona uma classe para estilização.

        // Define o conteúdo HTML do card, incluindo imagem, botão de play e informações do artista.
        artistCard.innerHTML = `
          <div class="card-img">
              <img class="artist-img" src="${artist.urlImg}" />
              <div class="play">
                  <span class="fa fa-solid fa-play"></span>
              </div>
          </div>
          <div class="card-text">
              <span class="artist-name">${artist.name}</span>
              <span class="artist-categorie">Artista</span>
          </div>
      `;

        gridContainer.appendChild(artistCard); // Adiciona os cards dos artistas ao grid de exibição.
    });

    resultArtist.classList.remove('hidden'); // Exibe a seção de resultados dos artistas.
}

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Obtém o termo de pesquisa, convertido para minúsculas e sem espaços extras
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});