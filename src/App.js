import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './componentes/Formulario'
import axios from 'axios'
import Cancion from './componentes/Cancion';
function App() {

  const [ buscarletra, guardarBuscarLetra]= useState({});
  const [letra, guardarLetra] = useState('');

  useEffect(()=>{
    if(Object.keys(buscarletra).length === 0) return

    const consultarApiLetra = async () =>{

      const {artista,cancion}=buscarletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`

      const resultado = await axios.get(url)
      guardarLetra(resultado.data.lyrics)
    }
    consultarApiLetra()
  },[buscarletra])
  return (
    
    <Fragment>
      <Formulario
        guardarBuscarLetra={guardarBuscarLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"
          >

          </div>
          <div className="col-md-6"
          >
              <Cancion
              letra={letra}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
