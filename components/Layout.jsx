import { useState } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

const modalContent = {
  privacy: {
    title: "Privacy Policy",
    body: `We respect your privacy. We do not collect personal data or share information with third parties. All invoice data stays in your browser.`,
  },
  terms: {
    title: "Terms of Service",
    body: `Crown Invoice is a free tool. We do not guarantee data persistence or uptime. By using it, you agree to these simple terms.`,
  },
  contact: {
    title: "Contact Us",
    body: `Need help or want to suggest a feature? Reach out at contact@gerardosanchez.dev`,
  },
};

const Layout = ({ children }) => {
  const [modal, setModal] = useState(null); 

  return (
    <div className={styles.container}>
      <Head>
        <title>Crown Invoice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer openModal={setModal} />

      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{modalContent[modal].title}</h2>
            <p>{modalContent[modal].body}</p>
            <button onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
