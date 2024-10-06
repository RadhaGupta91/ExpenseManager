import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import ExpenseList from "./components/ExpenseList";
import Header from "./components/Header";
import CardList from "./components/TableList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/allProducts" element={<CardList />} />
          <Route path="/expenseChart" element={<ExpenseChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
