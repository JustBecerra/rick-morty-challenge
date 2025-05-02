import { render, screen } from "@testing-library/react"
import { CharacterCard } from "."
import { CharactersType } from "@/types"

const example1: CharactersType = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: {
		name: "Earth (C-137)",
		url: "https://rickandmortyapi.com/api/location/1",
	},
	location: {
		name: "Citadel of Ricks",
		url: "https://rickandmortyapi.com/api/location/3",
	},
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	episode: [
		"https://rickandmortyapi.com/api/episode/1",
		"https://rickandmortyapi.com/api/episode/2",
	],
	url: "https://rickandmortyapi.com/api/character/1",
	created: "2017-11-04T18:48:46.250Z",
}

const example2: CharactersType = {
	id: 2,
	name: "Morty Smith",
	status: "Dead",
	species: "Human",
	type: "",
	gender: "Male",
	origin: {
		name: "Earth (C-137)",
		url: "https://rickandmortyapi.com/api/location/1",
	},
	location: {
		name: "Earth (Replacement Dimension)",
		url: "https://rickandmortyapi.com/api/location/20",
	},
	image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
	episode: [
		"https://rickandmortyapi.com/api/episode/1",
		"https://rickandmortyapi.com/api/episode/2",
	],
	url: "https://rickandmortyapi.com/api/character/2",
	created: "2017-11-04T18:50:21.651Z",
}

const example3: CharactersType = {
	id: 242,
	name: "Mr. Meeseeks",
	status: "Missing",
	species: "Meeseeks",
	type: "",
	gender: "Male",
	origin: {
		name: "Mr. Meeseeks Box",
		url: "https://rickandmortyapi.com/api/location/123",
	},
	location: {
		name: "Earth (Replacement Dimension)",
		url: "https://rickandmortyapi.com/api/location/20",
	},
	image: "https://rickandmortyapi.com/api/character/avatar/242.jpeg",
	episode: ["https://rickandmortyapi.com/api/episode/5"],
	url: "https://rickandmortyapi.com/api/character/242",
	created: "2017-12-30T14:13:17.371Z",
}

const mockSetCharacter = jest.fn()
test("renders character name", () => {
	render(
		<CharacterCard
			char={example1}
			chosenCharacter={example2}
			setCharacter={mockSetCharacter}
		/>
	)
	expect(screen.getByText(example1.name)).toBeInTheDocument()
})

test("alive status matches logo", () => {
	render(
		<CharacterCard
			char={example1}
			chosenCharacter={example2}
			setCharacter={mockSetCharacter}
		/>
	)
	expect(screen.getByTestId("alive-icon")).toBeInTheDocument()
})

test("dead status matches logo", () => {
	render(
		<CharacterCard
			char={example2}
			chosenCharacter={example2}
			setCharacter={mockSetCharacter}
		/>
	)
	expect(screen.getByTestId("dead-icon")).toBeInTheDocument()
})

test("missing status matches logo", () => {
	render(
		<CharacterCard
			char={example3}
			chosenCharacter={example2}
			setCharacter={mockSetCharacter}
		/>
	)
	expect(screen.getByTestId("missing-icon")).toBeInTheDocument()
})