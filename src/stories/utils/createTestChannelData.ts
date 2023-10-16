import { faker } from "@faker-js/faker"
import { times } from "lodash"

function makeData() {
	const name = faker.animal.bear()
	return {
		id: faker.database.mongodbObjectId(),
		name,
		label: name,
		guildName: faker.commerce.product(),
	}
}

function generateProducts() {
	// Create a set to store unique product names
	const productSet = new Set<string>()

	// Generate 10 unique product names
	while (productSet.size < 10) {
		productSet.add(faker.commerce.product())
	}

	return productSet
}

function getRandomProduct(productSet: Set<string>) {
	const products = Array.from(productSet) // convert set to array for indexing
	const randomIndex = Math.floor(Math.random() * products.length)
	return products[randomIndex]!
}

export function createChannelData() {
	const dataSet1 = times(100, makeData)
	const dataSet2 = generateProducts()
	return dataSet1.map((data) => {
		data.guildName = getRandomProduct(dataSet2)
		return data
	})
}
