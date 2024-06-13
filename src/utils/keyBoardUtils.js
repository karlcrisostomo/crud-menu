export const handleKeyDown = (event, callback) => {
    if (event.key === "Escape") {
      callback(false);
    }
  };