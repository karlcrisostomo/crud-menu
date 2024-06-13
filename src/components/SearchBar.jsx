"use client";

import { useState } from "react";
import { TextField, InputAdornment, MenuItem, Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFormDataContext } from "@/context/FormDataContext";

const SearchBar = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState("");

  const { categoryList, optionsList } = useFormDataContext();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, category, options);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onSearch(searchTerm, e.target.value, options);
  };
  const handleOptionChange = (e) => {
    setOptions(e.target.value);
    onSearch(searchTerm, category, e.target.value);
  };

  return (
    <div className=" mb-6">
      <Box
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
        }}
      >
        <Grid item className=" min-[0px]:flex flex-col gap-4 sm:flex-row">
          <TextField
            value={searchTerm}
            onChange={handleSearch}
            label="Search"
            variant="outlined"
            size="small"
            placeholder="Search for Menu"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className=" mr-4"
          />
          <TextField
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            variant="outlined"
            size="small"
            select
            className=" mr-4"
          >
            <MenuItem value="">All</MenuItem>
            {categoryList.slice(1).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={options}
            onChange={handleOptionChange}
            label="Options"
            variant="outlined"
            size="small"
            select
          >
            <MenuItem value="">All</MenuItem>
            {optionsList.slice(1).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchBar;
