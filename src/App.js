import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import {QueryClient, QueryClientProvider,} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

function App() {
    const queryClient = new QueryClient();
    let [page, setPage] = useState('planets');

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Star Wars Info</h1>
                <Navbar setPage={setPage}/>
                <div className="content">
                    {page === 'planets' ? <Planets/> : <People/>}
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    );
}

export default App;