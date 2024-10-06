import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [
    {
      id: 1,
      name: "Mobile",
      amount: "1000",
      type: "General",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 2,
      name: "Bed",
      amount: "100",
      type: "General",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 3,
      name: "T-Shirt",
      amount: "150",
      type: "Cloths",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 4,
      name: "Cap",
      amount: "100",
      type: "Cloths",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 5,
      name: "Jacket",
      amount: "150",
      type: "Cloths",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 6,
      name: "Milk",
      amount: "100",
      type: "Grocery",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 7,
      name: "Banana",
      amount: "10",
      type: "Grocery",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 8,
      name: "Apple",
      amount: "600",
      type: "Grocery",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 9,
      name: "Watch",
      amount: "500",
      type: "Electronics",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 10,
      name: "Washing Machine",
      amount: "500",
      type: "Electronics",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 11,
      name: "Bag",
      amount: "300",
      type: "Travel",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
    {
      id: 12,
      name: "Tissue",
      amount: "600",
      type: "Travel",
      createdDate: "2024-10-02T04:00:00.000Z",
    },
  ],
  selectedItem: "",
  isFormVisible: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteAllItems: (state, action) => {
      state.expenses = [];
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setIsFormVisible: (state, action) => {
      state.isFormVisible = action.payload;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  setSelectedItem,
  setIsFormVisible,
  deleteAllItems,
} = expenseSlice.actions;
export default expenseSlice.reducer;
