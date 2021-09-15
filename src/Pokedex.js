import React from 'react';
import {
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Image,
	Link,
	Modal,
  	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import images from './images.js';



class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			active: true,
			pokedexes: [],
		}
	}

	async componentDidMount() {
		try {
			const pokedexRequest = await fetch("https://pokeapi.co/api/v2/pokedex/?limit=-1").then(Utilities.checkResponse);
			const poxedexJson = await pokedexRequest.json();
			const dexes = [];

			for (let i = 0; i < poxedexJson.results.length; i++) {
				let dex = poxedexJson.results[i];
				let fName = Utilities.formatName(dex.name);
				dexes.push([fName, dex.url]);
			}
					
			this.setState({pokedexes: dexes, loading: false});
		} catch(e) {
			console.log(e);
		}
			
	}

		


	render() {

		return (
			
			<div>
				{this.state.loading ? (<Center><Pokeball w="50%"/></Center>) : (
					
					<Center>
						<Flex id="pokedexes" wrap="wrap" w="95%" justify="space-evenly" grow="1">
						{this.state.pokedexes.map(dex => (
							<SinglePokedexCard key={dex[0]} name={dex[0]} url={dex[1]}></SinglePokedexCard>
						))}
						</Flex>
					</Center>)
			}

			</div>
		);
	}
}

class SinglePokedexCard extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			url: props.url,
			isModalOpen: false,
		}
	}

	openModal = () => {
		this.setState({ isModalOpen: true })
	}

	closeModal = () => {
		this.setState({ isModalOpen: false })
	}

	render() {
		
		return (

				<>
				<Button onClick={this.openModal} p="10px" m="10px" h="auto">
				<Flex justify="space-between" w={[300, 400, 500]} p="0" m="0" borderRadius="lg" bg="gray.100">
					<Pokeball w="15%" p="10px" m="10px"/>
					<Box p="10px" m="10px">{this.props.name}</Box>
				</Flex>
				</Button>
				
			

				<Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} size="full">
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{this.props.name}</ModalHeader>
						<ModalCloseButton/>

						<ModalBody p="0">
							<SinglePokedex name={this.props.name} url={this.props.url}/>
						</ModalBody>

					</ModalContent>
				</Modal>
				</>

		);
	}
}

class SinglePokedex extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isDrawerOpen: false,
			name: props.name,
			url: props.url,
			desc: "",
			pokemon_entries: [],
			selectedPokemonName: "",
			selectedPokemonUrl: "",
		}
	}

	openDrawer = (name, url) => {
		this.setState({selectedPokemonName: name, selectedPokemonUrl: url});
		this.setState({ isDrawerOpen: true });
	}

	closeDrawer = () => {
		this.setState({ isDrawerOpen: false })
	}

	async componentDidMount() {
		try {
			const singlePokedexRequest = await fetch(this.props.url).then(Utilities.checkResponse);
			const singlePokedexJson = await singlePokedexRequest.json();
			
			let pokedexDescription = "";

			for (let i = 0; i < singlePokedexJson.descriptions.length; i++) {

				if (singlePokedexJson.descriptions[i].language.name === "en") {
					pokedexDescription = singlePokedexJson.descriptions[i].description;

				}
			}
			let entries = [];
			for (let i = 0; i < singlePokedexJson.pokemon_entries.length; i++) {
				let pokemon = singlePokedexJson.pokemon_entries[i].pokemon_species;
				entries.push([pokemon.name, pokemon.url]);
			}
			
			this.setState({pokemon_entries: entries, desc: pokedexDescription, loading: false});
		} catch(e) {
			console.log(e);
		}

	}

	render() {

		const urlStart = "http://skutters.com/pokemon/";
		
		return(
			<>

			{this.state.loading ? (<Center><Pokeball w="50%"/></Center>) : (
			<>
			<Box p="10px">{this.state.desc}</Box>

			<Center>
			<Flex id="pokemon" wrap="wrap" w="95%" justify="space-evenly" grow="1">

				{this.state.pokemon_entries.map(pokemon => (
				<Button key={pokemon[0]} onClick={() => this.openDrawer(pokemon[0], pokemon[1])} m="10px" p="10px" h="auto">
				<Flex justify="space-between" w={[300, 400, 500]} m="0" p="0" borderRadius="lg" bg="gray.100">
					<Box p="10px" m="10px">{Utilities.formatName(pokemon[0])}</Box>
					<Image src={urlStart + pokemon[0] + "-normal.png"} p="10px" m="10px" w="20%"/>
				</Flex>
				</Button>
				))}

			</Flex>
			</Center>



			<Drawer isOpen={this.state.isDrawerOpen} onClose={this.closeDrawer} size="xl">
				<DrawerOverlay />

				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{Utilities.formatName(this.state.selectedPokemonName)}</DrawerHeader>

					<DrawerBody>
						<Pokemon name={this.state.selectedPokemonName} url={this.state.selectedPokemonUrl} pokedexUrl={this.state.url}/>
					</DrawerBody>
				</DrawerContent>

			</Drawer>
			
				</>

			)}

			</>
		);
	}
}

