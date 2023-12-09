import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import MainContainer from '../components/MainContainer';

interface Product {
  cover_image: string;
  title: string;
  points: string;
  writer: string;
  tags: string[];
}

/**
 * Represents a clone of the Amazon Marketplace, specifically for books.
 *
 * This component is responsible for fetching book data from a specified endpoint,
 * managing visibility of products based on user scroll actions, filtering products
 * based on search queries, and handling initial and subsequent data loads.
 *
 * @component
 *
 * @example
 * return (
 *   <AmazonMarketplaceClone />
 * )
 *
 * @remarks
 * This component uses several state variables to manage the visibility of products,
 * track loading states, and handle search functionality. It also uses the `useEffect`
 * and `useCallback` hooks for handling side effects and memoizing functions respectively.
 *
 * @prop {string} process.env.NEXT_PUBLIC_AMOUNT_TO_LOAD_INITIALLY - The number of items to load initially.
 * @prop {string} process.env.NEXT_PUBLIC_BOOK_ENDPOINT - The endpoint URL for fetching book data.
 *
 * @state {Product[]} visibleProducts - The list of products that are currently visible.
 * @state {boolean} isFetching - State to indicate if data is currently being fetched.
 * @state {boolean} hasMore - State to indicate if there are more products to be fetched.
 * @state {boolean} initialLoad - Flag to track if the initial data load has been completed.
 * @state {string} searchQuery - The current search query for filtering products.
 * @state {Product[]} filteredProducts - The list of products filtered based on the search query.
 *
 * @function fetchData - Function to fetch data for a specific page.
 * @function loadMoreData - Function to load more data when the end of the page is reached.
 * @function handleScroll - Function to handle the scroll event of the page.
 */
const AmazonMarketplaceClone: React.FC = () => {

  const amount_to_load_initially = parseInt(process.env.NEXT_PUBLIC_AMOUNT_TO_LOAD_INITIALLY || "10", 10);
  const bookEndpoint = process.env.NEXT_PUBLIC_BOOK_ENDPOINT;

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
  }, [bookEndpoint, amount_to_load_initially]);

  /**
   * Function to load more data when scrolling to the bottom of the page.
   */
  const loadMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      const nextPage = (visibleProducts.length / amount_to_load_initially) + 1;
      fetchData(nextPage); // Load the next page of data
    }
  }, [isFetching, hasMore, fetchData, visibleProducts, amount_to_load_initially]);

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
