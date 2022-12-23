import React from "react";
import { SearchInputContainer } from "../styles/searchInput.style";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <SearchInputContainer>
      <i>
        <AiOutlineSearch />
      </i>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
