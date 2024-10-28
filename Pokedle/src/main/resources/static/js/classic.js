var tabla = document.getElementById("tbody");
const pokeSelect = Math.floor(Math.random()* 1024 + 1);
const usedPokemon = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function createPokemonElement(pokemon){
	const div = document.createElement('div');
	div.className = 'flex items-center p-2 hover:bg-gray-100';
	div.onclick = async () => intentarPokemon(pokemon);
	//console.log("opcion");
	
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async () => {
	tries = document.querySelector("#try");
	tries.style.display = "none"
	
	
	const pokemonList = await fetchAllPokemon();
	const input = document.querySelector('#pokeName');
	const resultsContainer = document.querySelector('#results');
	
	const todaysPokemon = await todayPokemon(pokeSelect);
	//console.log(todaysPokemon);
	
	input.addEventListener('input', () => {
		const query = input.value;
		const filteredPokemon = filterPokemon(pokemonList, query);
		const resultsContainer = document.querySelector('#results');
		
		resultsContainer.innerHTML = '';
		if(query){
			resultsContainer.style.display = 'block';
			filteredPokemon.forEach(pokemon => {
						const pokemonElement = createPokemonElement(pokemon);
						resultsContainer.appendChild(pokemonElement);
					});
		} else {
			resultsContainer.style.display = 'none';
		}
	});
	
	resultsContainer.style.display = 'none';
});

async function crearTr(n){
	var newRow = document.createElement("tr");
	newRow.setAttribute('id',('apiRow' + n));
	tabla.prepend(newRow);
	
}

async function todayPokemon(id){
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();

    return data;
}
async function todayPokemonSpecie(id){
	const poke = await todayPokemon(id);
	//console.log(poke);
	
	const response = await fetch(poke.species.url);
    const data = await response.json();
	console.log(data);
	
    return data;
}

async function todayPokemonChain(id){
	const todaySpecie = await todayPokemonSpecie(id);
	
	const response = await fetch(todaySpecie.evolution_chain.url);
    const data = await response.json();

    return data;
}

