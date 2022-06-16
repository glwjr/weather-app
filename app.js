const searchInput = document.getElementById('search-input');
const submitButton = document.getElementById('submit-button');
const info = document.getElementById('info');

searchInput.addEventListener("keypress", (e) => {
  if (e.key === 'Enter' && searchInput.value !== '') {
    e.preventDefault();
    getTemp();
  } else {
    return
  }
})

submitButton.addEventListener('click', () => {
  if (searchInput.value !== '') {
    getTemp();
  } else {
    info.innerText = 'Please enter a city.'
  }
});

async function getTemp() {
  try {
    const city = searchInput.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10b9ebe2d11c581063a9ae5a0cb09f17&units=imperial`, {mode: 'cors'});
    const weatherData = await response.json();
    const temp = weatherData.main.temp
    info.innerText = `It is currently ${temp} degrees Fahrenheit in ${city}.`
  } catch (error) {
    info.innerText = `City not found. Please try a different entry.`
    clearInput();
  }
};

function clearInput() {
  searchInput.value = '';
}