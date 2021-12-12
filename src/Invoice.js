import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import data from "./data.json";
import back from "./assets/svg/icon-arrow-left.svg";
import { GoToTop } from "./GoToTop";

export const Invoice = ({
  filtered,
  newFiltered,
  setNewFiltered,
  formatMoney,
  newArray,
}) => {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostCode, setSenderPostCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [paymentDue, setPaymentDue] = useState("");
  const [clientName, setclientName] = useState("");
  const [clientEmail, setclientEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const newData = newArray.find((newFilter) => newFilter.id === id);
    setStatus(newData.status);
    setDescription(newData.description);
    setSenderStreet(newData.senderStreet);
    setSenderCity(newData.senderCity);
    setSenderPostCode(newData.senderPostCode);
    setSenderCountry(newData.senderCountry);
    setClientCountry(newData.clientCountry);
    setClientStreet(newData.clientStreet);
    setClientPostCode(newData.clientPostCode);
    setClientCity(newData.clientCity);
    setCreatedAt(newData.createdAt);
    setPaymentDue(newData.paymentDue);
    setclientName(newData.clientName);
    setclientEmail(newData.clientEmail);
    setTotal(newData.total);
    setItemName(newData.itemName);
    setItemQuantity(newData.itemQuantity);
    setItemPrice(newData.itemPrice);
  }, []);

  //   const total = items.reduce((currentTotal, item) => {
  //     return item.total + currentTotal;
  //   }, 0);
  //   console.log(total);

  const handlePaid = () => {
    setStatus("paid");
    // setNewFiltered(newFiltered);
    console.log(status);
    setNewFiltered(newFiltered);
    console.log(newFiltered);
  };

  // const handleRemove = (id) => {
  //   let newList = allNotes.filter((allNote) => allNote.id !== id);
  //   setAllNotes(newList);
  // };

  return (
    <section className="invoice">
      <div className="invoice-back">
        <Link to="/">
          <div className="invoice-back-button">
            <img src={back} alt="" /> <p>Go back</p>
          </div>
        </Link>
      </div>
      <div className="invoice-status-wrapper">
        <p className="invoice-status">Status</p>
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

      <section className="invoice-details-wrapper">
        <div className="invoice-head-details">
          <div className="invoice-description-wrapper">
            <h5>
              <span>#</span>
              {id}
            </h5>
            <p>{description}</p>
          </div>
          <div className="invoice-sender-address">
            <p>{senderStreet}</p>
            <p>{senderCity}</p>
            <p>{senderPostCode}</p>
            <p>{senderCountry}</p>
          </div>
        </div>

        <div className="invoice-client-details">
          <div className="invoice-client-dates">
            <div className="invoice-date">
              <p>Invoice Date</p>
              <h5>{createdAt}</h5>
            </div>
            <div className="invoice-payment-due">
              <p>Payment due</p>
              <h5>{paymentDue}</h5>
            </div>
          </div>
          <div className="bill-to-wrapper">
            <p>Bill To</p>
            <h5 className="invoice-client-name">{clientName}</h5>
            <div className="invoice-client-address">
              <p>{clientStreet}</p>
              <p>{clientCity}</p>
              <p>{clientPostCode}</p>
              <p>{clientCountry}</p>
            </div>
          </div>
        </div>
        <div className="invoice-email-wrapper">
          <p>Sent to</p>
          <h5>{clientEmail}</h5>
        </div>

        <div className="invoice-total-wrapper">
          <div className="invoice-subtotal-container">
            <div className="invoice-subtotal">
              <h5>{itemName}</h5>
              <h5>£{formatMoney(itemQuantity * itemPrice)}</h5>
            </div>
          </div>
          <div className="invoice-due-container">
            <h5 className="invoice-due">Amount Due</h5>
            <h5 className="invoice-total">
              £{formatMoney(itemQuantity * itemPrice)}
            </h5>
          </div>
        </div>
      </section>
      <div className="invoice-footer-buttons">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
        <button type="button" onClick={handlePaid}>
          Mark as paid
        </button>
      </div>
      <GoToTop />
    </section>
  );
};
