import { useState, useEffect } from 'react'
import './assets/css/App.css'
import Header from './components/shared/Header';
import ListadoImagenes from './components/ListadoImagenes';
import Footer from './components/shared/Footer';

function App() {
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const consultarApi = async () => {
        if(busqueda === '' ) return;

        const imagenesPorPagina = 30;
        const key = '20470204-c53f8a8ee90591b468254d283';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
    
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);

        // calcular el total de paginas
        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
        guardarTotalPaginas(calcularTotalPaginas);
    }
    consultarApi();
  }, [busqueda, paginaactual])

  // definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    // Evitar numeros negativos en la paginacion
    if(nuevaPaginaActual === 0 ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    // Evitar superar el numero total de paginas e ir mas alla
    if(nuevaPaginaActual > totalpaginas ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div>
      <Header guardarBusqueda={guardarBusqueda} />
      <main>
        {imagenes.length > 0 &&
          <>
            <ListadoImagenes imagenes={imagenes} />
            <div className='pageButtons'>
              {paginaactual === 1 ? null : (
                <button type="button" className='button' onClick={paginaAnterior} >&laquo; Anterior </button>
              )}

              {paginaactual === totalpaginas ? null : (
                <button type="button" className='button' onClick={paginaSiguiente} >Siguiente &raquo;</button>
              )}
            </div>
          </>
        }
      </main>     
      <Footer />
    </div>
  )
}

export default App
