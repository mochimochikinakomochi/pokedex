import { useState } from "react";
import axios from "axios";

interface PokemonInList {
    ID: number;
    Name: string;
}

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonInList[]>([])
    const [isFetchingPokemonList, setIsFetchingPokemonList] = useState(false)
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
    console.log("pokemonList", pokemonList)


    async function fetchPokemonList({startID = 1}: {startID: number}) {
        let subPokemonList: PokemonInList[] = []
        const url = baseUrl + "?offset=" + (startID - 1) + "&limit=1000"
        try {
            setIsFetchingPokemonList(true)
            const response = await axios.get(url)
            const data = response.data.results
            for(let i = 0; i < 1000; i++) {
                const subPokemon: PokemonInList = {
                    ID: startID + i,
                    Name: data[i].name
                }
                subPokemonList = [...subPokemonList, subPokemon]
            }
        } catch (error) {
            console.error(error)
        }
        setIsFetchingPokemonList(false)
        setPokemonList(subPokemonList)
    }

    async function appendPokemonList({startID = 1}: {startID: number}) {
        let subPokemonList: PokemonInList[] = []
        const url = baseUrl + "?offset=" + (startID - 1) + "&limit=30"
        try {
            setIsFetchingPokemonList(true)
            const response = await axios.get(url)
            const data = response.data.results
            console.log("data", data)
            for(let i = 0; i < 30; i++) {
                const subPokemon: PokemonInList = {
                    ID: startID + i,
                    Name: data[i].name
                }
                subPokemonList = [...subPokemonList, subPokemon]
            }
        } catch (error) {
            console.error(error)
        }
        setIsFetchingPokemonList(false)
        setPokemonList((pre) => [...pre, ...subPokemonList])
    }

    return {pokemonList, fetchPokemonList, appendPokemonList, isFetchingPokemonList}
}