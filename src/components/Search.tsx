import '../styles/components/search.sass';

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

function Search({handler}: {handler: (arg0: string) => void}) {

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  useEffect(() => {
    handler(debounced)
  }, [debounced, handler])

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

export default Search