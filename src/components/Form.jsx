"use client";

import { useFormDataContext } from "@/context/FormDataContext";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";
import { handleKeyDown } from "@/utils/keyBoardUtils";
import { onSubmitValidation } from "@/utils/onSubmitValidation";


const Form = ({ data }) => {
  const {
    handleInputChange,
    handleSaveData,
    formData,
    modalOpen,
    setModalOpen,
    setFormData,
    selectedRowId,
    setSelectedRowId,
    optionsList,
    categoryList,
    validationErrors,
    setValidationErrors,
  } = useFormDataContext();

  const initialField = {
    menu: "",
    category: categoryList[1],
    stock: 0,
    options: optionsList[1],
    price: 0,
  };

  const formRef = useRef(null);

  /* eslint-disable */
  useEffect(() => {
    if (modalOpen && selectedRowId === null) {
      setFormData(initialField);
    } else if (!modalOpen) {
      setFormData(initialField);
      setValidationErrors({});
      setSelectedRowId(null);
    }
  }, [modalOpen, setFormData, selectedRowId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDownEvent = (e) => {
      handleKeyDown(e, setModalOpen);
    };

    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [modalOpen]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const isValid = onSubmitValidation(formData, data, setValidationErrors);

    if (isValid) {
      handleSaveData();
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed h-screen bg-black/25 z-50 flex flex-col justify-center items-center w-full left-0 top-0">
          <form
            className="flex flex-col"
            onSubmit={(e) => handleSubmit(e)}
            ref={formRef}
          >
            <div className="flex-col flex w-[400px] h-full bg-white rounded-lg outline-double outline-white/10 p-4">
              <div className=" mb-8 flex justify-between ">
                <label className=" text-center  ">
                  {selectedRowId == null ? "ADD MENU ITEM " : "EDIT MENU ITEM"}
                </label>

                <span
                  className=" border rounded-md cursor-pointer hover:shadow-md hover:border-black/35"
                  onClick={() => setModalOpen(false)}
                >
                  <RxCross2 color="red" size={25} />
                </span>
              </div>

              <label>MENU</label>
              <input
                type="text"
                name="menu"
                value={formData.menu}
                onChange={handleInputChange}
                placeholder="menu"
              />
              {validationErrors.menu && (
                <span className="text-red-500">{validationErrors.menu}</span>
              )}

              <label>CATEGORY</label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange(e)}
                name="category"
              >
                {categoryList.map((option, index) => (
                  <option disabled={index === 0} key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {validationErrors.category && (
                <span className="text-red-500">
                  {validationErrors.category}
                </span>
              )}
              <label>STOCK</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="stock"
              />
              {validationErrors.stock && (
                <span className="text-red-500">{validationErrors.stock}</span>
              )}

              <label>OPTIONS</label>
              <select
                value={formData.options}
                onChange={(e) => handleInputChange(e)}
                name="options"
              >
                {optionsList.map((option, index) => (
                  <option key={index} disabled={index === 0} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {validationErrors.options && (
                <span className="text-red-500">{validationErrors.options}</span>
              )}
              <label>PRICE</label>
              <input
                type="number"
                step="1"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="price"
              />
              {validationErrors.price && (
                <span className="text-red-500">{validationErrors.price}</span>
              )}
              <span className=" flex justify-center mt-4 ">
                <button
                  className=" uppercase bg-red-600 w-fit p-2 px-4 rounded-md hover:shadow-xl hover:bg-red-700 text-white"
                  type="submit"
                >
                  Submit
                </button>
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
