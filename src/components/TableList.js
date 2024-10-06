import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteExpense,
  setSelectedItem,
  setIsFormVisible,
} from "../store/expenseSlice";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import ExpenseChart from "./ExpenseChart";

const TableList = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const initialEntries = useSelector((state) => state.expenses.expenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState(expenses);

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = expenses.filter((entry) =>
      entry.name.toLowerCase().includes(query)
    );

    setFilteredEntries(filtered);
  };

  const editItem = (row) => {
    dispatch(setIsFormVisible(true));
    dispatch(setSelectedItem(row));
    navigate("/");
  };

  useEffect(() => {
    setFilteredEntries(expenses);
  }, [expenses]);

  // State for form visibility and input values
  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4">List view</h1>
      {/* Search Bar */}
      <div className="mb-4">
        <label htmlFor="search" className="sr-only">
          Search by name
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search expenses by name"
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white border border-gray-200"
          role="table"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border text-left">Expense Name</th>
              <th className="px-4 py-2 border text-left">Amount ($)</th>
              <th className="px-4 py-2 border text-left">Type</th>
              <th className="px-4 py-2 border text-left">Created Date</th>
              <th className="px-4 py-2 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{entry.name}</td>
                  <td className="px-4 py-2 border">{entry.amount}</td>
                  <td className="px-4 py-2 border">{entry.type}</td>
                  <td className="px-4 py-2 border">
                    {entry.createdDate
                      ? format(new Date(entry.createdDate), "MMMM dd, yy") // Format the date
                      : ""}
                    {/* {entry.createdDate} */}
                  </td>
                  <td className="px-4 py-2 border">
                    <div>
                      <button
                        className="text-blue-500 mr-4"
                        onClick={() => editItem(entry)}
                        aria-label={`Edit ${entry.name}`}
                      >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => dispatch(deleteExpense(entry.id))}
                        className="text-red-500"
                        aria-label={`Delete ${entry.name}`}
                      >
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-2 border text-center text-gray-500"
                >
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ExpenseChart */}
      <ExpenseChart></ExpenseChart>
    </div>
  );
};

export default TableList;
