import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";

function Search({handler}) {

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  useEffect(() => {

    handler(debounced)

  }, [debounced])


  return (
    <input className="search"
      type="text"
      name="search"
      placeholder="type your search here..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default Search;
