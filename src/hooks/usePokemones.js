import { useState, useEffect } from 'react'

const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'

function usePokemones() {
    const [pokemones, setPokemones] = useState([])
    const [siguienteUrl, setSiguienteUrl] = useState('')
    const [verMas, setVerMas] = useState(true)
    const getPokemones = async (url = URL_DEFAULT) => {
        const response = await fetch(url)
        const listapokemonos = await response.json()
        const { next, results } = listapokemonos
        const newPokemones = await Promise.all(
            results.map(async (pokemon) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()
                const abilities = poke.abilities.map(a => a.ability.name)
                const stats = poke.stats.map(s => { return { name: s.stat.name, base: s.base_stat } })
                const types = poke.types.map(t => t.type.name)
                return {
                    id: poke.id,
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
                    abilities,
                    stats,
                    types
                }
            })
        )
        return { next, newPokemones }
    }

    const obtenerPokemones = async () => {
        const { next, newPokemones } = await getPokemones()
        setPokemones(newPokemones)
        setSiguienteUrl(next)
    }

    const masPokemones = async () => {
        const { next, newPokemones } = await getPokemones(siguienteUrl)
        setPokemones(prev => [...prev, ...newPokemones])
        next === null && setVerMas(false)
        setSiguienteUrl(next)
    }
    useEffect(() => {
        obtenerPokemones()
    }, [])
    return { pokemones, masPokemones, verMas }
}

export default usePokemones