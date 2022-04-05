let regionsArray
let citiesArray

fetch('https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json')
    .then(res => res.json())
    .then(json => {
        regionsArray = json[0].regions;
    for (let region of regionsArray) {
        const countryOption = document.createElement('option');
        const countrySelect = document.getElementById('countrySelect');
    countryOption.innerHTML = region["name"];
    countrySelect.appendChild(countryOption);
}

    document.querySelector('#countrySelect').addEventListener('change',(event) => {
        let optionRegion = event.target.value
        citySelect.length = 0
        regionsArray.forEach(reg => {
            if (reg.name === optionRegion){
                citiesArray = reg.cities
                getCityNames()
            }
        })
    })
})

function getCityNames(){
    for (let citiesName of citiesArray) {
        let cityOption = document.createElement('option');
        let citySelect = document.getElementById('citySelect');
        cityOption.innerHTML = citiesName['name'];
        citySelect.appendChild(cityOption);
        document.querySelector('#countrySelect').addEventListener('click', function () {
            let a =document.getElementById('nameOption')
            a.remove();
        })
    }
}

document.querySelector('#citySelect').addEventListener('change', function (){
    let cityNam = this.value
    let lat, lon
    async function getCitiByName(){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNam}&exclude=hourly&appid=7c219a3a9d67598fdeca2282d88817c7`);
        const firstDay = await response.json();
        document.querySelector('.name1').textContent = cityNam;
        document.querySelector('.temp').innerHTML = Math.round(firstDay.main.temp - 273) + '&deg;';
        lat = firstDay.coord.lat
        lon = firstDay.coord.lon
        getCityByCoord()
    }
    async function getCityByCoord(){
        const coordResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7c219a3a9d67598fdeca2282d88817c7`);
        const coordCityData = await coordResponse.json();
        for(let i = 2; i<=7;i++){
            document.querySelector(`.temp${i}`).innerHTML = Math.round(coordCityData.daily[i-1].temp.max - 273) + '&deg;';
        }
    }
    getCitiByName();
})