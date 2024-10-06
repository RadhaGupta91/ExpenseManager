import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedItem,
  setIsFormVisible,
  deleteAllItems,
} from "../store/expenseSlice";
import AddExpense from "./AddExpense";

import ExpenseChart from "./ExpenseChart";
import ExpenseItem from "./ExpenseItem";
import MessageDisplay from "./MessageDisplay";

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const isFormVisible = useSelector((state) => state.expenses.isFormVisible);
  const [filteredEntries, setFilteredEntries] = useState(expenses);
  const [message, setMessage] = useState(""); // State for feedback message

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = expenses.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.type.toLowerCase().includes(query)
    );

    setFilteredEntries(filtered);
  };

  useEffect(() => {
    setFilteredEntries(expenses);
  }, [expenses]);

  return (
    <div className="p-4 w-full md:w-3/4 mx-auto">
      {/* Conditionally Render Form */}
      {isFormVisible && <AddExpense />}

      {message && <MessageDisplay message={message} type="success" />}

      {/* Expense List */}
      <div className="container flex justify-between items-center pt-6">
        <h2 className="text-2xl font-bold">Expense List</h2>
        {/* Toggle Add Expense Form */}
        <div>
          {!isFormVisible && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {
                dispatch(setIsFormVisible(true));
                dispatch(setSelectedItem(""));
              }}
              aria-label="Add New Expense"
            >
              ADD New Expense
            </button>
          )}

          <button
            className="mx-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              dispatch(deleteAllItems(null));
              setMessage("All Expenses have been deleted successfully!");
              setTimeout(() => {
                setMessage(""); // Hide the form
              }, 2000);
            }}
            aria-label="Delete All Expenses"
          >
            Delete All
          </button>
        </div>
      </div>
      {expenses.length === 0 && <p>No expenses added yet.</p>}
      <div className="container mx-auto pt-6">
        {/* Search Bar */}
        <div className="mb-4">
          <label htmlFor="search" className="sr-only">
            Search by name
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name & amount..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search expenses by name"
          />
        </div>

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredEntries.map((entry) => (
            <ExpenseItem entry={entry} key={entry.id}></ExpenseItem>
          ))}
        </div>
      </div>

      {/* ExpenseChart */}
      <ExpenseChart></ExpenseChart>
    </div>
  );
};

export default ExpenseList;
