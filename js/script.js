const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prv');
const buttonNext = document.querySelector('.btn-nxt');

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "..."
    pokemonNumber.innerHTML = "";
    
    const data = await fetchPokemon(pokemon);

    if (data) {
        growthAnimation();
        searchPokemon = data.id;
        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = '#' + padLeadingZeros(data.id, 3);
        if (data.id < 650) {
            pokemonImage.src = data['sprites']['front_default'];
        } else {
            pokemonImage.src = data['sprites']['front_default']
        }
        const timeOut = setTimeout(removePokeClass,400);
        
        
        console.log(data);
    } else {
        pokemonName.innerHTML = "Not Found..."
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = 'none';
    }
    
}

function removePokeClass() {

    pokemonImage.classList.remove('pokeFound');
}

function padLeadingZeros(num,size){
    var s = num+"";
    while (s.length < size) s = "0" + s + " - ";
    return s;
}

function growthAnimation(){

    pokemonImage.style.height = "25%";
    pokemonImage.style.width = "25%";
    pokemonImage.classList.toggle('pokeFound');
    console.log(pokemonImage.style.height);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = "";
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon = searchPokemon - 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon = searchPokemon + 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);