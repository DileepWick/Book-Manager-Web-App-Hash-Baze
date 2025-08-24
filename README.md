# Book-Manager-Web-App-Hash-Baze

A full-stack web application for managing a book collection, built with NestJS (backend) and Next.js (frontend).

## Project Overview

This application provides a complete solution for managing books with user authentication. Users can register, login, and perform CRUD operations on their book collection.

### Features

- **User Authentication**
  - Registration and login
  - JWT-based authentication
  - Protected routes
  
- **Book Management**
  - Create new books
  - View all books
  - View book details
  - Update existing books
  - Delete books
  
- **Modern Tech Stack**
  - NestJS backend with GraphQL API
  - Next.js frontend with React 19
  - Material UI for styling
  - Apollo Client for GraphQL communication

## Tech Stack

### Backend (NestJS)

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **GraphQL**: API query language with Apollo Server
- **JWT Authentication**: Secure user authentication
- **Class Validator**: Input validation
- **bcrypt**: Password hashing

### Frontend (Next.js)

- **Next.js 15.5**: React framework with App Router
- **React 19**: UI library
- **Apollo Client 4**: GraphQL client
- **Material UI 7**: Component library
- **TypeScript**: Type-safe code
- **TurboPack**: Fast builds

## Project Structure

```
/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── book/           # Book module
│   │   ├── user/           # User module
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   └── package.json        # Backend dependencies
│
└── frontend/               # Next.js frontend
    ├── src/
    │   ├── app/            # Next.js App Router
    │   │   ├── books/      # Book-related pages
    │   │   ├── components/ # Reusable components
    │   │   ├── graphql/    # GraphQL queries and mutations
    │   │   ├── login/      # Login page
    │   │   ├── register/   # Registration page
    │   │   ├── types/      # TypeScript type definitions
    │   │   └── util/       # Utility functions
    │   └── ...
    └── package.json        # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone 
   cd book-management-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

#### Backend

```bash
cd backend
npm run start:dev
```

The GraphQL API will be available at: http://localhost:5000/graphql

#### Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at: http://localhost:3000

## API Documentation

The application uses GraphQL for API communication. You can explore the API using the GraphQL Playground available at http://localhost:5000/graphql when the backend is running.

### Main GraphQL Operations

#### Authentication

- **Register**: Create a new user account
- **Login**: Authenticate and receive JWT token
- **Logout**: Clear authentication
- **Me**: Get current authenticated user

#### Books

- **Get Books**: Retrieve all books
- **Get Book**: Get a specific book by ID
- **Create Book**: Add a new book
- **Update Book**: Modify an existing book
- **Delete Book**: Remove a book

## Development

### Backend Development

```bash
cd backend
npm run start:dev
```

### Frontend Development

```bash
cd frontend
npm run dev
```

## Deployment

### Backend Deployment

1. Build the NestJS application:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment

1. Build the Next.js application:
   ```bash
   cd frontend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```
