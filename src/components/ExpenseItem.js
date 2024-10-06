import { useDispatch } from "react-redux";
import {
  deleteExpense,
  setSelectedItem,
  setIsFormVisible,
} from "../store/expenseSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { format } from "date-fns";

const ExpenseList = (props) => {
  const { entry } = props;
  const dispatch = useDispatch();

  const editItem = (row) => {
    dispatch(setIsFormVisible(true));
    dispatch(setSelectedItem(row));
  };

  return (
    <article
      key={entry.id}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-labelledby={`entry-${entry.id}`}
    >
      <div className="container flex justify-between items-center pt-6">
        <h3 id={`entry-${entry.id}`} className="text-2xl font-bold">
          {entry.name}
        </h3>
        <div>
          <button
            className="text-blue-500 mr-1"
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
      </div>
      <p className="text-gray-400 mb-4">
        {entry.createdDate
          ? format(new Date(entry.createdDate), "MMM dd, yy") // Format the date
          : "N/A"}
      </p>
      <p className="text-gray-700 mb-4">Amount: ${entry.amount}</p>
      <span
        className={`${
          entry.type === "Cloths"
            ? "bg-purple-400"
            : entry.type === "General"
            ? "bg-blue-400"
            : entry.type === "Grocery"
            ? "bg-green-400"
            : entry.type === "Electronics"
            ? "bg-yellow-400"
            : entry.type === "Travel"
            ? "bg-red-400"
            : "bg-gray-400"
        } text-white px-1 py-1 rounded-lg`}
      >
        {entry.type}
      </span>
      <br />
    </article>
  );
};

export default ExpenseList;
