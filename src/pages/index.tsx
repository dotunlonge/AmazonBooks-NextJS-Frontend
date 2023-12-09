// index.tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import MainContainer from '../components/MainContainer';

interface Product {
  cover_image: string;
  title: string;
  points: string;
  writer: string;
  tags: string[];
}

const AmazonMarketplaceClone: React.FC = () => {

  const amount_to_load_initially = 16;
  const bookEndpoint = `http://localhost:3000/api/books`;

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false); // Flag to track initial load
  const observer = useRef<IntersectionObserver>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  /**
   * Filters and updates products based on the search query.
   */
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(visibleProducts);
      return;
    }

    const filtered = visibleProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, visibleProducts]);

  /**
   * Function to fetch data for the Amazon Marketplace.
   * @param {number} page - The page number to fetch.
   */
  const fetchData = useCallback((page: number) => {
    setIsFetching(true); // Sets the loading state to true
    fetch(`${bookEndpoint}?page=${page}&size=${amount_to_load_initially}`)
      .then((response) => response.json())
      .then((data) => {
        setVisibleProducts((prevProducts) => {
          // Filter out duplicates before updating visibleProducts
          const newBooks = data.books.filter((newBook: Product) =>
            !prevProducts.some(existingBook => existingBook.title === newBook.title)
          );
          return [...prevProducts, ...newBooks];
        });
        setHasMore(Boolean(data.nextPage)); // Set whether there is more data to load
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log error if data fetch fails
        setHasMore(false); // Set hasMore flag to false
      })
      .finally(() => setIsFetching(false)); // Set loading state to false after fetch completion
  }, [bookEndpoint]);

  /**
   * Function to load more data when scrolling to the bottom of the page.
   */
  const loadMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      const nextPage = (visibleProducts.length / amount_to_load_initially) + 1;
      fetchData(nextPage); // Load the next page of data
    }
  }, [isFetching, hasMore, fetchData, visibleProducts]);

  /**
   * Function to handle the scroll event and trigger loading more data.
   */
  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight * 0.8;

    if (isBottom) {
      loadMoreData(); // Call loadMoreData when reaching the bottom of the page
    }
  }, [loadMoreData]);

  /**
   * Effect hook to listen for scroll events and trigger data loading when reaching the bottom.
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Effect hook to load initial data when the component mounts.
   */
  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true); // Set initial load flag to true
      fetchData(1); // Initial data fetch for the first page
    }
  }, [fetchData, initialLoad]); // Empty dependency array ensures this effect runs only once on mount

  return (
    <MainContainer
      setSearchQuery={setSearchQuery}
      filteredProducts={filteredProducts}
      isFetching={isFetching}
      hasMore={hasMore}
    />
  );
};

export default AmazonMarketplaceClone;
