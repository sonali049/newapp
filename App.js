import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function News() {
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
    const [value, setValue] = useState("sonali");
    
    async function sk(query) {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=ed166bd00d2d4f9898327213ad4f21af`);
        let result = await response.json();
        console.log(result); // Inspect the fetched data
        
        if (result.articles && result.articles.length > 0) {
            let p = result.articles.map((a) => {
                return (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg" key={a.title}>
                        <img className="w-full" src={a.urlToImage} alt="Article"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{a.title}</div>
                            <p className="text-gray-700 text-base">{a.description}</p>
                            <a className="font-bold text-xl" href={a.url}> Read More</a>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {a.tags && a.tags.map(tag => (
                                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                            ))}
                        </div>
                    </div>
                );
            });
            console.log(p);
            setValue(p);
        }
    }

    useEffect(() => {
        sk("tesla"); // Fetch news data for default query (tesla)
    }, []); // Run once on component mount

    const handleSearch = () => {
        sk(searchQuery); // Fetch news data based on search query
    }

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NEWS</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
            </nav>
            
            {/* Search bar */}
            <div className="flex justify-center mt-4">
                <input type="text" className="border border-gray-300 rounded-md py-2 px-4 mr-2" placeholder="Search for news..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>Search</button>
            </div>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">i m happy {value} </div>
        </div>
    );
   
}

export default News;
