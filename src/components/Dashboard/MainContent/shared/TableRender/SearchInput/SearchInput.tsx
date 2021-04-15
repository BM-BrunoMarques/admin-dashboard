import React, { useEffect, useState } from "react";
import * as SI from "../../../../../../helpers/consts";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";

interface SearchProps {
  setEnhancedRows: React.Dispatch<React.SetStateAction<SI.OrderState[]>>;
  rows: SI.OrderState[];
}

const SearchInput: React.FC<SearchProps> = (props) => {
  const { rows, setEnhancedRows } = props;
  const [searchText, setSearchText] = useState("");

  const searchInRow = (row: SI.OrderState) => {
    return (
      row.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      row.address
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      row.country
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      row.id
        .toString()
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  };

  useEffect(() => {
    setEnhancedRows(rows.filter((row) => searchInRow(row)));
  }, [searchText]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Input
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 9,
        width: 180,
      }}
      value={searchText}
      onChange={handleSearchText}
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
