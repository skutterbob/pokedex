import React from 'react';
import {
	Center,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
} from '@chakra-ui/react';
import Utilities from './Utilities.js';
import { Pokeball } from './Pokeball.js';

class PokemonAbility extends React.Component {
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

export default PokemonAbility;