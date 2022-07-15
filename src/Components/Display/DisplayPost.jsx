import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NewsLayout from '../NewsLayout/NewsLayout';
export default function DisplayPost({ id, setPage, page }) {
  const BASE_URL = 'https://hn.algolia.com/api/v1/items/'
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${id}`)
      setData({ ...res.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-4/5 relative top-10 m-auto'>
      <a href="#" onClick={(e) => {
        e.preventDefault();
        setPage("search");
      }} className='text-white underline text-lg mb-4'>Go Back</a>
      <NewsLayout data={data} setPage={setPage} id={id} loading={loading} page={page}></NewsLayout>
    </div>
  )
}
