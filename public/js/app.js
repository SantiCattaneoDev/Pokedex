const pokemonContainer = document.querySelector('.pokemonContainer');
const spinner = document.querySelector('#spinner');
const back = document.querySelector('#back');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

back.addEventListener('click', () => {
    if ( offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit)
    }
});

next.addEventListener('click', () => {
    offset += 9;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit)
});

function fetchPokemon(id) { 
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    })
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for ( let i = offset; i <= offset + limit; i++ ) {
        fetchPokemon(i)
    }
}

function createPokemon(pokemon) {
    const flipCard = document.createElement('div')
    flipCard.classList.add('flipCard')

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('cardContainer')

    flipCard.appendChild(cardContainer)

    const card = document.createElement('div')
    card.classList.add('pokemonBlock')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('imgContainer')

    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite)

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3 , 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemonBlockBack')
    
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)

    pokemonContainer.appendChild(flipCard)
}

function progressBars(stats) {
    const statsContainer = document.createElement('div')
    statsContainer.classList.add('statsContainer')

    for ( let i = 0; i < 3; i++ ) {
        const stat = stats[i]

        const statPercent = stat.base_stat / 2 + "%"

        const statContainer = document.createElement('div')
        statContainer.classList.add('statContainer')

        const statName = document.createElement('div')
        statName.textContent = stat.stat.name
        
        const progress = document.createElement('div')
        progress.classList.add('progress')

        const progressBar = document.createElement('div')
        progressBar.classList.add('progressBar')
        progressBar.setAttribute('aria-valuenow', stat.base_stat)
        progressBar.setAttribute('aria-valuemin', 0)
        progressBar.setAttribute('aria-valuemax', 200)
        progressBar.style.width = statPercent
        progressBar.style.background = "blue"
        progressBar.style.color = "white"

        progressBar.textContent = stat.base_stat

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)
    }

    return statsContainer
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit)