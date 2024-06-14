"use client";

import { useFormDataContext } from "@/context/FormDataContext";
import { useEffect, useState } from "react";

const IslandNotification = ({ message, type, duration }) => {
  const { setNotification } = useFormDataContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, setNotification]);

  return (
    <div className=" fixed top-[5em] left-0 flex justify-center w-full z-50 ">
      <span
        className={` p-4 rounded-md text-white  ${
          type === "Success" ? "bg-green-700" : " bg-red-600"
        }  `}
      >
        {message}
      </span>
    </div>
  );
};

export default IslandNotification;
