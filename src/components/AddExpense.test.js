import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddExpense from "./AddExpense";
import { addExpense, setIsFormVisible } from "../store/expenseSlice"; // Import actions

const mockStore = configureStore([]);

describe("AddExpense Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        selectedItem: null, // or set an existing item if needed
        isFormVisible: true,
      },
    });

    store.dispatch = jest.fn(); // Mock dispatch function

    window.alert = jest.fn(); // Mock the window.alert function
  });

  test("renders the Add Expense form", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    expect(screen.getByLabelText(/Expense Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add/i)).toBeInTheDocument();
  });

  test("adds a new expense", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Expense Name/i), {
      target: { value: "Coffee" },
    });
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "General" },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByLabelText(/Add/i));

    // Check if addExpense action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(setIsFormVisible(false));
    expect(store.dispatch).toHaveBeenCalledWith(
      addExpense({
        id: expect.any(Number), // or use a specific value if you want
        name: "Coffee",
        amount: 5,
        type: "General",
        createdDate: null, // Assuming createdDate is a string
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test("shows validation error when fields are empty", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    // Simulate user interaction by filling the form (or leaving it empty)
    fireEvent.change(screen.getByLabelText(/expense name/i), {
      target: { value: "" }, // Leaving name empty
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "" }, // Leaving amount empty
    });
    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "" }, // Leaving type empty
    });

    // Submit the form
    fireEvent.click(screen.getByLabelText(/add/i)); // Adjust button text as necessary

    // Check for validation alert
    expect(window.alert).toHaveBeenCalledWith("Please select Type"); // Ensure this matches your alert message
  });
});
