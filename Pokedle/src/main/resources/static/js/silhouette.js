async function getTodaysPokemon(){
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/haxorus');
	const data = await response.json();
	
	return data;
}

async function fetchAllPokemon(){
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
	const data = await response.json();
	return data.results;
}

function filterPokemon(pokemonList, query){
	return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
}

function createPokemonElement(pokemon, mode){
	const div = document.createElement('div');
	switch(mode){
		case "win":
			div.className = 'flex items-center p-2 border-2 border-lime-400 bg-gray-100';
			break;
		case "fail":
			div.className = 'flex items-center p-2 border-2 border-rose-500 bg-gray-100';
			break;
		case "option":
			div.className = 'flex items-center p-2 hover:bg-gray-100';
			div.onclick = async () => tryPokemon(pokemon);
			break;
		default:
			
	}
	
	const img = document.createElement('img');
	img.className = 'w-10 h-10 mr-2';
	img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
	img.alt = `imagen de ${pokemon.name}`;
	
	const span = document.createElement('span');
    span.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
	
	div.appendChild(img);
    div.appendChild(span);

    return div;
}

document.addEventListener('DOMContentLoaded', async () => {
	const pokemonList = await fetchAllPokemon();
	const input = document.querySelector('#pokeName');
	const resultsContainer = document.querySelector('#results');
	const historyContainer = document.querySelector('#history');
	
	input.addEventListener('input', () => {
		const query = input.value;
		const filteredPokemon = filterPokemon(pokemonList, query);
		
		resultsContainer.innerHTML = '';
		if(query){
			resultsContainer.style.display = 'block';
			filteredPokemon.forEach(pokemon => {
						const pokemonElement = createPokemonElement(pokemon, "option");
						resultsContainer.appendChild(pokemonElement);
					});
		} else {
			resultsContainer.style.display = 'none';
		}
	});
	
	resultsContainer.style.display = 'none';
	historyContainer.style.display = 'none';
});

async function tryPokemon(pokemon){
	const todaysPokemon = await getTodaysPokemon();
	const historyContainer = document.querySelector('#history');
	const input = document.querySelector('#pokeName');
	
	historyContainer.style.display = 'block';
	input.value = '';
	console.log("pokemonName: " + pokemon.name + " TodayName: " + todaysPokemon.species.name);
	
	if(pokemon.name.toLowerCase() == todaysPokemon.species.name.toLowerCase()){
		const pokemonElement = createPokemonElement(pokemon, "win");
		historyContainer.prepend(pokemonElement);
	}
	else{
		const pokemonElement = createPokemonElement(pokemon, "fail");
		historyContainer.prepend(pokemonElement);
	}
}


//function changeColor(cell) {
//			const currentColor = cell.style.backgroundColor;
//			console.log(currentColor);
//			if (currentColor === 'yellow') {
//				cell.style.backgroundColor = 'green';
//			} else if (currentColor === 'green') {
//				cell.style.backgroundColor = "#31adff";
//			} else {
//				cell.style.backgroundColor = 'yellow';
//			}
//		}