class Pokemon extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isAbilityModalOpen: false,
			isTypeModalOpen: false,
			name: "",
			url: "",
			pokedexUrl: "",
			id: 0,
			varieties: [],
			desc: "",
			types: [],
			color: "",
			height: 0,
			weight: 0,
			abilities: [],
			evolvesFrom: "",
			habitat: "",
			isMythical: false,
			isLegendary: false,
			stats: [],
			selectedAbility: "",
			selectedType: ""
		}
	}


	openAbilityModal = (url) => {
		this.setState({ selectedAbility: url })
		this.setState({ isAbilityModalOpen: true })
	}

	closeAbilityModal = () => {
		this.setState({ isAbilityModalOpen: false })
	}

	openTypeModal = (url) => {
		this.setState({ selectedType: url })
		this.setState({ isTypeModalOpen: true })
	}

	closeTypeModal = () => {
		this.setState({ isTypeModalOpen: false })
	}

	async componentDidMount() {
		const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
		try {
			const speciesRequest = await fetch(this.props.url).then(Utilities.checkResponse);
			const speciesJson = await speciesRequest.json();

			let speciesIdArray = this.props.url.split("/");
			let speciesId = speciesIdArray[6];

			let varietiesData = [];
			for (let i = 0; i < speciesJson.varieties.length; i++) {
				varietiesData.push(speciesJson.varieties[i]);
			}

			let descData = "";
			for (let i = 0; i < speciesJson.flavor_text_entries.length; i++) {
				if (speciesJson.flavor_text_entries[i].language.name === "en") {
					descData = speciesJson.flavor_text_entries[i].flavor_text;
				}
			}

			let colorData = "";
			if (speciesJson.color) {
				colorData = speciesJson.color.name;
			}

			let evolvesFromData = "";
			if (speciesJson.evolves_from_species) {
				evolvesFromData = speciesJson.evolves_from_species.name;
			}

			let habitatData = "";
			if (speciesJson.habitat) {
				habitatData = speciesJson.habitat.name;
			}

			let isMythicalData = speciesJson.is_mythical;
			let isLegendaryData = speciesJson.is_legendary;

			const pokemonRequest = await fetch(pokemonUrl + speciesId).then(Utilities.checkResponse);
			const pokemonJson = await pokemonRequest.json();

			let typesData = [];
			for (let i = 0; i < pokemonJson.types.length; i++) {
				typesData.push([pokemonJson.types[i].type.name, pokemonJson.types[i].type.url]);
			}

			let heightData = pokemonJson.height;
			let weightData = pokemonJson.weight;

			let abilitiesData = [];
			for (let i = 0; i < pokemonJson.abilities.length; i++) {
				abilitiesData.push([pokemonJson.abilities[i].ability.name, pokemonJson.abilities[i].ability.url]);
			}

			let statsData = {};
			for (let i = 0; i < pokemonJson.stats.length; i++) {
				statsData[pokemonJson.stats[i].stat.name] = pokemonJson.stats[i].base_stat;
			}

			

			this.setState({
				id: speciesId,
				varieties: varietiesData,
				desc: descData,
				types: typesData,
				color: colorData,
				height: heightData,
				weight: weightData,
				abilities: abilitiesData,
				evolvesFrom: evolvesFromData,
				habitat: habitatData,
				isMythical: isMythicalData,
				isLegendary: isLegendaryData,
				stats: statsData,
				loading: false
			});


		} catch(e) {
			console.log(e);
		}
	}

	render() {

		const imageUrl = "http://skutters.com/pokemon/";

		return (
			<>

			{this.state.loading ? (<Center><Pokeball/></Center>) : (

			<>
			<Flex justify="center" align="center" direction="column" >
			
				<Box m="1em">{this.state.desc}</Box>

				<Image src={imageUrl + this.props.name + "-normal.png"} m="1em"/>


				<h3>Abilities:</h3>
				<Flex justify="center" >
				
				{this.state.abilities.map(ability => (
					<Button key={ability[0]} onClick={() => this.openAbilityModal(ability[1])} m="5px" p="10px">
						{Utilities.formatName(ability[0])}
					</Button>
				))}

				</Flex>

				<Flex justify="center">
					{this.state.types.map(pType => (
						<button key={pType[0]} nohref="true" onClick={() => this.openTypeModal(pType[1])} >
						<Image src={images[pType[0]]} alt={pType[0]} p="20px" w={["30vw", "20vw", "10vw"]}/>
						</button>
					))}
				</Flex>

				<StatGroup>
					<Stat m="1em">
						<StatLabel>Height</StatLabel>
						<StatNumber>{Utilities.calculatePokemonHeight(this.state.height)}</StatNumber>
					</Stat>

					<Stat m="1em">
						<StatLabel>Weight</StatLabel>
						<StatNumber>{Utilities.calculatePokemonWeight(this.state.weight)}</StatNumber>
					</Stat>
				</StatGroup>

				<Box m="1em">
					{(this.state.habitat === "") ? "" : "Habitat: " + (Utilities.formatName(this.state.habitat))}
				</Box>

				<Box>
					{(this.state.evolvesFrom === "") ? "" : "Evolves from: " + (Utilities.formatName(this.state.evolvesFrom))}
				</Box>

			</Flex>


		{/* Abilities Modal */}
			<Modal isOpen={this.state.isAbilityModalOpen} onClose={this.closeAbilityModal} >
				<ModalOverlay />

				<ModalContent>
					<Ability url={this.state.selectedAbility}/>

				</ModalContent>
			</Modal>

		{/* Types Modal */}
			<Modal isOpen={this.state.isTypeModalOpen} onClose={this.closeTypeModal} size="md">
				<ModalOverlay />

				<ModalContent>
					<PokemonType url={this.state.selectedType}/>

				</ModalContent>
			</Modal>

			</>

			)}

			</>
		);
	}
}

