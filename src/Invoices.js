import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoToTop } from "./GoToTop";
import arrowDown from "./assets/svg/icon-arrow-down.svg";
import plus from "./assets/svg/icon-plus.svg";
import { Form } from "./Form";

export const Invoices = ({
  filtered,
  invoiceLists,
  setInvoiceLists,
  filter,
  setFilter,
  newFiltered,
  setNewFiltered,
  formatMoney,
  newArray,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [testArray, setTestArray] = useState(newArray);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleShowForm = (e) => {
    setShowForm(!showForm);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const filteredInvoice =
    filter === "all"
      ? testArray
      : filter
      ? testArray.filter((invoiceList) =>
          invoiceList.status.toLowerCase().includes(filter.toLowerCase())
        )
      : testArray;

  return (
    <section className="invoices">
      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        newFiltered={newFiltered}
        setNewFiltered={setNewFiltered}
        handleShowForm={handleShowForm}
        newArray={newArray}
      />
      <div className="invoices-header">
        <div className="invoice-length-wrapper">
          <h3>Invoices</h3>
          <p>
            {newArray.length > 1
              ? newArray.length + " invoices"
              : newArray.length + " invoice"}
          </p>
        </div>
        <div className="filter-container">
          <p onClick={handleShowFilter}>Filter</p>
          <img
            src={arrowDown}
            alt="arrow"
            className={showFilter ? "filter-arrow" : "filter-arrow-down"}
            onClick={handleShowFilter}
          />

          {showFilter && (
            <div className="filter-options">
              <div className="filter-option">
                <input
                  type="radio"
                  name="filter"
                  value="all"
                  onChange={handleChange}
                />
                <p>All</p>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  name="filter"
                  value="paid"
                  onChange={handleChange}
                />
                <p>Paid</p>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  name="filter"
                  value="pending"
                  onChange={handleChange}
                />
                <p>Pending</p>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  name="filter"
                  value="draft"
                  onChange={handleChange}
                />
                <p>Draft</p>
              </div>
            </div>
          )}
        </div>
        <div className="new-invoice-container" onClick={handleShowForm}>
          <div className="plus-circle">
            <img src={plus} alt="" />
          </div>
          <button type="button" className="new-invoice">
            New
          </button>
        </div>
      </div>
      <section className="invoices-container-wrapper">
        {filteredInvoice.map((invoiceList) => {
          const {
            id,
            paymentDue,
            clientName,
            total,
            status,
            itemQuantity,
            itemPrice,
          } = invoiceList;
          return (
            <div key={id} className="invoices-container">
              <Link to={`/invoice/${id}`}>
                <div className="invoices-id-wrapper">
                  <h5>
                    <span>#</span>
                    {id}
                  </h5>
                  <p>{clientName}</p>
                </div>
                <div className="invoices-details">
                  <div className="invoices-total-wrapper">
                    <p>{paymentDue}</p>
                    <h4>£{formatMoney(itemQuantity * itemPrice)}</h4>
                  </div>
                  <div className="invoices-status">
                    <div
                      className={
                        status === "paid"
                          ? "invoices-status-style paid"
                          : status === "pending"
                          ? "invoices-status-style pending"
                          : "invoices-status-style draft"
                      }
                    >
                      <p>{status}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
      <GoToTop />
    </section>
  );
};
