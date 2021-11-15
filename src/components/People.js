import React from 'react';
import {useInfiniteQuery} from 'react-query';
import Person from './Person';

const fetchPeople = async ({pageParam = 1}) => {
    // console.log(pageParam)
    const res = await fetch(`https://swapi.dev/api/people/?page=${pageParam}`)
    return res.json()
};

const People = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery('people', fetchPeople, {
        getNextPageParam: (lastPages, pages) => lastPages.next[lastPages.next.length - 1],
        select: data => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        })
    });



    
    return (
        <div>
            <h2>People</h2>
            {isFetching && <div>IsFetching</div>}
            {status === 'error' && <div> Error on loading</div>}
            {status === 'loading' && <div> Loading ...</div>}
            {status === 'success' && data.pages.map((page) => (
                page.results.map((person, key) => <Person key={key} person={person}/>)
            ))}

            <button onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading more ...' : hasNextPage ? "Load more" : "Nothing more to load"}
            </button>
        </div>
    );
}

export default People;