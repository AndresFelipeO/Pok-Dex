
import usePokemones from '../hooks/usePokemones'
import './Pokemones.css'

function Pokemon({id,name,img}) {
    return (
        <div className='pokemon-card'>
            <img className='pokemon-img' src={img} alt={name} />
            <p className='pokemon-title'>
            <span>#{id}</span>
                <span>{name}</span>
            </p>
        </div>
    )
}

function Pokemones() {
    const {pokemones,masPokemones}=usePokemones()
    return (
        <section className='pokemon-container'>
            {
                pokemones.map(pokemon => <Pokemon{...pokemon} key={pokemon.id}/>)
            }
            <button className='btn-buscar' onClick={masPokemones}>Mostrar mas pokemones</button>
        </section>
    )
}
export default Pokemones