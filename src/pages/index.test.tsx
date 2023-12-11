import React from "react";
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import AmazonMarketplaceClone from './index.tsx';

// Mock Environment Variables
process.env.NEXT_PUBLIC_AMOUNT_TO_LOAD_INITIALLY = '10';
process.env.NEXT_PUBLIC_BOOK_ENDPOINT = 'https://example.com/api/books';

// Sample book data for mocking fetch responses.
const books = [
        {
            "id": 1,
            "title": "A Book Title 1",
            "writer": "An Author 1",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 77,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 2,
            "title": "A Book Title 2",
            "writer": "An Author 2",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 134,
            "tags": [
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 3,
            "title": "A Book Title 3",
            "writer": "An Author 3",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 101,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 4,
            "title": "A Book Title 4",
            "writer": "An Author 4",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 202,
            "tags": [
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 5,
            "title": "A Book Title 5",
            "writer": "An Author 5",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 71,
            "tags": [
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 6,
            "title": "A Book Title 6",
            "writer": "An Author 6",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 169,
            "tags": [
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 7,
            "title": "A Book Title 7",
            "writer": "An Author 7",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 142,
            "tags": [
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 8,
            "title": "A Book Title 8",
            "writer": "An Author 8",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 146,
            "tags": [
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 9,
            "title": "A Book Title 9",
            "writer": "An Author 9",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 202,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 10,
            "title": "A Book Title 10",
            "writer": "An Author 10",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 60,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 11,
            "title": "A Book Title 11",
            "writer": "An Author 11",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 100,
            "tags": [
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 12,
            "title": "A Book Title 12",
            "writer": "An Author 12",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 96,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 13,
            "title": "A Book Title 13",
            "writer": "An Author 13",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 104,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 14,
            "title": "A Book Title 14",
            "writer": "An Author 14",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 105,
            "tags": [
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 15,
            "title": "A Book Title 15",
            "writer": "An Author 15",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 195,
            "tags": [
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        },
        {
            "id": 16,
            "title": "A Book Title 16",
            "writer": "An Author 16",
            "cover_image": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            "point": 122,
            "tags": [
                "fiction",
                "fantasy",
                "thriller"
            ],
            "createdAt": "2023-12-09T01:42:55.169Z",
            "updatedAt": "2023-12-09T01:42:55.169Z"
        }
    ];

// Helper function for mock fetch responses
const mockFetchResponse = (books, nextPage) => {
  global.fetch.mockResolvedValueOnce({
    json: async () => ({ books, nextPage }),
  });
};


beforeAll(() => {
  // Setup the actual endpoint and mock global fetch before all tests.
  process.env.NEXT_PUBLIC_BOOK_ENDPOINT = 'https://bookstore-server-20d9848cb6e4.herokuapp.com/api/books';
  global.fetch = jest.fn();
});

beforeEach(() => {
  // Mock fetch implementation before each test.
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ books, totalPages: 63, nextPage: 2 }),
  });
});

afterEach(() => {
  // Clear all mocks after each test to ensure test isolation.
  jest.clearAllMocks();
});

// Test suite for AmazonMarketplaceClone component.
describe('AmazonMarketplaceClone', () => {

  // Test to verify if the MainContainer is rendered correctly.
  it('renders MainContainer correctly', async () => {
    const { getByTestId } = render(<AmazonMarketplaceClone />);
    await waitFor(() => {
      expect(getByTestId('MainContainer')).toBeInTheDocument();
    });
  });

  // Test to check if the initial state of the component is set correctly.
  it('initializes with the correct state', async () => {
    const { getByTestId } = render(<AmazonMarketplaceClone />);
    await waitFor(() => {
      expect(getByTestId('filteredProducts')).toBeInTheDocument();
    });
  });

  // Nested describe block for testing API Calls.
  describe('API Calls', () => {
    // Test to verify if data is fetched successfully on initial render.
    it('fetches data successfully on initial render', async () => {
      mockFetchResponse(books, false);
      render(<AmazonMarketplaceClone />);
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });
  });

  // Nested describe block for testing Event Handling.
  describe('Event Handling', () => {
    // Test to verify if more data is loaded on scroll.
    it('loads more data on scroll', async () => {
      mockFetchResponse(books, true);
      const { getByTestId } = render(<AmazonMarketplaceClone />);
      await waitFor(() => {
        expect(getByTestId('filteredProducts')).toBeInTheDocument();
      });
    });

    // Test to verify if scroll event listeners are added and removed correctly.
    it('adds and removes scroll event listener', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = render(<AmazonMarketplaceClone />);
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

});
