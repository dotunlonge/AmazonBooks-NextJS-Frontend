// Header.tsx
import React from 'react';
import styles from '../styles/home.module.scss';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; //Function to set the search query in the parent component.
}

/**
 * Header component representing the navigation bar and search functionality.
 * @param {HeaderProps} props - Props for the Header component.
 * @returns {JSX.Element} Header component UI.
 */
const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for products..."
            className={styles.searchInput}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton}>Search</button>
        </div>
        {/* Other Navbar Content (e.g., Account, Orders, Cart) */}
        <ul className={styles.navItems}>
          <li className={styles.navItem}>Account</li>
          <li className={styles.navItem}>Orders</li>
          <li className={styles.navItem}>Cart</li>
        </ul>
      </nav>
      <nav className={styles.navbar}>
        {/* Additional Navbar Content (e.g., Categories, Deals) */}
        <ul className={styles.navItems}>
          <li className={styles.navItem}>Categories</li>
          <li className={styles.navItem}>Deals</li>
          {/* Add more as per Amazon's layout */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
