import "./App.css";
import "./form.css";
import "./dark-mode.css";
import { Header } from "./Header";
import { Invoices } from "./Invoices";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Invoice } from "./Invoice";
import { useState } from "react";
import data from "./data.json";

function App() {
  const [toggleMode, setToggleMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [invoiceLists, setInvoiceLists] = useState(data);

  const filtered =
    filter === "all"
      ? invoiceLists
      : filter
      ? invoiceLists.filter((invoiceList) =>
          invoiceList.status.toLowerCase().includes(filter.toLowerCase())
        )
      : invoiceLists;
  const [newFiltered, setNewFiltered] = useState(filtered);

  toggleMode
    ? document.body.classList.add("dark-mode")
    : document.body.classList.remove("dark-mode");

  const handleMode = () => {
    setToggleMode(!toggleMode);
  };

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  //getting the local stored data
  const newArray = JSON.parse(localStorage.getItem("newArray")) || newFiltered;

  // console.log(newArray);

  return (
    <Router>
      <Header
        handleMode={handleMode}
        toggleMode={toggleMode}
        setToggleMode={setToggleMode}
      />
      <Route exact path="/">
        <Invoices
          filtered={filtered}
          invoiceLists={invoiceLists}
          setInvoiceLists={setInvoiceLists}
          filter={filter}
          setFilter={setFilter}
          newFiltered={newFiltered}
          setNewFiltered={setNewFiltered}
          formatMoney={formatMoney}
          newArray={newArray}
        />
      </Route>
      <Route
        exact
        path="/invoice/:id"
        children={
          <Invoice
            filtered={filtered}
            newFiltered={newFiltered}
            setNewFiltered={setNewFiltered}
            formatMoney={formatMoney}
            newArray={newArray}
          />
        }
      ></Route>
    </Router>
  );
}

export default App;
