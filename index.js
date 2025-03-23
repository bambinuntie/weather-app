const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'faba6dfd83bf8d9860c6953783b2d5be';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'contents';
            error404.classList.add('fadeIn');
            return;
        }

        console.log(json);

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        temperature.innerHTML = json.main.temp + "°C"
        description.innerHTML = json.weather[0].description
        humidity.innerHTML = json.main.humidity
        wind.innerHTML = json.wind.speed + " KM/H"

        weatherBox.style.opacity = 1
        weatherDetails.style.opacity = 1
        weatherBox.style.scale = 1
        weatherDetails.style.scale = 1
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('FadeIn');
        container.style.height = '590px'


        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear copy.png';
                break;

            case 'Clouds':
                image.src = 'images/cloud copy.png';
                break;

            case 'Fog':
                image.src = 'images/mist copy.png';
                break;

            case 'Rain':
                image.src = 'images/rain copy.png';
                break;

            case 'Snow':
                image.src = 'images/snow copy.png';
                break;
        }

    })

})