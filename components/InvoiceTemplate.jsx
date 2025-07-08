import styles from "../styles/InvoiceTemplate.module.css";
import { useState, useRef } from "react";

export default function InvoiceTemplate() {
  //  Ref for capturing invoice DOM element for PDF 
  const invoiceRef = useRef();

  //  Download invoice as PDF using html2pdf 
  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    if (invoiceRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'invoice.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(invoiceRef.current)
        .save();
    }
  };

  //  State for invoice data 
  const [invoice, setInvoice] = useState({
    sender: {
      name: "",
      address: "",
      email: "",
    },
    recipient: {
      name: "",
      address: "",
      email: "",
    },
    invoiceNumber: "",
    date: "",
    dueDate: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    notes: "",
  });

  //  Handlers for changing field and item values 
  const handleFieldChange = (section, field, value) => {
    setInvoice((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoice.items];
    items[index][field] = field === "description" ? value : parseFloat(value);
    setInvoice((prev) => ({ ...prev, items }));
  };

  //  Add new item to invoice 
  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  //  Calculations for totals 
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax;

  return (
    <div className={styles.container}>
      <div className={styles.invoice} ref={invoiceRef}>
        <h1 className={styles.title}>Invoice</h1>

        {/*  Sender and recipient info section  */}
        <div className={styles.sectionRow}>
          <div>
            <h3>From:</h3>
            <input
              className={styles.input}
              placeholder="Your Name"
              value={invoice.sender.name}
              onChange={(e) =>
                handleFieldChange("sender", "name", e.target.value)
              }
            />
            <input
              className={styles.input}
              placeholder="Your Address"
              value={invoice.sender.address}
              onChange={(e) =>
                handleFieldChange("sender", "address", e.target.value)
              }
            />
            <input
              className={styles.input}
              placeholder="Your Email"
              value={invoice.sender.email}
              onChange={(e) =>
                handleFieldChange("sender", "email", e.target.value)
              }
            />
          </div>

          <div>
            <h3>To:</h3>
            <input
              className={styles.input}
              placeholder="Client Name"
              value={invoice.recipient.name}
              onChange={(e) =>
                handleFieldChange("recipient", "name", e.target.value)
              }
            />
            <input
              className={styles.input}
              placeholder="Client Address"
              value={invoice.recipient.address}
              onChange={(e) =>
                handleFieldChange("recipient", "address", e.target.value)
              }
            />
            <input
              className={styles.input}
              placeholder="Client Email"
              value={invoice.recipient.email}
              onChange={(e) =>
                handleFieldChange("recipient", "email", e.target.value)
              }
            />
          </div>
        </div>

        {/*  Invoice details section  */}
        <div className={styles.sectionRow}>
          <div>
            <label>Invoice #</label>
            <input
              className={styles.input}
              value={invoice.invoiceNumber}
              onChange={(e) =>
                setInvoice({ ...invoice, invoiceNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label>Date</label>
            <input
              className={styles.input}
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
            />
          </div>
          <div>
            <label>Due</label>
            <input
              className={styles.input}
              type="date"
              value={invoice.dueDate}
              onChange={(e) =>
                setInvoice({ ...invoice, dueDate: e.target.value })
              }
            />
          </div>
        </div>

        {/*  Items table  */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className={styles.input}
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(idx, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(idx, "unitPrice", e.target.value)
                    }
                  />
                </td>
                <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addBtn} onClick={addItem}>
          + Add Item
        </button>

        {/*  Totals and tax section  */}
        <div className={styles.totals}>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <label>
            Tax Rate:
            <input
              className={styles.input}
              type="number"
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) =>
                setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) })
              }
            />
          </label>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
        </div>

        {/*  Notes section  */}
        <div className={styles.notes}>
          <h4>Notes</h4>
          <textarea
            className={styles.textarea}
            placeholder="Add any notes here"
            value={invoice.notes}
            onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
          />
        </div>
      </div>

      {/*  Download button  */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button onClick={handleDownload} className={styles.downloadBtn}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
