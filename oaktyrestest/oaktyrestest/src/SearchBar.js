import { useState } from "react";
import "./searchBar.css";

export default function SearchBar({ onSearch, onChange, placeholder }) {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(keyword);
      }}
    >
      <div className="search-bar-wrapper">
        <input
          // with X icon in the search bar
          type="search"
          // no X icon in the search bar
          // type="text"
          className="search-bar"
          placeholder={placeholder}
          value={keyword}
          onChange={e => {
            if (onChange) onChange(e.target.value);
            setKeyword(e.target.value);
          }}
        />
        <button className="search-button">Search</button>
      </div>
    </form>
  );
}
