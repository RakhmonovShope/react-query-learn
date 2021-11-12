import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Planet from './Planet';


const fetchPlanets = async (key, greetings, page) => {
    // console.log(props)
    console.log(greetings)

    const res = await fetch(`https://swapi.dev/api/planets`)
    return res.json()
}

const Planets = () => {
    const [page, setPage] = useState(1)
    const {data, status} = useQuery(['planets', 'hello ninjas', page], fetchPlanets);

    return (
        <div>
            <h2>Planets</h2>
            <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button>
            {status === 'loading' && <div> Loading ...</div>}
            {status === 'error' && <div> Error on loading</div>}
            {/*{status === 'success' && data.results.map((planet, key) => <Planet key={key} planet={planet}/>)}*/}
        </div>
    );
}

export default Planets;