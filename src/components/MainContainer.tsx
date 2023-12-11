import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductDisplay from './ProductDisplay';
import styles from '../styles/home.module.scss';

/**
 * Interface representing a single product.
 */
interface Product {
  cover_image: string;
  title: string;
  points: string;
  writer: string;
  tags: string[];
}

/**
 * Props for the MainContainer component.
 */
interface MainContainerProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Function to set the search query.
  filteredProducts: Product[]; // Array of filtered products.
  isFetching: boolean; // Indicates whether data is being fetched.
  hasMore: boolean;  // Indicates whether there are more products to load.
}

/**
 * Main container component displaying header, sidebar, and product display.
 *
 * @param {MainContainerProps} props - The props for MainContainer component.
 * @returns {JSX.Element} - React component representing the main container.
 */
const MainContainer: React.FC<MainContainerProps> = ({
  setSearchQuery,
  filteredProducts,
  isFetching,
  hasMore,
}) => {
  return (
    <div className={styles.container} data-testid="MainContainer">
      {/* Header Component */}
      <Header setSearchQuery={setSearchQuery} />

      <div className={styles.content}>
        {/* Sidebar Component */}
        <Sidebar />

        {/* ProductDisplay Component */}
        <ProductDisplay
          filteredProducts={filteredProducts}
          isFetching={isFetching}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default MainContainer;
