import Image from "next/image";
import styles from '../styles/Header.module.css';

const Header = () => {

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div 
          className={styles.logoLink}                    
          >
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className={styles.logo}
            priority
          /> Crown Invoice
        </div>
      </div>      
    </div>
  );
};

export default Header;