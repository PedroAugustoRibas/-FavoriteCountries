let tabCountries = null;
let tabFAvorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load',()=>{
    tabCountries = document.querySelector('#tabCountries');
    tabFAvorites = document.querySelector('#tabFavorites');

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
                flag: country.flag

        }
    });

    render();
}
 
function render(){
    renderCountryList();
    renderFavorite();
    renderSummary();
    renderCountryButtons();
}

function renderCountryList(){
    
}
function renderFavorite(){}
function renderSummary(){}
function renderCountryButtons(){}