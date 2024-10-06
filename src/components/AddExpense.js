import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  updateExpense,
  setIsFormVisible,
} from "../store/expenseSlice";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import MessageDisplay from "./MessageDisplay";

const AddExpense = (props) => {
  const selectedItem = useSelector((state) => state.expenses.selectedItem);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [createdDate, setCreatedDate] = useState(null);
  const [message, setMessage] = useState(""); // State for feedback message
  const [messageType, setMessageType] = useState("success"); // State for feedback message
  const dispatch = useDispatch();

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (name && amount && type) {
      if (selectedItem) {
        dispatch(
          updateExpense({
            id: selectedItem.id,
            name,
            amount: parseFloat(amount),
            type,
            createdDate,
          })
        );
        setMessage("Expense updated successfully!");
      } else {
        dispatch(
          addExpense({
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            type,
            createdDate,
          })
        );
        setMessage("Expense added successfully!");
      }
      setName("");
      setAmount("");
      setType("");
      setCreatedDate("");
      setTimeout(() => {
        dispatch(setIsFormVisible(false)); // Hide the form
      }, 2000);
    } else {
      setMessage("Please input all fields");
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (selectedItem != null) {
      setName(selectedItem.name);
      setId(selectedItem.id);
      setAmount(selectedItem.amount);
      setType(selectedItem.type);
      setCreatedDate(selectedItem.createdDate);
    }
  }, [selectedItem]);

  return (
    <motion.div
      className="mt-4"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      <h3 className="text-xl font-bold mb-2">
        {selectedItem ? "Edit " : "Add New "}Expense
      </h3>
      <form onSubmit={handleAddExpense} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Expense Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-label="Expense Name"
        />
        <input
          type="number"
          placeholder="Amount"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          aria-label="Amount"
        />
        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          aria-label="Type"
        >
          <option value="">Choose Type</option>
          <option value="General">General</option>
          <option value="Grocery">Grocery</option>
          <option value="Cloths">Cloths</option>
          <option value="Electronics">Electronics</option>
          <option value="Travel">Travel</option>
        </select>

        <div>
          <label htmlFor="date" className="block text-gray-700">
            Created Date:
          </label>
          <DatePicker
            selected={createdDate}
            onChange={(date) => setCreatedDate(date)}
            className="border border-gray-300 p-2 rounded-md"
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
            required
            aria-label="createdDate"
          />
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-3">
          <button
            type="submit"
            aria-label={selectedItem ? "Update" : "Add"}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-6000"
          >
            {selectedItem ? "Update" : "Add"}
          </button>
          {/* <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" onClick={() => setIsFormVisible(!isFormVisible)}>Cancel</button> */}
          <button
            aria-label="cancel"
            onClick={() => dispatch(setIsFormVisible(false))}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {message && <MessageDisplay message={message} type={messageType} />}
    </motion.div>
  );
};

export default AddExpense;
