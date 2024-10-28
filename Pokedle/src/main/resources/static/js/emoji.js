const emojiCombinations = [
	{
		"name" : "pikachu",
		"emojis" : [
			" ⚡️ ", 
			" 🎶 ",
			" 🌟 ",
			" 🐭 "			
		]
	},
	
	{
		"name" : "mew",
		"emojis" : [
			" 🐾 ", 
			" ✨ ",
			" 👶 ",	
			" 🌌 "	
		]
	},
	{
		"name" : "corviknight",
		"emojis" : [
			" 🦅 ", 
			" ⚔️ ",
			" 🛡 ",	
			" 🗻 "	
		]
	},
	{
		"name" : "greninja",
		"emojis" : [
			" 🐱‍👤 ", 
			" ⚔️ ",
			" 💧 ",	
			" 🐸 "	
		]
	},
	{
		"name" : "lycanroc",
		"emojis" : [
			" ⚡️ ", 
			" 🏞 ",
			" 🌕 ",	
			" 🐺 "	
		]
	},
	{
		"name" : "cinderace",
		"emojis" : [
			" ⚽️ ", 
			" 🏆 ",
			" 🔥 ",	
			" 🐰 "	
		]
	},
	{
		"name" : "tinkaton",
		"emojis" : [
			" 🦅 ", 
			" 🔨 ",
			" ✨ ",	
			" 💖 "	
		]
	},
	{
		"name" : "gardevoir",
		"emojis" : [
			" 👗 ", 
			" 🔮 ",
			" ✨ ",	
			" 💖 "	
		]
	},
	{
		"name" : "incineroar",
		"emojis" : [
			" 🎭 ", 
			" 🔥 ",
			" 💪 ",	
			" 🐱 "	
		]
	},
	{
		"name" : "lucario",
		"emojis" : [
			" ⚔️ ", 
			" 🥋 ",
			" 🐺 ",	
			" 🔵 "	
		]
	}
];

const usedPokemon = [];

async function getTodaysPokemon(){
	const posiblePokemons = [25, 151, 823, 658, 745, 815, 959, 282, 727, 448];
	const selectedPoke = posiblePokemons[Math.floor(Math.random()*posiblePokemons.length)];
	
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + selectedPoke);
	const data = await response.json();
	
	return data;
}

async function fetchAllPokemon(){
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
	const data = await response.json();
	return data.results;
}

function filterPokemon(pokemonList, query){
	const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
	const excludedList = filteredList.filter(pokemon => usedPokemon.filter(uPokemon => uPokemon.name.toLowerCase() == pokemon.name.toLowerCase()).length == 0);
	
	return excludedList
}

function createPokemonElement(pokemon, todaysPokemon, mode){
	const div = document.createElement('div');
	switch(mode){
		case "win":
			div.className = 'w-auto flex items-center p-2 border-2 border-lime-700 bg-lime-300';
			console.log("ganaste");
			break;
		case "fail":
			div.className = 'w-auto flex items-center p-2 border-2 border-rose-500 bg-rose-300';
			console.log("fallo");
			break;
		case "option":
			div.className = 'flex items-center p-2 hover:bg-gray-100';
			div.onclick = async () => tryPokemon(pokemon, todaysPokemon);
			console.log("opcion");
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
	
	const todaysPokemon = await getTodaysPokemon();
	console.log(todaysPokemon);
	const todaysEmojis = emojiCombinations.filter(pokemon => pokemon.name == todaysPokemon.name)[0].emojis;
	
	const emojiBox = document.querySelector("#emojiBox");
		todaysEmojis.forEach(emoji => {
			const emojiSpan = document.createElement('span');
			emojiSpan.className = 'custom-font text-black text-4xl mx-2';
			emojiSpan.innerText = emoji;
			emojiBox.append(emojiSpan);
		});
	
	input.addEventListener('input', () => {
		const query = input.value;
		const filteredPokemon = filterPokemon(pokemonList, query);
		
		resultsContainer.innerHTML = '';
		if(query){
			resultsContainer.style.display = 'block';
			filteredPokemon.forEach(pokemon => {
						const pokemonElement = createPokemonElement(pokemon, todaysPokemon, "option");
						resultsContainer.appendChild(pokemonElement);
					});
		} else {
			resultsContainer.style.display = 'none';
		}
	});
	
	resultsContainer.style.display = 'none';
	historyContainer.style.display = 'none';
});

async function tryPokemon(pokemon, todaysPokemon){
	const historyContainer = document.querySelector('#history');
	const resultsContainer = document.querySelector('#results');
	const input = document.querySelector('#pokeName');
	
	historyContainer.style.display = 'block';
	resultsContainer.style.display = 'none'
	console.log("pokemonName: " + pokemon.name + " TodayName: " + todaysPokemon.species.name);
	
	if(pokemon.name.toLowerCase() == todaysPokemon.species.name.toLowerCase()){
		const pokemonElement = createPokemonElement(pokemon, todaysPokemon, "win");
		input.value = todaysPokemon.species.name;
		input.readOnly = true;
		historyContainer.prepend(pokemonElement);
	}
	else{
		input.value = '';
		usedPokemon.push(pokemon);
//		console.log(usedPokemon);
		const pokemonElement = createPokemonElement(pokemon, todaysPokemon, "fail");
		historyContainer.prepend(pokemonElement);
	}
}