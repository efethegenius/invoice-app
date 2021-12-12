import React, { useState } from "react";
import data from "./data.json";
import clear from "./assets/svg/icon-delete.svg";
export const Form = ({
  showForm,
  setShowForm,
  newFiltered,
  setNewFiltered,
  handleShowForm,
  newArray,
}) => {
  const [newInvoice, setNewInvoice] = useState({
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    clientName: "",
    clientEmail: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    itemName: "",
    itemQuantity: "",
    itemPrice: "",
    total: 0,
  });

  let uniqueId = Math.random().toString(36).substr(2, 6);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewInvoice({ ...newInvoice, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newInvoice.senderStreet &&
      newInvoice.senderCity &&
      newInvoice.senderPostCode &&
      newInvoice.senderCountry &&
      newInvoice.clientStreet &&
      newInvoice.clientCity &&
      newInvoice.clientPostCode &&
      newInvoice.clientCountry &&
      newInvoice.clientName &&
      newInvoice.clientEmail &&
      newInvoice.createdAt &&
      newInvoice.paymentDue &&
      newInvoice.description &&
      newInvoice.itemName &&
      newInvoice.itemQuantity &&
      newInvoice.itemPrice
    ) {
      let newSlip = {
        ...newInvoice,
        id: uniqueId.toUpperCase(),
        status: "pending",
      };
      setNewFiltered([...newFiltered, newSlip]);
      setNewInvoice({
        senderStreet: "",
        senderCity: "",
        senderPostCode: "",
        senderCountry: "",
        clientStreet: "",
        clientCity: "",
        clientPostCode: "",
        clientCountry: "",
        clientName: "",
        clientEmail: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        itemName: "",
        itemQuantity: "",
        itemPrice: "",
      });

      // storing the array in the local storage
      newArray.push(newSlip);
      localStorage.setItem("newArray", JSON.stringify(newArray));
      console.log(newArray);
    } else {
      console.log("fill all inputs");
    }
  };
  const handleDraft = (e) => {
    e.preventDefault();
    const newSlip = {
      ...newInvoice,
      id: uniqueId.toUpperCase(),
      status: "draft",
    };
    setNewFiltered([...newFiltered, newSlip]);
    setNewInvoice({
      senderStreet: "",
      senderCity: "",
      senderPostCode: "",
      senderCountry: "",
      clientStreet: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      clientName: "",
      clientEmail: "",
      createdAt: "",
      paymentDue: "",
      description: "",
      itemName: "",
      itemQuantity: "",
      itemPrice: "",
    });
    newArray.push(newSlip);
    localStorage.setItem("newArray", JSON.stringify(newArray));
    console.log(newArray);
  };

  const handleDiscard = () => {
    setNewInvoice({
      senderStreet: "",
      senderCity: "",
      senderPostCode: "",
      senderCountry: "",
      clientStreet: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      clientName: "",
      clientEmail: "",
      createdAt: "",
      paymentDue: "",
      description: "",
      itemName: "",
      itemQuantity: "",
      itemPrice: "",
    });
    handleShowForm();
  };
  const handleClear = () => {
    setNewInvoice({ itemName: "", itemQuantity: "", itemPrice: "" });
  };
  return (
    <section
      className={
        showForm ? "invoices-form show-invoices-form" : "invoices-form"
      }
    >
      <h1 className="invoices-form-header">Create Invoice</h1>
      <form className="invoice-form">
        <div className="form-bill-from">
          <h5>Bill From</h5>
          <div className="input full-input">
            <label htmlFor="senderStreet"> Street Address</label>
            <input
              type="text"
              id="senderStreet"
              name="senderStreet"
              value={newInvoice.senderStreet}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="form-city-container">
            <div className="input city-input">
              <label htmlFor="senderCity"> City</label>
              <input
                type="text"
                id="senderCity"
                name="senderCity"
                value={newInvoice.senderCity}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
            <div className="input post-code-input">
              <label htmlFor="senderPostCode"> Post Code</label>
              <input
                type="number"
                id="senderPostCode"
                name="senderPostCode"
                value={newInvoice.senderPostCode}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input full-input">
            <label htmlFor="senderCountry"> Country</label>
            <input
              type="text"
              id="senderCountry"
              name="senderCountry"
              value={newInvoice.senderCountry}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form-bill-to">
          <h5>Bill To</h5>
          <div className="input full-input">
            <label htmlFor="clientName"> Client's Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={newInvoice.clientName}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="input full-input">
            <label htmlFor="clientEmail"> Client's Email</label>
            <input
              type="text"
              id="clientEmail"
              name="clientEmail"
              value={newInvoice.clientEmail}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="input full-input">
            <label htmlFor="clientStreet"> Street Address</label>
            <input
              type="text"
              id="clientStreet"
              name="clientStreet"
              value={newInvoice.clientStreet}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="form-city-container">
            <div className="input city-input">
              <label htmlFor="clientCity"> City</label>
              <input
                type="text"
                id="clientCity"
                name="clientCity"
                value={newInvoice.clientCity}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
            <div className="input post-code-input">
              <label htmlFor="clientPostCode"> Post Code</label>
              <input
                type="number"
                id="clientPostCode"
                name="clientPostCode"
                value={newInvoice.clientPostCode}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input full-input">
            <label htmlFor="clientCountry"> Country</label>
            <input
              type="text"
              id="clientCountry"
              name="clientCountry"
              value={newInvoice.clientCountry}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="form-date-container">
            <div className="input created-at-input">
              <label htmlFor="createdAt"> Invoice Date</label>
              <input
                type="date"
                id="createdAt"
                name="createdAt"
                value={newInvoice.createdAt}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
            <div className="input payment-due-input">
              <label htmlFor="paymentDue"> Payment Terms</label>
              <input
                type="date"
                id="paymentDue"
                name="paymentDue"
                value={newInvoice.paymentDue}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="input full-input">
            <label htmlFor="description"> Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newInvoice.description}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={newInvoice.itemName}
            onChange={handleOnChange}
            autoComplete="off"
          />
          <div className="form-price-container">
            <div className="input quantity-input">
              <label htmlFor="itemQuantity">Qty</label>
              <input
                type="number"
                id="itemQuantity"
                name="itemQuantity"
                value={newInvoice.itemQuantity}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
            <div className="input price-input">
              <label htmlFor="itemPrice">Price</label>
              <input
                type="number"
                id="itemPrice"
                name="itemPrice"
                value={newInvoice.itemPrice}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
            <div className="form-total-container">
              <p className="form-total-name">Total</p>
              <p className="form-total">
                {newInvoice.itemPrice * newInvoice.itemQuantity}
              </p>
            </div>
            <img
              src={clear}
              alt="delete button"
              className="clear"
              onClick={handleClear}
            />
          </div>
        </div>
        <div className="form-button-container">
          <button
            type="button"
            className="btn btn-discard"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            type="submit"
            className="btn btn-send"
            onClick={(e) => {
              handleSubmit(e);
              handleShowForm();
            }}
          >
            Save & send
          </button>
          <button
            type="submit"
            className="btn btn-draft"
            onClick={(e) => {
              handleDraft(e);
              handleShowForm();
            }}
          >
            Save as Draft
          </button>
        </div>
      </form>
    </section>
  );
};
