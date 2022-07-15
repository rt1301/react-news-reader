import React, { useEffect, useState, useRef } from 'react'
import { Grid } from '@mantine/core'
import './SearchPost.css'
import axios from 'axios';
import NewsLayout from '../NewsLayout/NewsLayout';
export default function SearchPost({ setId, setPage, page }) {
    const BASE_URL = 'https://hn.algolia.com/api/v1/search?query='
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}${search}`);
            let data = res.data?.hits;
            setSearchData([...data]);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div className='relative top-10'>
            <Grid className='px-5'>
                <Grid.Col span={5} className='flex flex-col items-center w-full h-[600px] justify-center'>
                    <h1 id='main_heading' className='text-[80px] text-white text-center my-10'>Hacker News</h1>
                    <form className='dark w-4/5'>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-s2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Articles, info .." onChange={(e) => { setSearch(e.target.value) }} />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSearch()
                                }}
                            >Search</button>
                        </div>
                    </form>
                </Grid.Col>
                <Grid.Col span={7}>
                    <NewsLayout page={page} data={searchData} setPage={setPage} setId={setId} loading={loading}></NewsLayout>
                </Grid.Col>
            </Grid>
        </div>
    )
}
