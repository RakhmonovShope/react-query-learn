import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page = 1) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    return res.json()
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData
    } = useQuery(['planets', page], () => fetchPlanets(page), {keepPreviousData: true, staleTime: 30000});

    return (
        <div>
            <h2>Planets</h2>
            <button onClick={() => setPage(old => Math.max(old - 1, 1))}>Previous Page</button>
            <button>{page}</button>
            <button onClick={() => {
                if (!isPreviousData && data?.next)
                    setPage(old => old + 1)
            }}>Next Pages
            </button>
            {isFetching ? <span> Loading...</span> : null}{' '}
            {isLoading ? <div> Loading ...</div> : isError ?
                <div> {error}</div> : data.results.map((planet, key) => <Planet key={key} planet={planet}/>)}

        </div>
    );
}

export default Planets;