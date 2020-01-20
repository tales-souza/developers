 import React, { useEffect , useState} from "react";
 import api from '../services/api';


const Form = (props) => {
  
  const { prop1, prop2  } = props; 
  const [ devs, setDevs ] = useState('')
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude]= useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setLatitude(latitude);
      setLongitude(longitude);
    },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  

  async function handleAddDev(e){
    e.preventDefault();
    const response = await api.post('/devs', {
      github_username, 
      techs,
      latitude,
      longitude,
    })

    setGithub_username(prop1);
    setTechs(prop2);
    setDevs([...devs, response.data]);
  }


  return (


    <div className="card border-primary mb-3" style={{ width: 500 }}>
      <div className="card-header">Cadastrar</div>
      <form onSubmit={handleAddDev} style={{ padding:10 }}>
        <div className="form-row">
          <div className="col-8">
            <input required onChange={ e => setGithub_username(e.target.value)} className="form-control" id="github_username" name="github_username" />
          </div>
          <label htmlFor="github_username">Usuário do Github</label>


        </div>

        <div class="form-row">
          <div className="col-8">
            <input required onChange={ e => setTechs(e.target.value)} className="form-control" id="techs"  name="techs" />
          </div>
          <label htmlFor="techs">Tecnologias</label>


        </div>

        

        


        <div className="form-row">
          <div className="col-8">
            <input onChange={ e => setLatitude(e.target.value)} type="number" value={latitude} className="form-control" id="latitude"  name="latitude" />
          </div>
          <label htmlFor="latitude">Latitude </label>
        </div>

        <div className="form-row">
          <div className="col-8">
            <input onChange={ e => setLongitude(e.target.value)} type="number" value={longitude} className="form-control" id="longitude"  name="longitude" />
          </div>
          <label htmlFor="longitude">Longitude </label>
        </div>
        <br/>

    
        <button type="submit"className="btn btn-primary btn-lg active"> Cadastrar </button>

        
        


      </form>
    </div>
  );
}

export default Form;
