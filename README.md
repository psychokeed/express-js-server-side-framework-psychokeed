# Express.js RESTful API for Product Management

A RESTful API built with Express.js that provides CRUD operations for managing products, including advanced features like filtering, pagination, and search.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mern3
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Documentation

### Authentication

Protected routes require an authorization header:
```
Authorization: BearerMySecretToken
```

### Available Endpoints

#### Get All Products
- **GET** `/api/products`
- **Query Parameters:**
  - `category`: Filter by category
  - `page`: Page number for pagination
  - `limit`: Number of items per page
- **Response:**
```json
[
  {
    "id": "uuid-here",
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "category": "Electronics",
    "inStock": true
  }
]
```

#### Get Product by ID
- **GET** `/api/products/:id`
- **Response:**
```json
{
  "id": "uuid-here",
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Electronics",
  "inStock": true
}
```

#### Create Product
- **POST** `/api/products`
- **Body:**
```json
{
  "name": "New Product",
  "description": "Product Description",
  "price": 99.99,
  "category": "Electronics",
  "inStock": true
}
```
- **Response:** Created product object with status 201

#### Update Product
- **PUT** `/api/products/:id`
- **Body:** Same as POST request
- **Response:** Updated product object

#### Delete Product
- **DELETE** `/api/products/:id`
- **Response:**
```json
{
  "message": "Product deleted successfully!"
}
```

### Advanced Features

#### Search Products
- **GET** `/api/products/search?name=keyword`
- **Response:** Array of matching products

#### Get Product Statistics
- **GET** `/api/products/stats`
- **Response:**
```json
[
  {
    "_id": "Electronics",
    "count": 5
  },
  {
    "_id": "Clothing",
    "count": 3
  }
]
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a message:
```json
{
  "message": "Error description"
}
```

## Middleware Features

- Request logging
- Authentication check for protected routes
- Request body validation
- Global error handling

## Development

To run the server in development mode with automatic restart:
```bash
npm start
```

For production:
```bash
npm run server
```