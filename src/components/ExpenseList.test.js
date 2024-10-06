import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseList from "./ExpenseList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  setSelectedItem,
  setIsFormVisible,
  deleteAllItems,
} from "../store/expenseSlice";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("ExpenseList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        expenses: [
          {
            id: "1",
            name: "Groceries",
            amount: 50,
            type: "Grocery",
            createdDate: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Coffee",
            amount: 5,
            type: "General",
            createdDate: new Date().toISOString(),
          },
        ],
        isFormVisible: false,
      },
    });
  });

  test("renders the Expense List title", () => {
    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    expect(screen.getByText(/expense list/i)).toBeInTheDocument();
  });

  test("displays no expenses message when there are no expenses", () => {
    store = mockStore({
      expenses: {
        expenses: [],
        isFormVisible: false,
      },
    });

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    expect(screen.getByText(/no expenses added yet/i)).toBeInTheDocument();
  });

  test("renders the add expense button and dispatches action on click", () => {
    store.dispatch = jest.fn(); // Mock dispatch

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const addButton = screen.getByLabelText(/add new expense/i);
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFormVisible(true));
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedItem(""));
  });

  test("renders the delete all button and dispatches action on click", () => {
    store.dispatch = jest.fn(); // Mock dispatch

    render(
      <Provider store={store}>
        <ExpenseList />
      </Provider>
    );

    const deleteButton = screen.getByLabelText(/delete all expenses/i);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteAllItems(""));
  });

  test("filters expenses based on search input", () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <ExpenseList></ExpenseList>
      </Provider>
    );

    const searchInput = screen.getByLabelText(/Search expenses by name/);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Coffee" } });

    expect(screen.getByText(/Coffee/i)).toBeInTheDocument();
    expect(screen.queryByText(/groceries/i)).not.toBeInTheDocument();
  });
});