class PokemonType extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			name: "",
			url: props.url,
			doubleDamageFrom: [],
			doubleDamageTo: [],
			halfDamageFrom: [],
			halfDamageTo: [],
			noDamageFrom: [],
			noDamageTo: [],
		};
	}

	async componentDidMount() {
		const typeRequest = await fetch(this.props.url).then(Utilities.checkResponse);
		const typeJson = await typeRequest.json();

		let nameData = typeJson.name;

		let damageRelationsData = typeJson.damage_relations;

		this.setState({
			name: nameData,
			doubleDamageFrom: damageRelationsData.double_damage_from,
			doubleDamageTo: damageRelationsData.double_damage_to,
			halfDamageFrom: damageRelationsData.half_damage_from,
			halfDamageTo: damageRelationsData.half_damage_to,
			noDamageFrom: damageRelationsData.no_damage_from,
			noDamageTo: damageRelationsData.no_damage_to,
			loading: false,
		});
	}

	render() {
		const prefix = "m_";
		
		return (
			<>
			{this.state.loading ? (<Center><Pokeball w="50%"/></Center>) : (
				<>
				<ModalHeader>{Utilities.formatName(this.state.name)}</ModalHeader>
				<ModalCloseButton/>

				<ModalBody>
					<Box>
						<h2>Double damage from:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.doubleDamageFrom.length > 0 ? (
						this.state.doubleDamageFrom.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Double damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.doubleDamageTo.length > 0 ? (
						this.state.doubleDamageTo.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Half damage from:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.halfDamageFrom.length > 0 ? (
						this.state.halfDamageFrom.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Half damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.halfDamageTo.length > 0 ? (
						this.state.halfDamageTo.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>No damage from:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.noDamageFrom.length > 0 ? (
						this.state.noDamageFrom.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>No damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.noDamageTo.length > 0 ? (
						this.state.noDamageTo.map(pType => (
							
							<Image key={pType.name} src={images[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

				</ModalBody>
				<ModalFooter></ModalFooter>
				</>
			)}
		</>
		)
	}
}

class Ability extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			name: props.name,
			url: props.url,
			description: "",
		};
	}


	async componentDidMount() {
		const abilityRequest = await fetch(this.props.url).then(Utilities.checkResponse);
		const abilityJson = await abilityRequest.json();

		let nameData = abilityJson.name;
		let descriptionData = "";

		for (let i = 0; i < abilityJson.flavor_text_entries.length; i++) {
			if (abilityJson.flavor_text_entries[i].language.name === 'en')
				descriptionData = abilityJson.flavor_text_entries[i].flavor_text;
		}

		this.setState({
			name: nameData,
			description: descriptionData,
			loading: false
			
		});
	}

	render() {

		return (
			<>
			{this.state.loading ? (<Center><Pokeball w="50%"/></Center>) : (
				<>
				<ModalHeader>{Utilities.formatName(this.state.name)}</ModalHeader>
				<ModalCloseButton/>

				<ModalBody>
					<div p="10px" m="10px">{this.state.description}</div>
				</ModalBody>

				<ModalFooter></ModalFooter>
				</>
			)}
			</>

		)

	}
}


export default Pokedex;