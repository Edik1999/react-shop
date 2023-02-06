import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { RootState, useAppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
// import '../styles/components/search.sass';

function Search({handler}) {

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const dispatch = useAppDispatch();
  

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
