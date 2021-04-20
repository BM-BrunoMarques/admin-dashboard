import React, { useEffect, useState } from "react";
import * as SI from "../../../../../../helpers/consts";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";

interface SearchProps {
  setEnhancedRows: React.Dispatch<
    React.SetStateAction<SI.OrderState[] | SI.UserState[]>
  >;
  rows: any;
}

function isUserState(
  rows: SI.OrderState[] | SI.UserState[]
): rows is SI.UserState[] {
  return (rows as SI.UserState[]) !== undefined;
}

const SearchInput: React.FC<SearchProps> = (props) => {
  const { rows, setEnhancedRows } = props;
  const [searchText, setSearchText] = useState("");

  const searchInOrders = (row: SI.OrderState) => {
    return (
      row.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      row.address
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      row.country.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      row.id
        .toString()
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  };

  const searchInUsers = (row: SI.UserState) => {
    return row.authentication.email
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
  };

  useEffect(() => {
    if (rows[0]?.id) {
      setEnhancedRows(
        (rows as SI.OrderState[]).filter((row) => searchInOrders(row))
      );
    } else {
      setEnhancedRows(
        (rows as SI.UserState[]).filter((row) => searchInUsers(row))
      );
    }
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
