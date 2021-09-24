import React from 'react';
import {
	Box,
	Center,
	Flex,
	Image,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';
import typeImages from './images.js';

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
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Double damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.doubleDamageTo.length > 0 ? (
						this.state.doubleDamageTo.map(pType => (
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Half damage from:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.halfDamageFrom.length > 0 ? (
						this.state.halfDamageFrom.map(pType => (
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>Half damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.halfDamageTo.length > 0 ? (
						this.state.halfDamageTo.map(pType => (
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>No damage from:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.noDamageFrom.length > 0 ? (
						this.state.noDamageFrom.map(pType => (
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
							))
						) : (<p>None</p>)}
						</Flex>
					</Box>

					<Box>
						<h2>No damage to:</h2>
						<Flex justify="center" wrap="wrap" w="100%">
						{this.state.noDamageTo.length > 0 ? (
						this.state.noDamageTo.map(pType => (
							
							<Image key={pType.name} src={typeImages[prefix + pType.name]} alt={pType.name} p="5px" h="40px"/>
							
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


export default PokemonType;