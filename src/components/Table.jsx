"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/services/firebase-config";
import { onValue, ref } from "firebase/database";
import { Form, SearchBar } from ".";
import { Box, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { handleRowDelete, handleSearch } from "@/utils/tableHandlers";

import { useFormDataContext } from "@/context/FormDataContext";
import Constants from "@/constants";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { columns } = Constants();
  const { setModalOpen } = useFormDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "categories");

        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const menuItems = snapshot.val();

            const rows = [];
            Object.entries(menuItems).forEach(([category, items]) => {
              Object.entries(items).forEach(([itemId, itemData]) => {
                rows.push({
                  id: itemId,
                  menu: itemData.menu,
                  category: category,
                  stock: itemData.stock,
                  options: itemData.options,
                  price: itemData.price,
                });
              });
            });
            setData(rows);
            setFilteredData(rows);
          } else {
            setData([]);
            setFilteredData([]);
          }
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="min-[200px]:p-6 max-w-7xl mx-auto flex flex-col h-screen justify-center">
    
      <Box sx={{ width: "100%" }}>
        <Grid item>
          <SearchBar
            data={data}
            onSearch={(searchTerm, category, options) =>
              handleSearch(searchTerm, category, options, data, setFilteredData)
            }
          />
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item>
            {selectedRows.length === 0 ? (
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                Add Menu
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRowDelete(selectedRows, data)}
              >
                Bulk Delete
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            sx={{
              fontFamily: "Poppins, sans-serif",
              boxShadow: 2,
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "orange",
                fontWeight: "bold",
              },
            }}
            rows={filteredData}
            columns={[...columns]}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            localeText={{ noRowsLabel: "No Items Added" }}
          />
        </Grid>
      </Box>
      <Form data={data} />
    </section>
  );
};

export default Table;
