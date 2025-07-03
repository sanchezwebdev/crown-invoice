import styles from "../styles/Footer.module.css";

const Footer = ({ openModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Crown Invoice</div>
        <p className={styles.tagline}>Simple. Elegant. Professional Invoicing.</p>

        <div className={styles.grid}>
          <a onClick={() => openModal("privacy")}>Privacy</a>
          <a onClick={() => openModal("terms")}>Terms</a>
          <a onClick={() => openModal("contact")}>Contact</a>
        </div>
      </div>

      <div className={styles.terms}>
        <p>&copy; {new Date().getFullYear()} Crown Invoice. All rights reserved.</p>
      </div>
      <p>Made with ❤️ by Gerardo Sanchez</p>
    </div>
  );
};

export default Footer;
