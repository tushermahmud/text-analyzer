
# Node.js Express MVC Application

This is a Node.js application built using the Express.js framework following the MVC (Model-View-Controller) design pattern. It uses MongoDB as the database and Redis as a caching service. The project is structured for scalability and maintainability with Docker support for easy local development.

## Table of Contents
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [License](#license)

## Requirements

To run this project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Project Structure

```
src/
│
├── config/           # All configuration files
├── controllers/      # Controllers handling HTTP requests
├── middlewares/      # Custom middleware for request processing
├── models/           # MongoDB data models
├── routes/           # Express router definitions
├── services/         # Business logic and service layer
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
├── views/            # Templates for server-side rendering
└── app.ts            # Main entry point of the application
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/tushermahmud/text-analyzer
    cd your-repo-name
    ```

2. Install Node.js dependencies:
    ```bash
    npm install
    ```

3. Ensure you have Docker and Docker Compose installed on your system.

## Running the Application

1. Build and run the application using Docker Compose:
    ```bash
    docker compose up --build
    ```

2. The application will be exposed on `http://localhost:4000`.

3. You can access:
    - MongoDB at `mongodb://localhost:27017` 
    - Redis at `redis://localhost:6379`
    - Adminer (DB management tool) at `http://localhost:8080`

## Configuration

The environment variables for the application are defined in the \`docker-compose.yml\` file. Below are the important environment variables:
- `MONGO_URL`: URL for the MongoDB instance (e.g., `mongodb://mongo:27017/mydatabase`)
- `REDIS_URL`: URL for Redis instance (e.g., `redis://redis:6379`)
- `GOOGLE_CLIENT_ID`: OAuth client ID for Google authentication
- `GOOGLE_CLIENT_SECRET`: OAuth client secret for Google authentication
- `SESSION_SECRET`: Secret key for session handling

## Running Tests

1. Install the required packages:
    ```bash
    npm install
    ```

2. Run tests:
    ```bash
    npm run test
    ```

## License

This project is licensed under the MIT License.
