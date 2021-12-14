import "./App.css";
import "./form.css";
import "./dark-mode.css";
import { Header } from "./Header";
import { Invoices } from "./Invoices";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Invoice } from "./Invoice";
import { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import data from "./data.json";
import { Modals } from "./Modals";

function App() {
  const [toggleMode, setToggleMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [invoiceLists, setInvoiceLists] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPaid, setShowPaid] = useState(false);

  const location = useLocation();

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

  showForm
    ? document.body.classList.add("body-still")
    : document.body.classList.remove("body-still");

  // storing the current mode in the local Storage
  const handleMode = () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.contains("dark-mode")
      ? localStorage.setItem("darkMode", "enabled")
      : localStorage.setItem("darkMode", "disabled");
  };

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  //getting the local stored invoice data
  const newArray = JSON.parse(localStorage.getItem("newArray")) || newFiltered;
  const [allInvoices, setAllInvoices] = useState(newArray);

  //getting the local stored mode
  if (localStorage.getItem("darkMode") == "enabled") {
    document.body.classList.toggle("dark-mode");
  }

  return (
    <>
      <Header
        handleMode={handleMode}
        toggleMode={toggleMode}
        setToggleMode={setToggleMode}
        setShowProfile={setShowProfile}
        showProfile={showProfile}
      />
      <Modals
        allInvoices={allInvoices}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        showPaid={showPaid}
        setShowPaid={setShowPaid}
      />
      <TransitionGroup>
        <CSSTransition timeout={200} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path="/">
              <Invoices
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                filtered={filtered}
                invoiceLists={invoiceLists}
                setInvoiceLists={setInvoiceLists}
                filter={filter}
                setFilter={setFilter}
                newFiltered={newFiltered}
                setNewFiltered={setNewFiltered}
                formatMoney={formatMoney}
                newArray={newArray}
                showForm={showForm}
                setShowForm={setShowForm}
                allInvoices={allInvoices}
                setAllInvoices={setAllInvoices}
                showPaid={showPaid}
                setShowPaid={setShowPaid}
                showDelete={showDelete}
                setShowDelete={setShowDelete}
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
                  allInvoices={allInvoices}
                  setAllInvoices={setAllInvoices}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
                  showPaid={showPaid}
                  setShowPaid={setShowPaid}
                />
              }
            ></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
