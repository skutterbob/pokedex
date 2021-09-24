import React from 'react';
import {
	Box,
	Button,
	Flex,
	Modal,
  	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { Pokeball } from './Pokeball.js';
import SinglePokedex from './SinglePokedex.js';

class PokedexCard extends React.Component {
	
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


export default PokedexCard;