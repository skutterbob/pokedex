import React from 'react';
import {
	Box,
	Center,
	Flex,
	Image,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import typeImages from './images.js';

class PokemonMove extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			name: "",
			url: "",
			pokedex: "",
			desc: "",
			moveType: "",
			accuracy: 0,
			power: 0,
			pp: 0,
			damageClass: "",
			effectChance: 0,
			effects: [],
			machines: [],
			learnedByPokemon: [],
		};
	}

	async componentDidMount() {
		try {
			let moveRequest = await fetch(this.props.url).then(Utilities.checkResponse);
			let moveJson = await moveRequest.json();
	
			let nameData = "";
			if (moveJson.name) {
				nameData = moveJson.name;
			}
	
			let descData = "";
			for (let i = 0; i < moveJson.flavor_text_entries.length; i++) {
				if (moveJson.flavor_text_entries[i].language.name === "en") {
					descData = moveJson.flavor_text_entries[i].flavor_text;
				}
			}
	
			let typeData = "";
			if (moveJson.type) {
				typeData = moveJson.type.name;
			}
	
			let accuracyData = 0;
			if (moveJson.accuracy) {
				accuracyData = moveJson.accuracy;
			}
	
			let powerData = 0;
			if (moveJson.power) {
				powerData = moveJson.power;
			}
	
			let ppData = 0;
			if (moveJson.pp) {
				ppData = moveJson.pp;
			}
	
			let damageClassData = "";
			if (moveJson.damage_class) {
				damageClassData = moveJson.damage_class.name;
			}


			let effectChanceData = 0;
			if (moveJson.effect_chance) {
				effectChanceData = moveJson.effect_chance;
			}
	
			let effectsData = [];
			if (moveJson.effect_entries) {
				for (let i = 0; i < moveJson.effect_entries.length; i++) {
					effectsData.push(moveJson.effect_entries[i].effect);
				}
			}
	
			let machinesData = [];
			if (moveJson.machines) {
				for (let i = 0; i < moveJson.machines.length; i++) {
					machinesData.push(moveJson.machines[i].machine.url);
				}
			}
	
			let learnedByPokemonData = [];
			if (moveJson.learned_by_pokemon) {
				for (let i = 0; i < moveJson.learned_by_pokemon.length; i++) {
					learnedByPokemonData.push([moveJson.learned_by_pokemon[i].name, moveJson.learned_by_pokemon[i].url]);
				}
			}
	
	
			this.setState({
				name: nameData,
				desc: descData,
				type: typeData,
				accuracy: accuracyData,
				power: powerData,
				pp: ppData,
				damageClass: damageClassData,
				effectChance: effectChanceData,
				effects: effectsData,
				machines: machinesData,
				learnedByPokemon: learnedByPokemonData,
				loading: false,
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
			<Flex justify="center" align="center" direction="column">
				<h2>{Utilities.formatName(this.state.name)}</h2>
				<Box m="1em">{this.state.desc}</Box>
				<Image src={typeImages["m_" + this.state.type]} alt={this.state.type} p="20px" />
				<Box m="1em">{Utilities.formatName(this.state.damageClass)}</Box>
				<StatGroup>
					<Stat m="1em">
						<StatLabel>Accuracy</StatLabel>
						<StatNumber>{this.state.accuracy}</StatNumber>
					</Stat>

					<Stat m="1em">
						<StatLabel>Power</StatLabel>
						<StatNumber>{this.state.power}</StatNumber>
					</Stat>

					<Stat m="1em">
						<StatLabel>PP</StatLabel>
						<StatNumber>{this.state.pp}</StatNumber>
					</Stat>

					{(this.state.effectChance === undefined) ? "" : (
						<Stat m="1em">
							<StatLabel>Effect chance</StatLabel>
							<StatNumber>{this.state.effectChance}</StatNumber>
						</Stat>
					)}
				</StatGroup>

				<Box m="1em">
					
				</Box>
			</Flex>

			</>
			)}

			</>
		)
	}
}

export default PokemonMove;