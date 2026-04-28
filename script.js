// Helper: error-safe fetch wrapper
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    return res.ok ? res : null;
  } catch {
    return null;
  }
}
// 1. Dog API
async function loadDog() {
  const res = await safeFetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  document.querySelector("#dog .output").src = data.message;
}

// 2. Cat API
async function loadCat() {
  const res = await safeFetch("https://api.thecatapi.com/v1/images/search");
  const data = await res.json();
  document.querySelector("#cat .output").src = data[0].url;
}
// 3. Weather API
async function loadWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=29.42&longitude=-98.49&current_weather=true";
  const res = await safeFetch(url);
  const data = await res.json();
  const { temperature } = data.current_weather;
  document.querySelector("#weather .output").textContent =
    `Current temperature: ${temperature}°C`;
}
// 4. Currency Exchange
async function loadCurrency() {
  const res = await safeFetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();
  document.querySelector("#currency .output").textContent =
    `1 USD = ${data.rates.EUR} EUR`;
}
// 5. TMDB Trending Movies
async function loadMovies() {
  const apiKey = "3b20ea2450c0ab53f25215318028cbf1";
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  const res = await safeFetch(url);
  const data = await res.json();

  const list = document.querySelector("#movies .output");
  list.innerHTML = "";

  data.results.slice(0, 5).forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    list.appendChild(li);
  });
}
// 6. GitHub API
async function loadGitHub() {
  const res = await safeFetch("https://api.github.com/users/octocat");
  const data = await res.json();

  document.querySelector("#github .avatar").src = data.avatar_url;
  document.querySelector("#github .output").textContent =
    `${data.name} — Followers: ${data.followers}`;
}

// 7. JokeAPI
async function loadJoke() {
  const res = await safeFetch("https://v2.jokeapi.dev/joke/Any?type=single");
  const data = await res.json();
  document.querySelector("#joke .output").textContent = data.joke;
}
// 8. Bible API
async function loadAnime() {
  const res = await safeFetch("https://bible-api.com/john%203:16");
  const data = await res.json();
  document.querySelector("#anime .output").textContent = 
  `"${data.text.trim()}" — ${data.reference}`;

}

// Load all on startup
loadDog();
loadCat();
loadWeather();
loadCurrency();
loadMovies();
loadGitHub();
loadJoke();
loadAnime();
