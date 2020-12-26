const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container  = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '90b8793e';
const APP_KEY = 'bffac597d5cd9bb49160b6f6a53786e4';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=15`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data)
}

function generateHTML(results) {
    container.classList.remove('initial')
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}"> View Recipe</a>
            </div>
            <p class="item-data">Calaroies: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels.length : 'No Data Found'}</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}