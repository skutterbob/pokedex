import React from 'react';

export default class Utilities {

	static checkResponse(response) {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response;
	}

	static formatName(name) {
		const words = name.split("-");
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
		}
		return words.join(" ");
	}

	static calculatePokemonHeight(height) {
		let heightInCm = height * 10;
		let heightInM = height / 10;
		
		return (heightInCm >= 100 ? heightInM + "m" : heightInCm + "cm");
	}

	static calculatePokemonWeight(weight) {
		let weightInG = weight * 100;
		let weightInKg = weight / 10;
		
		return (weightInG >= 1000 ? weightInKg + "kg" : weightInG + "g");
	}

	static handleError(e) {
		
	}

};

