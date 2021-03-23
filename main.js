const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}
const card = document.getElementById('card')
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
const temp = document.getElementById('temp');

function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'img/temp-mid.png';
    if (temp > 26) {
      src = 'img/temp-high.png';
    } else if (temp < 20) {
      src = 'img/temp-low.png';
    }
    tempImg.src = src;
}


async function search(query){
 try{
     const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
     const data = await response.json();
     card.style.display = 'block';
     city.innerHTML = `${data.name}, ${data.sys.country}`;
     date.innerHTML = (new Date()).toLocaleDateString();
     temp.innerHTML = `${toCelsius(data.main.temp)}c`;
     weather.innerHTML = data.weather[0].description;
     range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
     updateImages(data);



 }catch(err){
     console.log(err);
     alert('Hubo un error');
 }
}
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }


function onsubmit(event){
    event.preventDefault();
    search(searchbox.value);
}




const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit',onsubmit,true);
