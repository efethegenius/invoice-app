import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import back from "./assets/svg/icon-arrow-left.svg";
import { GoToTop } from "./GoToTop";
import { GoPrimitiveDot } from "react-icons/go";

export const Invoice = ({
  filtered,
  newFiltered,
  setNewFiltered,
  formatMoney,
  newArray,
  allInvoices,
  setAllInvoices,
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

  const { id } = useParams();

  useEffect(() => {
    const newData = allInvoices.find((newFilter) => newFilter.id === id);
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
    setItemName(newData.itemName);
    setItemQuantity(newData.itemQuantity);
    setItemPrice(newData.itemPrice);
  }, [allInvoices, id]);

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
          <p>
            <GoPrimitiveDot />
            {status}
          </p>
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
        <div className="client-details-wrapper">
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
        </div>

        <div className="invoice-total-wrapper">
          <div className="invoice-subtotal-container">
            <div className="invoice-subtotal  invoice-subtotal-header">
              <p>Item Name</p>
              <p>QTY.</p>
              <p>Price</p>
              <p>Total</p>
            </div>
            <div className="invoice-subtotal">
              <h5>{itemName}</h5>
              <h5 className="qp">{itemQuantity}</h5>
              <h5 className="qp">£{formatMoney(itemPrice)}</h5>
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

      <GoToTop />
    </section>
  );
};
