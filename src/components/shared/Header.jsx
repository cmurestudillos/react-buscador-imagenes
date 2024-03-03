import { useState } from 'react';
import Error from './Error';
import logo from '../../assets/img/logo.png';
import { version } from '../../../package.json'

const Header = ({ guardarBusqueda }) => {
  const [termino, guardarTermino] = useState('');
  const [error, guardarError] = useState(false);

  const buscarImagenes = e => {
    e.preventDefault();

    // validar
    if(termino.trim() === '') {
        guardarError(true);
        return;
    }
    guardarError(false);

    guardarBusqueda(termino);
  }

  return (
    <header className="header">
      <div className='logo'>
        <img src={logo} alt=" Logo" className="logo-img" />
        <a href='/' className='logo-text'>PIXIMG</a> v.{version}
      </div>

      <input className="side-menu" type="checkbox" id="side-menu"/>
      <label className="hamb" htmlFor="side-menu">
        <span className="hamb-line"></span>
      </label>

      <nav className="nav">
        <ul className="menu">
          <li><input className="input-elevated" type="text" name="query" placeholder="Buscar..." onChange={e => guardarTermino(e.target.value)} /></li>
          <li><button className='button' onClick={buscarImagenes}>Buscar</button></li>
          { error ? <Error mensaje="Agrega un término de búsqueda" /> : null } 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
