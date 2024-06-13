"use client";

import { db } from "@/services/firebase-config";
import { push, ref, set, onValue, update, remove } from "firebase/database";

const { createContext, useContext, useState, useEffect } = require("react");

const FormDataContext = createContext();

export const useFormDataContext = () => {
  return useContext(FormDataContext);
};

export const FormProvider = ({ children }) => {
  const optionsList = [
    "Select Option",
    "Unspecified",
    "Small",
    "Medium",
    "Large",
  ];
  const categoryList = [
    "Select Category",
    "Entrees",
    "Sides",
    "Drinks",
    "Desserts",
    "BreakFast",
    "Salads",
    "Kids' Meals",
  ];

  let [formData, setFormData] = useState({
    id: "",
    menu: "",
    category: "",
    stock: 0,
    options: "",
    price: 0,
  });
  const [data, setData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db, "categories");
      onValue(dataRef, (snapshot) => {
        const dataArray = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          dataArray.push(childData);
        });
        setData(dataArray);
      });
    };
    fetchData();
  }, []);

  const handleSaveData = async () => {
    try {
      if (!formData) {
        alert("Error: No data provided to save.");
        return;
      }

      const dataRef = ref(db, `categories/${formData.category}`);

      if (formData.id) {
        const updatedRef = ref(
          db,
          `categories/${formData.category}/${formData.id}`
        );
        await update(updatedRef, formData);
        alert("Data updated successfully");
        setModalOpen(false);
        return;
      }

      const newDocRef = push(dataRef);
      const newId = newDocRef.key;
      const updatedFormData = { ...formData, id: newId };
      await set(newDocRef, updatedFormData);
      alert("Data saved successfully");
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: An error occurred while saving data.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "menu") {
      const textOnlyPattern = /^[A-Za-z\s]*$/;
      if (!textOnlyPattern.test(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          menu: "Menu can only contain letters and spaces",
        }));
        return;
      } else {
        setValidationErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.menu;
          return newErrors;
        });
      }
    }

    if (name === "price" || name === "stock") {
      if (Number(value) < 0) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } cannot be negative`,
        }));
        return;
      } else {
        setValidationErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setSelectedRowId(item.id);
    setFormData(item);
    setModalOpen(true);
  };

  const handleDelete = async (category, id) => {
    try {
      const deleteRef = ref(db, `categories/${category}/${id}`);
      await remove(deleteRef);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <FormDataContext.Provider
      value={{
        optionsList,
        categoryList,
        handleSaveData,
        handleInputChange,
        formData,
        setFormData,
        data,
        handleEdit,
        handleDelete,
        modalOpen,
        setModalOpen,
        selectedRowId,
        setSelectedRowId,
        validationErrors,
        setValidationErrors,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
