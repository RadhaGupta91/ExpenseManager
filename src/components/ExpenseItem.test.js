import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseItem from "./ExpenseItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  setSelectedItem,
  setIsFormVisible,
  deleteExpense,
} from "../store/expenseSlice";
import "@testing-library/jest-dom";

// Mock store
const mockStore = configureStore([]);

describe("ExpenseItem Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        expenses: [],
      },
    });
  });

  const mockEntry = {
    id: "1",
    name: "Groceries",
    amount: 50.0,
    type: "Grocery",
    createdDate: new Date().toISOString(),
  };

  test("renders expense item details correctly", () => {
    render(
      <Provider store={store}>
        <ExpenseItem entry={mockEntry} />
      </Provider>
    );

    // Check if the name, amount, and type are rendered correctly
    expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    // expect(screen.getByText(/50.0/i)).toBeInTheDocument(); // to check string
    expect(screen.getByText(/\$50(\.0)?/i)).toBeInTheDocument();
    expect(screen.getByText(/grocery/i)).toBeInTheDocument();
  });

  test("handles edit button click", () => {
    store.dispatch = jest.fn(); // Mock dispatch

    render(
      <Provider store={store}>
        <ExpenseItem entry={mockEntry} />
      </Provider>
    );

    // Simulate clicking the edit button
    fireEvent.click(screen.getByLabelText(/Edit Groceries/i));

    // Check if the setIsFormVisible and setSelectedItem were dispatched
    expect(store.dispatch).toHaveBeenCalledWith(setIsFormVisible(true));
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedItem(mockEntry));
  });

  test("handles delete button click", () => {
    store.dispatch = jest.fn(); // Mock dispatch

    render(
      <Provider store={store}>
        <ExpenseItem entry={mockEntry} />
      </Provider>
    );

    // Simulate clicking the delete button
    fireEvent.click(screen.getByLabelText(/Delete Groceries/i));

    // Check if the deleteExpense action was dispatched with the correct id
    expect(store.dispatch).toHaveBeenCalledWith(deleteExpense(mockEntry.id));
  });
});
