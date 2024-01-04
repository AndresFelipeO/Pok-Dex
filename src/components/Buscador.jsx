import './buscador.css'
import {Buscar} from './Icons';

function Buscador(){
    return (
        <>
            <h3 className='titulo'>Nintendo no me demandes :,D</h3>
            <section className='container-buscar'>
                <input type='text' placeholder='Encuentra tu pokemon' className='input-buscar'></input>
                <button className='btn-buscar'>
                    <Buscar/>
                    Buscar Pokemon
                </button>
            </section>
        </>
    )
}

export default Buscador;