async function intentarPokemon(pokemon) {
	const todayPoke = await todayPokemon(pokeSelect);
	const todayPokeSpecie = await todayPokemonSpecie(pokeSelect);
	const todayPokeChain= await todayPokemonChain(pokeSelect);
	//console.log(pokemon);
	
	crearTr(pokemon.name);
	
	var colNa = document.createElement('td');
	var colT1 = document.createElement('td');
	var colT2 = document.createElement('td');
	var colEv = document.createElement('td');
	var colEvolutionM = document.createElement('td');
	var colColor = document.createElement('td');
	var colHab = document.createElement('td');
	var colGen = document.createElement('td');
	
	var apiRow = document.getElementById("apiRow" + pokemon.name);
	fetch(pokemon.url)
	    .then(response => response.json())
	    .then(data => {
	    	
	    	
	    	colNa.id = "name";
	    	colNa.innerText = data.forms[0].name;

	    	colT1.id = "type1";
	    	colT1.innerText = data.types[0].type.name;

	    	colT2.id = "type2";
	    	colT2.innerText = typeof data.types[1] === "undefined"? "None" : data.types[1].type.name;
	    	
	    	if(todayPoke.name == data.name){
    			colNa.className = "pixel bg-[#00ff00]"	
	    	}
	    	else{
	    		colNa.className = "pixel bg-[#ff0000]"
	    	}
	    	if(todayPoke.types[0].type.name == data.types[0].type.name){
    			colT1.className = "pixel bg-[#00ff00]"
	    	}
	    	else{
	    		colT1.className = "pixel bg-[#ff0000]"
	    	}
	    	if(typeof todayPoke.types[1] !== "undefined" && typeof data.types[1] !== "undefined")
	    		if(todayPoke.types[1].type.name == data.types[1].type.name){
    				colT2.className = "pixel bg-[#00ff00]"
	    		}
	    		else{
	    			colT2.className = "pixel bg-[#ff0000]"
	    		}
	    	else{
	    		colT2.className = "pixel bg-[#aaaaaa]"
	    	}
			///////////////////////////////////////
	    	fetch("https://pokeapi.co/api/v2/pokemon-species/" + data.id + "/")
		    .then(response => response.json())
		    .then(data => {
				var url = "https://pokeapi.co/api/v2/pokemon-species/" + data.id + "/";
				colColor.id = "color";
		    	colColor.innerText = data.color.name;
		    	
		    	
		    	colHab.id = "habitat";
		    	colHab.innerText = data.habitat == null ? "None" : data.habitat.name;
				
		    	var gen = "";
		    	
		    	if(data.id >= 1 && data.id <= 151){
		    		gen = 1
		    	} 
		    	else if(data.id >= 152 && data.id <= 251){
		    		gen = 2
		    	}
		    	else if(data.id >= 252 && data.id <= 386){
		    		gen = 3
		    	}
		    	else if(data.id >= 387 && data.id <= 493){
		    		gen = 4
		    	}
		    	else if(data.id >= 494 && data.id <= 649){
		    		gen = 5
		    	}
		    	else if(data.id >= 650 && data.id <= 721){
		    		gen = 6
		    	}
		    	else if(data.id >= 722 && data.id <= 809){
		    		gen = 7
		    	}
		    	else if(data.id >= 810 && data.id <= 897){
		    		gen = 8
		    	}
		    	else if(data.id >= 898 && data.id <= 1025){
		    		gen = 9
		    	}
		    	else{
		    		gen = 10
		    	}
		    	colGen.id = "generation";
		    	colGen.innerText = gen;
		    	
				var Tgen = "";
		    	
		    	if(todayPoke.id >= 1 && todayPoke.id <= 151){
		    		Tgen = 1
		    	} 
		    	else if(todayPoke.id >= 152 && todayPoke.id <= 251){
		    		Tgen = 2
		    	}
		    	else if(todayPoke.id >= 252 && todayPoke.id <= 386){
		    		Tgen = 3
		    	}
		    	else if(todayPoke.id >= 387 && todayPoke.id <= 493){
		    		Tgen = 4
		    	}
		    	else if(todayPoke.id >= 494 && todayPoke.id <= 649){
		    		Tgen = 5
		    	}
		    	else if(todayPoke.id >= 650 && todayPoke.id <= 721){
		    		Tgen = 6
		    	}
		    	else if(todayPoke.id >= 722 && todayPoke.id <= 809){
		    		Tgen = 7
		    	}
		    	else if(todayPoke.id >= 810 && todayPoke.id <= 897){
		    		Tgen = 8
		    	}
		    	else if(todayPoke.id >= 898 && todayPoke.id <= 1025){
		    		Tgen = 9
		    	}
		    	else{
		    		Tgen = 10
		    	}
		    	if(Tgen == gen){
	    			colGen.className = "pixel bg-[#00ff00]"
		    	}
		    	else{
		    		colGen.className = "pixel bg-[#ff0000]"
		    	}
		    	
		    	if(todayPokeSpecie.color.name == data.color.name){
		    		colColor.className = "pixel bg-[#00ff00]"	
		    	}
		    	else{
		    		colColor.className = "pixel bg-[#ff0000]"
		    	}
		    	if(todayPokeSpecie.habitat !== null && data.habitat !== null){
					if(todayPokeSpecie.habitat.name == data.habitat.name){
		    			colHab.className = "pixel bg-lime-500"
						//console.log("acertó")
			    	}
			    	else{
			    		colHab.className = "pixel bg-red-600"
						//console.log("rechazó");
			    	}
				} else if (todayPokeSpecie.habitat == null && data.habitat == null) {
					colHab.className = "pixel bg-lime-500";
					//console.log("no entró");
				} else {
					colHab.className = "pixel bg-red-600"
				}
			    	
				
		    	fetch(data.evolution_chain.url)
			    .then(response => response.json())
			    .then(data => {
			    	var evoAct = 1;
			    	var evos = 1;
			    	
			    	var foundEvo = false;
			    	var foundMax = false;
			    	
			    	var nextSpecie = data.chain.evolves_to;
			    	var chainSpecie = data.chain;
			    	
			    	for (var i = 0; !foundMax; i++){
			    		if(Object.keys(nextSpecie).length > 0){
			    			evos += 1;
			    			
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    		else{
			    			foundMax = !foundMax;
			    		}
			    	}

			    	var nextSpecie = data.chain.evolves_to;
			    	var chainSpecie = data.chain;
			    	
			    	for (var i = 0; i < evos; i++){
			    		
			    		if(Object.keys(nextSpecie).length > 0){
			    			if(chainSpecie.species.url == url && !foundEvo){
			    				foundEvo = !foundEvo;
				    			chainSpecie = nextSpecie[0];
				    		}
			    			else if (foundEvo == false || chainSpecie.species.url == url){
			    				evoAct += 1;
			    				chainSpecie = nextSpecie[0];
				    		}
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    	}
			    	
			    	colEv.id = "evolution";
			    	colEv.innerText = evoAct;
			    	
			    	colEvolutionM.id = "evolutionMax";
			    	colEvolutionM.innerText = evos;
			    	
			    	//TODAYPOKEMON EVOLUTION CHAIN
			    	var TevoAct = 1;
			    	var Tevos = 1;
			    	
			    	var TfoundEvo = false;
			    	var TfoundMax = false;
			    	
			    	var nextSpecie = todayPokeChain.chain.evolves_to;
			    	var chainSpecie = todayPokeChain.chain;
			    	
			    	for (var i = 0; !TfoundMax; i++){
			    		if(Object.keys(nextSpecie).length > 0){
			    			Tevos += 1;
			    			
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    		else{
			    			TfoundMax = !TfoundMax;
			    		}
			    	}

			    	var nextSpecie = todayPokeChain.chain.evolves_to;
			    	var chainSpecie = todayPokeChain.chain;
			    	
			    	for (var i = 0; i < Tevos; i++){
			    		
			    		if(Object.keys(nextSpecie).length > 0){
			    			if(chainSpecie.species.url == todayPoke.species.url && !TfoundEvo){
			    				TfoundEvo = !TfoundEvo;
				    			chainSpecie = nextSpecie[0];
				    		}
			    			else if (TfoundEvo == false){
			    				TevoAct += 1;
			    				chainSpecie = nextSpecie[0];
				    		}
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    	}
			    	//todayPokeSpecie.evolution_chain.url
			    	if(TevoAct == evoAct){
		    			colEv.className = "pixel bg-[#00ff00]"	
			    	}
			    	else{
			    		colEv.className = "pixel bg-[#ff0000]"
			    	}
			    	if(Tevos == evos){
			    		colEvolutionM.className = "pixel bg-[#00ff00]"
			    	}
			    	else{
			    		colEvolutionM.className = "pixel bg-[#ff0000]"
			    	}
			    })
		    
		    })
		    
		    //intento.innerText = parseInt(intento.innerText) + 1;
	    	apiRow.appendChild(colNa);
	    	apiRow.appendChild(colT1);
	    	apiRow.appendChild(colT2);
	    	apiRow.appendChild(colEv);
	    	apiRow.appendChild(colEvolutionM);
	    	apiRow.appendChild(colColor);
	    	apiRow.appendChild(colHab);
	    	apiRow.appendChild(colGen);
	    	const input = document.querySelector('#pokeName');
			const resultsContainer = document.querySelector('#results');
			resultsContainer.style.display = 'none'
			
			input.value = '';
	    	mostrarCeldas();
	    })
	    .catch(error => console.error("Error fetching data:", error));
	}

async function mostrarCeldas(){
	const tabla = document.getElementById("pokemon-table");
	const filas = tabla.rows;
}

async function comprobarPokemon(){
	const tabla = document.getElementById("pokemon-table");
	const filas = tabla.rows;

	fetch("https://pokeapi.co/api/v2/pokemon/" + id.value)
	    .then(response => response.json())
	    .then(data => {
	    	
	    	//if (data.forms[0].name == )
	    	colNa.className = "pixel";
	    	colNa.innerText = data.forms[0].name;

	    	colT1.className = "pixel";
	    	colT1.innerText = data.types[0].type.name;

	    	colT2.className = "pixel";
	    	colT2.innerText = typeof data.types[1] === "undefined"? "None" : data.types[1].type.name;
			///////////////////////////////////////
	    	fetch("https://pokeapi.co/api/v2/pokemon-species/" + data.id + "/")
		    .then(response => response.json())
		    .then(data => {
				var url = "https://pokeapi.co/api/v2/pokemon-species/" + data.id + "/";
		    	colColor.className = "pixel";
		    	colColor.innerText = data.color.name;

		    	colHab.className = "pixel";
		    	colHab.innerText = data.habitat == null ? "None" : data.habitat.name;
				
		    	var gen = "";
		    	
		    	if(data.id >= 1 && data.id <= 151){
		    		gen = 1
		    	} 
		    	else if(data.id >= 152 && data.id <= 251){
		    		gen = 2
		    	}
		    	else if(data.id >= 252 && data.id <= 386){
		    		gen = 3
		    	}
		    	else if(data.id >= 387 && data.id <= 493){
		    		gen = 4
		    	}
		    	else if(data.id >= 494 && data.id <= 649){
		    		gen = 5
		    	}
		    	else if(data.id >= 650 && data.id <= 721){
		    		gen = 6
		    	}
		    	else if(data.id >= 722 && data.id <= 809){
		    		gen = 7
		    	}
		    	else if(data.id >= 810 && data.id <= 897){
		    		gen = 8
		    	}
		    	else if(data.id >= 898 && data.id <= 1025){
		    		gen = 9
		    	}
		    	else{
		    		gen = 10
		    	}
		    	
		    	colGen.className = "pixel";
		    	colGen.innerText = gen;
		    	///////////////////////////////////////////
		    	fetch(data.evolution_chain.url)
			    .then(response => response.json())
			    .then(data => {
			    	var evoAct = 1;
			    	var evos = 1;
			    	
			    	var foundEvo = false;
			    	var foundMax = false;
			    	
			    	var nextSpecie = data.chain.evolves_to;
			    	var chainSpecie = data.chain;
			    	
			    	for (var i = 0; !foundMax; i++){
			    		if(Object.keys(nextSpecie).length > 0){
			    			evos += 1;
			    			
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    		else{
			    			foundMax = !foundMax;
			    		}
			    	}

			    	var nextSpecie = data.chain.evolves_to;
			    	var chainSpecie = data.chain;
			    	
			    	for (var i = 0; i < 10; i++){
			    		
			    		if(Object.keys(nextSpecie).length > 0){
			    			if(chainSpecie.species.url == url && !foundEvo){
			    				foundEvo = !foundEvo;
				    			chainSpecie = nextSpecie[0];
				    		}
			    			else if (foundEvo == false || chainSpecie.species.url == url){
			    				evoAct += 1;
			    				chainSpecie = nextSpecie[0];
				    		}
			    			nextSpecie = nextSpecie[0].evolves_to;
			    		}
			    	}
			    	
			    	colEv.className = "pixel";
			    	colEv.innerText = evoAct;
			    	
			    	colEvolutionM.className = "pixel";
			    	colEvolutionM.innerText = evos;
			    	
			    })
		    
		    })
		    
		    intento.innerText = parseInt(intento.innerText) + 1;
	    	apiRow.appendChild(colNa);
	    	apiRow.appendChild(colT1);
	    	apiRow.appendChild(colT2);
	    	apiRow.appendChild(colEv);
	    	apiRow.appendChild(colEvolutionM);
	    	apiRow.appendChild(colColor);
	    	apiRow.appendChild(colHab);
	    	apiRow.appendChild(colGen);
	    	document.getElementById("pokeTry").value = "";
	    })
	    .catch(error => console.error("Error fetching data:", error));
	}

function changeColor(cell) {
	const currentColor = cell.style.backgroundColor;
	if (currentColor === 'yellow') {
		cell.style.backgroundColor = 'green';
	} else if (currentColor === 'green') {
		cell.style.backgroundColor = "#31adff";
	} else {
		cell.style.backgroundColor = 'yellow';
	}
}