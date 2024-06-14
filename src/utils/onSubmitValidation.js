export const onSubmitValidation = (formData, data, setErrors) => {
  const errors = {};

  const duplicateMenu = data.find(
    (item) =>
      item.id !== formData.id &&
      item.menu.trim().toLowerCase() === formData.menu.trim().toLowerCase() &&
      item.category === formData.category &&
      item.stock === formData.stock &&
      item.options === formData.options &&
      item.price === formData.price
  );

  if (!formData.menu.trim()) {
    errors.menu = "Menu is required";
  } else if (duplicateMenu) {
    errors.menu = "Menu already exists";
  }

  if (formData.category === "Select Category") {
    errors.category = "Category is required";
  } else if (duplicateMenu) {
    errors.category = "Category already exists";
  }

  if (formData.stock <= 0) {
    errors.stock = "Stock must be greater than 0";
  } else if (duplicateMenu) {
    errors.stock = "Stock already exists";
  }

  if (formData.options === "Select Option") {
    errors.options = "Please select a valid option";
  } else if (duplicateMenu) {
    errors.options = "Options already exists";
  }

  if (formData.price <= 0) {
    errors.price = "Price must be greater than 0";
  } else if (duplicateMenu) {
    errors.price = "Price already exists";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};
