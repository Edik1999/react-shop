import '../styles/components/search.sass';

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {useTranslation} from "react-i18next";

function Search({handler}: {handler: (arg0: string) => void}) {

  const [search, setSearch] = useState("");

  const debounced = useDebounce(search, 300);
  const { t } = useTranslation();

  useEffect(() => {
    handler(debounced)
  }, [debounced, handler])

  return (
    <input className="search"
      type="text"
      name="search"
      placeholder={t('inputSearchPlaceholder')}
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

export default Search