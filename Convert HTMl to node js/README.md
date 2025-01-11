# Multi-Page Web Application with Node.js, Express, and MongoDB

This is a multi-page web application built with **Node.js**, **Express**, and **MongoDB**, following the **MVC (Model-View-Controller)** architecture. The frontend uses **EJS** (Embedded JavaScript) templating to render dynamic content on the pages.

## Features

- **Home Page**: A welcoming page with an introduction to the website.
- **About Page**: A page with information about the website/company.
- **Contact Page**: A form to collect user queries and save them to MongoDB.
- **Product Page**: Displays a list of products fetched from MongoDB.

## Project Structure

The project follows the **MVC** architecture and has the following structure:


## Installation

### Prerequisites

- **Node.js** (>= 14.x)
- **MongoDB** (either locally or via MongoDB Atlas)

### Steps to Run the Project Locally

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add your MongoDB connection URI:

    ```bash
    MONGODB_URI=mongodb://localhost:27017/multi-page-app
    ```

4. Start the server:

    ```bash
    node app.js
    ```

5. Visit the app in your browser at [http://localhost:3000](http://localhost:3000).

## Endpoints

- **GET** `/` → Home Page
- **GET** `/about` → About Page
- **GET** `/contact` → Contact Form
- **POST** `/contact` → Submit Contact Form (saves data to MongoDB)
- **GET** `/products` → Display List of Products

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose for ODM)
- **Frontend**: EJS (Embedded JavaScript) for templating
- **Environment Variables**: dotenv

## Directory Breakdown

- **models**: Contains Mongoose schemas for Product and Contact models that interact with MongoDB.
- **controllers**: Handles business logic for each page (e.g., fetching products or saving contact form data).
- **routes**: Defines Express routes that map HTTP requests to controllers.
- **views**: EJS templates that are rendered to the user.

## Environment Variables

- `MONGODB_URI`: The URI for your MongoDB database (can be a local database or MongoDB Atlas URI).

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


