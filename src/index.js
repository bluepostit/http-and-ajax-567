console.log("Hello from src/index.js!");

// 1. Basic event listening on a button
const button = document.querySelector('#click-me');
button.addEventListener('click', (event) => {
  console.log('click!');
  console.log(event);

  event.currentTarget.innerText = 'Please wait...';
  event.currentTarget.disabled = true;
});

// Short arrow function:
// const cube = x => x * x * x;



// 2. Fetch - GET

const API_KEY = "48727053";

const searchMovies = (keyword) => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const list = document.querySelector("#results");
      // Clear contents of list!
      list.innerHTML = '';
      data.Search.forEach((result) => {
        const movieHTML = `
          <li class="list-inline-item">
            <img src="${result.Poster}" alt="poster">
            <p>${result.Title}</p>
          </li>
        `;
        list.insertAdjacentHTML("beforeend", movieHTML);
      });
    });
};

// Setup the form to trigger a search!
const form = document.querySelector('#search-movies');
form.addEventListener('submit', (event) => {
  // Prevent regular behavior of a form submit
  event.preventDefault();
  const keyword = event.currentTarget.querySelector('input').value;
  searchMovies(keyword);
});


// 3. Fetch with POST

const searchAlgoliaPlaces = (event) => {
  // Get the text to search for
  const text = event.currentTarget.value;
  // Send AJAX request
  const url = "https://places-dsn.algolia.net/1/places/query";
  const body = { query: text };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then((data) => {
      // Display results
      console.log(data);
    });
};

const placeInput = document.querySelector('#place');
// OR:
// const placeInput = document.getElementById('place');

placeInput.addEventListener('keyup', searchAlgoliaPlaces);
