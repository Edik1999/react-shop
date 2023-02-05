import React, {useEffect, useState} from 'react'
import { useDebounce } from '../hooks/debounce';

function Fullmenu() {

    const [search, setSearch] = useState('');
    const debounced = useDebounce(search, 500)

    useEffect(() => {

      if(debounced.length > 0) console.log(debounced)
      
    }, [debounced])  

  return (
    <div>
        <input type="text" name="search" placeholder='type your search here...' value={search} onChange={e => setSearch(e.target.value)}/>
    </div>
  )
}

export default Fullmenu