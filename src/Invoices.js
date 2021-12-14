import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoToTop } from "./GoToTop";
import arrowDown from "./assets/svg/icon-arrow-down.svg";
import plus from "./assets/svg/icon-plus.svg";
import { Form } from "./Form";
import { GoPrimitiveDot } from "react-icons/go";
import { VscCheck, VscTrash } from "react-icons/vsc";
import Avatar from "./assets/img/image-avatar.jpeg";

export const Invoices = ({
  filter,
  setFilter,
  newFiltered,
  setNewFiltered,
  formatMoney,
  newArray,
  showForm,
  setShowForm,
  allInvoices,
  setAllInvoices,
  setShowPaid,
  setShowDelete,
  // showDelete,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleShowForm = (e) => {
    setShowForm(!showForm);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  //filtering an invoice based on the radio button filter value
  const filteredInvoice =
    filter === "all"
      ? allInvoices
      : filter
      ? allInvoices.filter((invoiceList) =>
          invoiceList.status.toLowerCase().includes(filter.toLowerCase())
        )
      : allInvoices;

  //function to remove an invoice
  const handleRemove = (id) => {
    setAllInvoices(allInvoices.filter((allInvoice) => allInvoice.id !== id));
    setShowDelete(true);
  };

  //function to add the paid status to a pending or draft invoice
  const handleNewStatus = (id) => {
    setAllInvoices(
      filteredInvoice.map((x) => (x.id === id ? { ...x, status: "paid" } : x))
    );
    setShowPaid(true);
  };

  useEffect(() => {
    filteredInvoice.length > 0
      ? (document.title = `Invoices App (${filteredInvoice.length})`)
      : (document.title = `Invoices App`);
  });
  return (
    <section className="invoices">
      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        newFiltered={newFiltered}
        setNewFiltered={setNewFiltered}
        handleShowForm={handleShowForm}
        newArray={newArray}
        allInvoices={allInvoices}
        setAllInvoices={setAllInvoices}
      />
      {showForm && (
        <div className="form-background" onClick={handleShowForm}></div>
      )}
      <div className="invoices-header">
        <div className="invoice-length-wrapper">
          <h3>Invoices</h3>
          <p>
            {allInvoices.length > 1
              ? allInvoices.length + " invoices available"
              : allInvoices.length === 0
              ? "0 invoices available"
              : allInvoices.length + " invoice available"}
          </p>
        </div>
        <div className="filter-container">
          <p onClick={handleShowFilter} className="filterName">
            Filter
          </p>
          <img
            src={arrowDown}
            alt="arrow"
            className={showFilter ? "filter-arrow" : "filter-arrow-down"}
            onClick={handleShowFilter}
          />
          {/* filter options start */}
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
          {/* filter options end */}
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
                      <p>
                        <GoPrimitiveDot />
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="invoices-button">
                <div className="invoices-button-wrapper">
                  {(status === "pending" || status === "draft") && (
                    <button
                      type="button"
                      className="mark-as-paid"
                      onClick={() => {
                        handleNewStatus(id);
                      }}
                    >
                      <VscCheck />
                    </button>
                  )}
                  <button
                    type="button"
                    className="delete-invoice"
                    onClick={() => {
                      handleRemove(id);
                    }}
                  >
                    <VscTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredInvoice.length === 0 && (
          <div className="empty-invoice-notice">
            <h1>
              {filter === "all"
                ? `There are no invoices available`
                : filter
                ? `There are no ${filter} invoices available`
                : `There are no invoices available`}
            </h1>
            <p>
              Create a new invoice by tapping the <span>New</span> button...
            </p>
          </div>
        )}
      </section>
      <GoToTop />
    </section>
  );
};
