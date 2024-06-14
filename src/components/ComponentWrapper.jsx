"use client";
import { useFormDataContext } from "@/context/FormDataContext";
import { Notification, Table } from ".";

const ComponentWrapper = () => {
  const { isNotification } = useFormDataContext();

  return (
    <div>
      <Table />

      {isNotification && (
        <Notification
          message={isNotification.message}
          type={isNotification.type}
          duration={isNotification.duration}
        />
      )}
    </div>
  );
};

export default ComponentWrapper;
