# Bike Service Application - Fzone

## Overview

Fzone is a bike service application designed for bike service station owners and their customers. The application allows owners to manage their services, receive notifications for bookings, and keep track of booking statuses. Customers can register, book services, and receive email notifications regarding their bookings.

## Features

### Bike Station Owner Features:
- Create, edit, and delete services.
- View a list of all bookings (pending, ready for delivery, and completed).
- View details of each booking.
- Mark a booking as ready for delivery.
- Mark a booking as completed.
- Receive email notifications whenever a booking is made.

### Customer Features:
- Register for an account using an email address and mobile number.
- Book a service at a specific date.
- View the status of current and previous bookings.
- Receive an email notification when the booking is ready for delivery.

## Technology Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: MySQL

## Installation

### Prerequisites

- Node.js (v14 or later)
- MySQL
- Git

### Setup Instructions

1. **Clone the repository:**

   ```
   git clone https://github.com/Soundharya2004/bike-service.git
   cd bike-service
   ```

2. **Install the backend dependencies:**

   Navigate to the backend directory and run:

   ```
   cd bikeservice-backend
   npm install
   ```

3. **Set up the environment variables:**

   Create a `.env` file in the `bikeservice-backend` directory and add the following variables:

   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   ```

4. **Install the frontend dependencies:**

   Navigate to the frontend directory and run:

   ```
   cd bike-servie frontend
   npm install
   ```

5. **Run the backend server:**

   ```
   cd bikeservice-backend
   npm start
   ```

6. **Run the frontend development server:**

   Open a new terminal, navigate to the frontend directory, and run:

   ```
   cd bike-service frontend
   npm run dev
   ```

## Admin Login Credentials

To log in as an admin, use the following credentials:

- **Email**: admin@gmail.com
- **Password**: admin@123

## Usage

1. Open your web browser and go to `http://localhost:5173` (or the appropriate port where your frontend is running).
2. You can access the admin login page using the credentials provided above.
3. As a customer, you can register for an account, book services, and check the status of your bookings.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

### Notes:
- Make sure to replace the `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` placeholders in the `.env` file instructions with your actual database configuration.
- Adjust any other sections as needed to better fit your project specifics!