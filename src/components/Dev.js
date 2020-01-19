import React, { useEffect, useState } from "react";
import api from '../services/api';
import './StyleDev.css'


const Dev = () => {
    const [devs, setDevs] = useState([]);
    
    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    }, []);


    return (


        <div id="card">
            {devs.map(dev => (
                <div className="card" style={{ width: 300, marginBottom: 10 }}>
                    <img src={dev.avatar_url} class="rounded-img-top" alt="Card image cap" />
                    <b style={{ fontSize: 20 }}>{dev.name}</b>
                    <p className="card-text"> {dev.techs.join(' , ')} </p>


                    <div className="card-body">
                        <i> <p> {dev.bio}</p></i>
                        <a href={`https://github.com/${dev.github_username}`}> Acessar perfil no gitHub </a>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default Dev;