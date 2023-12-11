import React from 'react';
import styles from '../styles/home.module.scss';

/**
 * Sidebar component displaying categories.
 * @returns {JSX.Element} - React component representing the sidebar.
 */
const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarItems}>
        {/* Categories */}
        <li className={styles.sidebarItem}>Electronics</li>
        <li className={styles.sidebarItem}>Books</li>
        <li className={styles.sidebarItem}>Clothing</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
