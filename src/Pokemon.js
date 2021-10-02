import React from 'react';
import {
	Box,
	Button,
	Center,
	Flex,
	Image,
	Modal,
  	ModalOverlay,
	ModalContent,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import typeImages from './images.js';
import pokemonImages from './pokemonImages.js';

import PokemonAbility from './PokemonAbility.js';
import PokemonType from './PokemonType.js';
import PokemonMove from './PokemonMove.js';

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
			moves: [],
			selectedAbility: "",
			selectedType: "",
			selectedMove: "",
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

	openMoveModal = (url) => {
		this.setState({ selectedMove: url })
		this.setState({ isMoveModalOpen: true })
	}

	closeMoveModal = () => {
		this.setState({ isMoveModalOpen: false })
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

			let movesData = [];
			 for (let i = 0; i < pokemonJson.moves.length; i++) {
			 	movesData.push([pokemonJson.moves[i].move.name, pokemonJson.moves[i].move.url]);
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
				moves: movesData,
				loading: false
			});


		} catch(e) {
			console.log(e);
		}
	}

	render() {

		

		return (
			<>

			{this.state.loading ? (<Center><Pokeball/></Center>) : (

			<>
			<Flex justify="center" align="center" direction="column" >
			
				<Box m="1em">{this.state.desc}</Box>

				<Image src={pokemonImages[Utilities.getPokemonImageName(this.props.name + "normal")]} m="1em"/>


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
						<Image src={typeImages[pType[0]]} alt={pType[0]} p="20px" w={["30vw", "20vw", "10vw"]}/>
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

				<h3>Moves:</h3>
				<Flex justify="center" w="100%" wrap="wrap">
				
				{this.state.moves.map(move => (
					<Button key={move[0]} onClick={() => this.openMoveModal(move[1])} m="5px" p="10px">
						{Utilities.formatName(move[0])}
					</Button>
				))}

				</Flex>

			</Flex>


		{/* Abilities Modal */}
			<Modal isOpen={this.state.isAbilityModalOpen} onClose={this.closeAbilityModal} >
				<ModalOverlay />

				<ModalContent>
					<PokemonAbility url={this.state.selectedAbility}/>

				</ModalContent>
			</Modal>

		{/* Types Modal */}
			<Modal isOpen={this.state.isTypeModalOpen} onClose={this.closeTypeModal} size="md">
				<ModalOverlay />

				<ModalContent>
					<PokemonType url={this.state.selectedType}/>

				</ModalContent>
			</Modal>

		{/* Moves Modal */}
			<Modal isOpen={this.state.isMoveModalOpen} onClose={this.closeMoveModal} size="lg">
				<ModalOverlay />

				<ModalContent>
					<PokemonMove url={this.state.selectedMove}/>

				</ModalContent>
			</Modal>

			</>

			)}

			</>
		);
	}
}

export default Pokemon;