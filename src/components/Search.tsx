import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";

function Search() {

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);


  useEffect(() => {

    if(debounced.length > 0) console.log(debounced)

  }, [debounced])


  return (
    <input
      type="text"
      name="search"
      placeholder="type your search here..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default Search;
