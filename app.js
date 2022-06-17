const searchInput = document.getElementById('search-input');
const submitButton = document.getElementById('submit-button');
const info = document.getElementById('info');
const message = document.getElementById('message');

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && searchInput.value !== '') {
    e.preventDefault();
    clearContent();
    createCard();
    clearInput();
  } else if (e.key === 'Enter' && searchInput.value == '') {
    message.innerHTML = 'Please enter a city.';
  }
});

submitButton.addEventListener('click', () => {
  clearContent();

  if(searchInput.value !== '') {
    createCard();
    clearInput();
  } else if (searchInput.value == '') {
    message.innerHTML = 'Please enter a city.';
  }
});

async function getWeather() {
  try {
    const city = searchInput.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10b9ebe2d11c581063a9ae5a0cb09f17&units=imperial`, {mode: 'cors'});
    const weatherData = await response.json();
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].main;
    const feelsLike = weatherData.main.feels_like;
    const wind = weatherData.wind.speed;
    const name = weatherData.name;

    return {
      name, temp, description, feelsLike, wind
    };
  } catch (error) {
    message.innerHTML = 'Can\'t find city. Please try a different entry.';
  }
}

function createCard() {
  getWeather().then((weather) => {
    if(weather !== undefined) {
      const card = document.createElement('div');
      const cityDiv = document.createElement('div');
      const tempDiv = document.createElement('div');
      const descriptionDiv = document.createElement('div');
      const feelsLikeDiv = document.createElement('div');
      const windDiv = document.createElement('div');

      card.classList.add('card');
      cityDiv.classList.add('city');
      tempDiv.classList.add('temp');
      descriptionDiv.classList.add('description');
      feelsLikeDiv.classList.add('feels-like');
      windDiv.classList.add('wind');

      info.appendChild(card);
      card.appendChild(cityDiv);
      card.appendChild(tempDiv);
      card.appendChild(descriptionDiv);
      card.appendChild(feelsLikeDiv);
      card.appendChild(windDiv);

      cityDiv.innerText = weather.name;
      tempDiv.innerText = weather.temp + '\u00B0F';
      descriptionDiv.innerText = weather.description;
      feelsLikeDiv.innerText = 'Feels Like: ' + weather.feelsLike + '\u00B0F';
      windDiv.innerText = 'Wind: ' + weather.wind + 'mph';

    } else {
      return;
    }
  });
}

function clearInput() {
  searchInput.value = '';
}

function clearContent() {
  info.innerHTML = '';
  message.innerHTML = '';
}