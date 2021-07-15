import { useState, useEffect, useRef } from "react";

import useDebounce from "./useDebounce";
import useActions from "./useActions";

function useSearch() {
  const actions = useActions();
  const [searchQuery, setSearchQuery] = useState("");

  const searching = useRef("");
  const searchFocused = useRef(false);
  const searchRef = useRef(null);

  function setSearching(phrase) {
    searching.current = phrase;
  }
  const debouncedSearchQuery = useDebounce(searchQuery, 870);

  const showMatch =
    debouncedSearchQuery && searchQuery === debouncedSearchQuery ? "Match" : "";

  function handleQueryChange(event) {
    const text = event.target.value;
    setSearchQuery(text);
  }

  function handleIconToggle() {
    if (showMatch) {
      searchRef.current.blur();
      setSearchQuery("");
    } else {
      searchRef.current.focus();
    }
  }

  useEffect(() => {
    if (
      searchQuery &&
      debouncedSearchQuery &&
      searching.current !== debouncedSearchQuery
    ) {
      setSearching(debouncedSearchQuery);
      actions?.SEARCH_QUERY?.(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, actions, searchQuery]);

  return {
    setSearchQuery,
    handleQueryChange,
    searchQuery,
    debouncedSearchQuery,
    searchRef,
    searchFocused,
    handleIconToggle,
    showMatch,
  };
}

export default useSearch;
