const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

   //destructure properties
   const { cityDets, weather } = data;

    //upadate details template
    details.innerHTML = `
            <h5 class="text-4xl uppercase  font-semibold mb-3">${cityDets.EnglishName}</h5>
            <div class="text-lg uppercase  font-semibold text-gray-300 mb-6">${weather.WeatherText}</div>
            <div class="my-3">
            <span class="uppercase text-5xl mb-6 ">${weather.Temperature.Metric.Value}</span>
            <span class="text-5xl font-thin mb-6">&deg;C</span>
            </div>
    `;

    // update the night/day & icon images
   

    let timeSrc = null;
    if (weather.IsDayTime){
        timeSrc = './img/day.svg';
    } else {
        timeSrc = './img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //remove class hidden if present
    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ul with new city 
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});