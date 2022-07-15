import React, {useState} from 'react'
import { Box, Container, TextInput, Grid } from '@mantine/core'
import SearchPost from '../SearchPost/SearchPost'
import DisplayPost from '../Display/DisplayPost'
export default function Home() {
  const [page, setPage] = useState('search')
  const [id, setId] = useState('');
    const styleSettings = {
        height:"calc(100vh - 80px)",
        width:'calc(100vw - 10px)'
    }
  return (
    <div style={styleSettings}>
      {page === 'search' ? (
        <SearchPost setId={setId} setPage={setPage} page={page}></SearchPost>
      ) : (
        <DisplayPost id={id} setPage={setPage} page={page} />
      )}
    </div>
  )
}
