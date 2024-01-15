
# WebPOS - Munero

This web application is designed to interact with the MUNERO Global Loyalty APIs, providing a user-friendly and responsive interface for authentication, browsing the digital gift card catalogue, placing orders, and managing orders.

## Features

### Login Page

- Connect to the MUNERO Global Loyalty API using provided credentials to authenticate users.

### Main Page

- Display a navigation menu for easy access to the catalogue, ordering page, and order details.
- Show user wallet balance(s) and support displaying multiple wallet balances.

### Catalogue Page

- Pull data from the API to display the digital gift card catalogue.

### Ordering Page

- Allow users to place orders using the MUNERO Global Loyalty API.
- Display the claim URL as a QR code on the WebPOS screen for convenient consumption.

### Orders and Order Detail Page

- Implement a page to view the status of orders.
- Create a page to view detailed information about a specific order.

## Getting Started

### Prerequisites

- Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/deepakkumardewani/web-pos-munero
    ```

2. Navigate to the project directory:

    ```bash
    cd web-pos-munero
    ```

3. Install the required dependencies:

    ```bash
    npm install | yarn install
    ```

## Usage

1. Run the application:

    ```bash
    npm run dev
    ```

2. Access the application in your web browser at `http://localhost:3000`.
