# Project Title

## Overview

This project aims to create a frontend client for an Amazon Marketplace clone, focusing on displaying book-related data fetched from a RESTful API. The client renders a card-type list with responsive UI design, applies infinite scroll functionality, and enables search based on book titles.

## Features

- Display book data fetched from a REST API:
  - Title
  - Writer
  - Cover Image
    - Utilizes [this link](https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg) for cover images
  - Point (Price)
  - Tag (supports multiple tags: "fiction", "non-fiction", "science", "essay")

## Functionality

### 1. Rendering Card-Style List

- The application fetches book data from a RESTful API.
- Each card in the list displays:
  - Title
  - Writer
  - Image
  - Price
  - Tags
- The design of the card is customizable but follows responsive UI principles.

### 2. Infinite Scroll

- Infinite scroll functionality is implemented, loading additional data when the user scrolls to 80% of the page's bottom.

### 3. Search Functionality

- The search feature filters books based on their titles only.
- It supports partial and exact matches for titles.
- Notably, searching for numbers can display numerous matches to showcase the search functionality's effectiveness.

## Usage

### Getting Started

1. Clone the repository: `git clone`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Tech Stack

- **Frontend Framework:** React
- **Styling:** SCSS (Sass)
- **API:** RESTful API

## Known Issues and Limitations

- The search functionality currently works only for titles and might not cover all edge cases or additional book details.
