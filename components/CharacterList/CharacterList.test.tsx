import { fireEvent, render, screen } from "@testing-library/react"
import { CharacterList } from "."
import { CharactersType } from "@/types"
import RandMContext from "@/context/RandMContext"

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

const mockCharacter: CharactersType = {
	id: 1,
	name: "Mock Character",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth", url: "" },
	location: { name: "Earth", url: "" },
	image: "https://example.com/image.jpg",
	episode: [],
	url: "",
	created: "2020-01-01",
}

const mockContextValue = {
	character1: mockCharacter,
	character2: null,
	setCharacter1: jest.fn(),
	setCharacter2: jest.fn(),
	charactersList1: [mockCharacter],
	charactersList2: [],
	setCharactersList1: jest.fn(),
	setCharactersList2: jest.fn(),
	episodes: [],
	setEpisodes: jest.fn(),
	pages: 10,
	loader1: true,
	setLoader1: jest.fn(),
	loader2: false,
	setLoader2: jest.fn(),
}

const exampleList = [
	{
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
	},
	{
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
	},
	{
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
	},
]

test("check if loader renders when needed", () => {
	const mockSetCharacter = jest.fn()
	render(
		<RandMContext.Provider value={mockContextValue}>
			<CharacterList
				characters={exampleList}
				setCharacters={mockSetCharacter}
				chosenCharacter={example1}
				setCharacter={mockSetCharacter}
				loader={true}
				setLoader={mockSetCharacter}
			/>
		</RandMContext.Provider>
	)
	expect(screen.getByText("Loading...")).toBeInTheDocument()
	expect(screen.getByTestId("circular-loader")).toBeInTheDocument()
})

describe("CharacterList pagination", () => {
	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ results: [] }),
		})
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it("calls fetch with the correct URL when paginating", async () => {
		const mockSetCharacters = jest.fn()
		const mockSetCharacter = jest.fn()
		const mockSetLoader = jest.fn()

		render(
			<RandMContext.Provider value={mockContextValue}>
				<CharacterList
					characters={[]}
					setCharacters={mockSetCharacters}
					setCharacter={mockSetCharacter}
					chosenCharacter={null}
					loader={false}
					setLoader={mockSetLoader}
				/>
			</RandMContext.Provider>
		)

		const page2Button = await screen.findByText("2")
		fireEvent.click(page2Button)

		expect(global.fetch).toHaveBeenCalledWith("api/page?number=2")
	})
})
