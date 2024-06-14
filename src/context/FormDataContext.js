"use client";

import { IslandNotification } from "@/components";
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
  const [isNotification, setNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

      if (formData.id) {
        // Check if formData.id exists
        const updatedRef = ref(
          db,
          `categories/${formData.category}/${formData.id}`
        );
        await update(updatedRef, formData);

        setNotification({
          message: "Menu Updated Successfully!",
          type: "Success",
          duration: 1000,
        });

        setModalOpen(false);
        return;
      }

      const dataRef = ref(db, `categories/${formData.category}`);
      const newDocRef = push(dataRef);
      const newId = newDocRef.key;
      const updatedFormData = { ...formData, id: newId };
      await set(newDocRef, updatedFormData);
      setNotification({
        message: "Menu Saved Successfully!",
        type: "Success",
        duration: 1000,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error.message);
      setNotification({
        message: "Error: An error occurred while saving data.",
        type: "error",
        duration: 1000,
      });
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
    setIsEditing(true);
  };

  const handleDelete = async (category, id) => {
    try {
      const deleteRef = ref(db, `categories/${category}/${id}`);
      await remove(deleteRef);
      setNotification({
        message: "Menu deleted successfully!",
        type: "Success",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error:", error.message);
      setNotification({
        message: "Error: An error occurred while deleting Menu.",
        type: "error",
        duration: 1000,
      });
    }
  };

  return (
    <FormDataContext.Provider
      value={{
        isNotification,
        isEditing,
        setIsEditing,
        setNotification,
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
