import React from "react";

import "assets/styles/Search.css";
import searchIcon from "assets/images/search.svg";
import cancelIcon from "assets/images/cancel.svg";

import useSearch from "hooks/useSearch";

import SearchResults from "./SearchResults";

function SearchBar() {
  const {
    handleQueryChange,
    searchRef,
    showMatch,
    showFocus,
    debouncedSearchQuery,
    searchQuery,
    handleIconToggle,
    handleMoreToggle,
  } = useSearch();

  return [
    <div key='bar' className={`SearchBar ${showMatch} ${showFocus}`}>
      <img
        className='App-Search-Icon'
        src={showMatch ? cancelIcon : searchIcon}
        alt='Search Icon'
        onClick={handleIconToggle}
      />
      <input ref={searchRef} onChange={handleQueryChange} value={searchQuery} />
    </div>,
    <SearchResults
      key='results'
      {...{ debouncedSearchQuery, showMatch, handleMoreToggle, searchQuery }}
    />,
  ];
}

export default SearchBar;
