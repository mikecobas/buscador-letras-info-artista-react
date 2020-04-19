import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './componentes/Formulario'
import Cancion from './componentes/Cancion';
import Info from './componentes/Info';
import axios from 'axios'

function App() {

  const [ buscarletra, guardarBuscarLetra]= useState({});
  const [letra, guardarLetra] = useState('');
  const  [info, guardarInfo] = useState([]);

  useEffect(()=>{
    if(Object.keys(buscarletra).length === 0) return

    const consultarApiLetra = async () =>{

      const {artista,cancion}=buscarletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      // HACER LA PETICION A 2 APIS SIMULTANEOS SIN QUE DEPENDA UNA DE LA OTRA SE USA PROMISE Y ES POR MEDIO DE ARREGLOS
      const [ letra, informacion ] = await Promise.all([
        axios.get(url), axios.get(url2)
      ]  )

      guardarLetra(letra.data.lyrics)
      guardarInfo(informacion.data.artists[0])
    }
    consultarApiLetra()
  },[buscarletra, info])
  return (
    
    <Fragment>
      <Formulario
        guardarBuscarLetra={guardarBuscarLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"
          >
          <Info 
           info={info}
          />

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
