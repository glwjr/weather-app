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
      const cityPara = document.createElement('p');
      const tempPara = document.createElement('p');
      const descriptionPara = document.createElement('p');
      const feelsLikePara = document.createElement('p');
      const windPara = document.createElement('p');

      card.classList.add('card');
      cityPara.classList.add('city');
      tempPara.classList.add('temp');
      descriptionPara.classList.add('description');
      feelsLikePara.classList.add('feels-like');
      windPara.classList.add('wind');

      info.appendChild(card);
      card.appendChild(cityPara);
      card.appendChild(tempPara);
      card.appendChild(descriptionPara);
      card.appendChild(feelsLikePara);
      card.appendChild(windPara);

      cityPara.innerText = weather.name;
      tempPara.innerText = weather.temp + '\u00B0F';
      descriptionPara.innerText = weather.description;
      feelsLikePara.innerText = 'Feels like: ' + weather.feelsLike + '\u00B0F';
      windPara.innerText = 'Wind: ' + weather.wind + 'mph';
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