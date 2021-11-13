import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
    const res = await fetch(`https://swapi.dev/api/people`)
    return res.json()
};

const People = () => {
    const {data, status} = useQuery('people', fetchPeople);
    return (
        <div>
            <h2>People</h2>
            {status === 'error' && <div> Error on loading</div>}
            {status === 'loading' && <div> Loading ...</div>}
            {status === 'success' && data.results.map((person, key) => <Person key={key} person={person}/>)}
        </div>
    );
}

export default People;