import { remove, ref } from "firebase/database";
import { db } from "@/services/firebase-config";

export const handleRowDelete = async (selectedRows, data) => {
  try {
    if (selectedRows.length >= 2) {
      for (const rowId of selectedRows) {
        const selectedRow = data.find((row) => row.id === rowId);
        const deleteRef = ref(
          db,
          `categories/${selectedRow.category}/${rowId}`
        );
        await remove(deleteRef);
      }
    } else {
      alert("Please select at least two rows to delete.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error:", error.message);
  }
};

export const handleSearch = (
  searchTerm,
  category,
  options,
  data,
  setFilteredData
) => {
  const filtered = data.filter((item) => {
    const isMatchingTerm = item.menu
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isMatchingCategory = category ? item.category === category : true;
    const isMatchingOptions = options ? item.options === options : true;
    return isMatchingTerm && isMatchingCategory && isMatchingOptions;
  });
  setFilteredData(filtered);
};
