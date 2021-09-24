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
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import pokemonImages from './pokemonImages.js';

import Pokemon from './Pokemon.js';

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

					<Image src={pokemonImages[Utilities.getPokemonImageName(pokemon[0] + "normal")]} p="10px" m="10px" w="20%"/>
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

export default SinglePokedex;