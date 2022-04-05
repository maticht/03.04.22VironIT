let regionsArray
let citiesArray

fetch('https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json')
    .then(res => res.json())
    .then(json => {
        regionsArray = json[0].regions;
        console.log(regionsArray)
    for (let region of regionsArray) {
        const countryOption = document.createElement('option');
        const countrySelect = document.getElementById('countrySelect');
    countryOption.innerHTML = region["name"];
    countrySelect.appendChild(countryOption);
}

    document.querySelector('#countrySelect').addEventListener('change', function(){
        let optionRegion = this.value
        citySelect.length = 0
        if(optionRegion === 'Брестская обл.'){
            citiesArray = regionsArray[0].cities
            console.log(citiesArray)
        }
        if(optionRegion === 'Витебская обл.'){
            citiesArray = regionsArray[1].cities
            console.log(citiesArray)
        }
        if(optionRegion === 'Гомельская обл.'){
            citiesArray = regionsArray[2].cities
            console.log(citiesArray)
        }
        if(optionRegion === 'Гродненская обл.'){
            citiesArray = regionsArray[3].cities
            console.log(citiesArray)
        }
        if(optionRegion === 'Минская обл.'){
            citiesArray = regionsArray[4].cities
            console.log(citiesArray)
        }
        if(optionRegion === 'Могилевская обл.'){
            citiesArray = regionsArray[5].cities
            console.log(citiesArray)
        }
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
    })
})

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

        async function getCityByCoord(){
            const coordResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7c219a3a9d67598fdeca2282d88817c7`);
            const coordCityData = await coordResponse.json();
            document.querySelector('.temp2').innerHTML = Math.round(coordCityData.daily[1].temp.max - 273) + '&deg;';
            document.querySelector('.temp3').innerHTML = Math.round(coordCityData.daily[2].temp.max - 273) + '&deg;';
            document.querySelector('.temp4').innerHTML = Math.round(coordCityData.daily[3].temp.max - 273) + '&deg;';
            document.querySelector('.temp5').innerHTML = Math.round(coordCityData.daily[4].temp.max - 273) + '&deg;';
            document.querySelector('.temp6').innerHTML = Math.round(coordCityData.daily[5].temp.max - 273) + '&deg;';
            document.querySelector('.temp7').innerHTML = Math.round(coordCityData.daily[6].temp.max - 273) + '&deg;';
            console.log(coordCityData)
        }
        getCityByCoord()
    }
    getCitiByName();
})