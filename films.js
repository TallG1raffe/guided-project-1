let nameH1;
let releasedSpan;
let directorSpan;
let episodeSpan;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  directorSpan = document.querySelector('span#director');
  releasedSpan = document.querySelector('span#released');
  episodeSpan = document.querySelector('span#episode');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacter(film)
    film.planets = await fetchPlanets(film)
  }
  catch (ex) {
    console.error(`Error reading films ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmsUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmsUrl)
    .then(res => res.json())
}

async function fetchCharacter(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  releasedSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
  const planetLis = film?.planets?.map(planet => `<li><a href="/planets.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetLis.join("");
}
