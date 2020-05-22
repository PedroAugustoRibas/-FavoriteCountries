let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load',()=>{
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites');

    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');
    
    totalPopulationList = document.querySelector('#totalPopulation');
    totalPopulationFavorites =  document.querySelector('#totaPopulationFavorites');


    numberFormat = Intl.NumberFormat('pt-br');

    getCountries()

});

async function getCountries(){
    const data  = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await data.json();

    allCountries = json.map((country)=>{
        return{
                id:country.numericCode ,
                name:country.translations.pt,
                totalPopulation: country.population,
                formatedPopulation:FormatNumber(country.population),
                flag: country.flag

        }
    }).sort((a,b)=>{
        return a.name.localeCompare(b.name); 
    });


    render();
}
 
function render(){
    renderCountryList();
    renderFavorite();
    renderSummary();
}

function renderCountryList(){
    let countriesHtml = '<div>';
    allCountries.forEach((country)=>{
        const {id,name,totalPopulation,flag,formatedPopulation} = country;
        const countryHtml =`
            <div class='country'>
                <div> 
                    <a id="${id}" onclick ="addFavorite('${id}')" class="waves-effect waves-light btn">+</a>
                </div>
                <div> 
                    <img src="${flag}" alt="${name}">
                </div>
                <div> 
                    <ul>
                        <li>${name}</li>
                        <li>${formatedPopulation}</li>
                    <ul>
                </div>
            </div>
        `;
        countriesHtml +=countryHtml;
    });
    countriesHtml += '</div>';
    tabCountries.innerHTML = countriesHtml;
    renderSummary();
}


function renderFavorite(){
    let countriesFavoritesHtml = '<div>';
    
    favoriteCountries.forEach((country) =>{
        const {id,name,totalPopulation,flag,formatedPopulation} = country;
        const countryFavoriteHtml =`
            <div class='country'>
                <div> 
                    <a id="${id}" onclick ="removeFavorite('${id}')" class="waves-effect waves-light btn red darken 4">X</a>
                </div>
                <div> 
                    <img src="${flag}" alt="${name}">
                </div>
                <div> 
                    <ul>
                        <li>${name}</li>
                        <li>${formatedPopulation}</li>
                    <ul>
                </div>
            </div>
        `;
        countriesFavoritesHtml +=countryFavoriteHtml;
    });
    countriesFavoritesHtml +=  '</div>';
    tabFavorites.innerHTML = countriesFavoritesHtml;

}

function addFavorite(id){
    let newArrayCountry = [];
    allCountries.forEach((country)=>{        
         if(country.id === id){
            favoriteCountries.push(country)  ;
        }else{
            newArrayCountry.push(country);
        }
    });
    allCountries = newArrayCountry.sort((a,b)=>{
        return a.name.localeCompare(b.name); 
    });

    renderCountryList();
    renderFavorite(); 
}

function removeFavorite(id){
    let newFavoriteArrayCountry = [];
    favoriteCountries.forEach((country)=>{        
         if(country.id === id){
            allCountries.push(country)  ;
        }else{
            newFavoriteArrayCountry.push(country);
        }
    })
    favoriteCountries = newFavoriteArrayCountry.sort((a,b)=>{
        return a.name.localeCompare(b.name); 
    });

    renderCountryList();
    renderFavorite(); 
}

function renderSummary(){
        countCountries.textContent = allCountries.length;
        countFavorites.textContent = favoriteCountries.length;

        const mundialPopulation = allCountries.reduce((acc, curr)=>{
            return acc + curr.totalPopulation;
        },0);
        const mundialPopulationFavrite = favoriteCountries.reduce((acc, curr)=>{
            return acc + curr.totalPopulation;
        },0);
        
        
        totalPopulationList.textContent = FormatNumber(mundialPopulation);
        totalPopulationFavorites.textContent = FormatNumber(mundialPopulationFavrite);
}

function FormatNumber(number){
    return numberFormat.format(number);
}