import React from 'react';
import {
	Center,
	Flex,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import PokedexCard from './PokedexCard.js';



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
							<PokedexCard key={dex[0]} name={dex[0]} url={dex[1]}></PokedexCard>
						))}
						</Flex>
					</Center>)
			}

			</div>
		);
	}
}



export default Pokedex;