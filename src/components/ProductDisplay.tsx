import React from 'react';
import styles from '../styles/home.module.scss';
import Image from "next/image";

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
 * Props for the ProductDisplay component.
 */
interface ProductDisplayProps {
  filteredProducts: Product[];  // Array of filtered products to display.
  isFetching: boolean; // Indicates whether data is being fetched.
  hasMore: boolean; // Indicates whether there are more products to load.
}

/**
 * Component responsible for displaying the products.
 *
 * @param {ProductDisplayProps} props - The props for ProductDisplay component.
 * @returns {JSX.Element} - React component representing the product display.
 */
const ProductDisplay: React.FC<ProductDisplayProps> = ({
  filteredProducts,
  isFetching,
  hasMore,
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.mainHeader}>
        {/* Amazon Marketplace Clone Header */}
        <h1>Amazon Marketplace Clone</h1>
        {/* Banners */}
        <Image
          className={styles.banner}
          src="https://images-na.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/01/books/editorial/boty23/marketing/BHP-1500x200.jpg"
          alt=""
          height={200}
          width={1500}
        />
        <Image
          className={styles.banner}
          src="https://images-na.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/01/books/editorial/BHP/CHP/Desk_BHP_1500x300.jpg"
          alt=""
          height={300}
          width={1500}
        />
      </div>
      <div className={styles.products} data-testid="filteredProducts">
        {/* Display each filtered product */}
        {filteredProducts.map((product, index) => (
          <div key={index}>
            {/* Product details */}
            <Image src={product.cover_image} alt={product.title} height={250} width={250} />
            <h2>{product.title}</h2>
            <p>{product.points}</p>
            <p>{product.writer}</p>
            {/* Display product tags */}
            {product.tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
        ))}
        {/* Show loading message if fetching */}
        {isFetching && <p>Loading...</p>}
        {/* Show end of catalog message if no more products */}
        {!hasMore && <p>End of Catalog</p>}
      </div>
    </main>
  );
};

export default ProductDisplay;
