import { useState,useEffect } from 'react'

const URL_DEFAULT='https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

function usePokemones(){
    const [pokemones, setPokemones] = useState([])
    const [siguienteUrl,setSiguienteUrl]=useState('')
    const getPokemones = async (url=URL_DEFAULT) => {
        const response = await fetch(url)
        const listapokemonos = await response.json()
        const { next,results } = listapokemonos
        const newPokemones = await Promise.all(
            results.map(async (pokemon) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()
                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default
                }
            })
        )
        return{next,newPokemones}
    }

    const obtenerPokemones=async()=>{
        const {next, newPokemones}=await getPokemones()
        setPokemones(newPokemones)
        setSiguienteUrl(next)
    }

    const masPokemones=async()=>{
        const {next,newPokemones}=await getPokemones(siguienteUrl)
        setPokemones(prev=>[...prev,...newPokemones])
        setSiguienteUrl(next)
    }
    useEffect(() => {
        obtenerPokemones()
    }, [])
    return {pokemones,masPokemones}
}

export default usePokemones