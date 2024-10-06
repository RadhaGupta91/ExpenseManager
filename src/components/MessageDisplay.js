import React from "react";

const MessageDisplay = ({ message, type }) => {
  return (
    <div
      className={`p-4 m-4 text-sm ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      } rounded-md`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default MessageDisplay;
