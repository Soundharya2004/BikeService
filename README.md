# fzone - Bike Service Application

## Overview

**fzone** is a comprehensive bike service application tailored for bike service station owners and their customers. It allows owners to manage services and bookings effectively while providing a user-friendly interface for customers to book services and monitor their statuses.

## Features

### For Service Owners:
- **Service Management:** Create, edit, and delete services.
- **Booking Management:** View and manage all bookings (pending, ready for delivery, completed).
- **Notification System:** Receive email notifications for new bookings.

### For Customers:
- **Account Registration:** Register using an email address and mobile number.
- **Service Booking:** Book services for specific dates.
- **Booking Tracking:** View the status of current and past bookings.
- **Email Notifications:** Receive notifications when their bike is ready for delivery.

## Technologies Used

- **Frontend:** 
  - React
  - Vite
  
- **Backend:** 
  - Node.js
  - Express.js
  - MySQL
  - Bcrypt
  - Body-Parser
  - CORS
  - Dotenv
  - Nodemon

## Installation and Running the Project

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MySQL](https://www.mysql.com/) (for backend database)
- [NPM](https://www.npmjs.com/) (comes with Node.js)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Soundharya2004/cartrabbit-task.git
   cd bikeservice-backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `bikeservice-backend` directory with the following variables:

   ```plaintext
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal window and navigate to the `frontend` directory:

   ```bash
   cd bike-service frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` to access the application.

## Usage

- **Service Owners:** Log in to the admin dashboard to manage services and bookings. Use the provided forms for creating, editing, or deleting services.
- **Customers:** Register for an account, log in, and book services. Monitor booking status through the dashboard.

## API Endpoints

### User Endpoints

- `POST /user/register` - Register a new user.
- `POST /user/login` - Log in a user.


### Booking Endpoints

- `POST /api/bookings` - Create a new booking.
- `GET /api/all-bookings` - Retrieve all bookings.
- `PUT /api/bookings/:id` - Update the status of a booking.

## Conclusion

The **fzone** application offers an efficient solution for bike service owners to manage their services and bookings, while providing customers with a seamless experience. Leveraging modern technologies such as React, Node.js, and MySQL, it is built to be scalable and maintainable.

