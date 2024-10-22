# Task Manager App

This project is a full-stack Task Manager application using Docker containers for the frontend, backend, and database.

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- Docker Engine
- Docker Compose

## Getting Started

Follow these steps to set up and run the Task Manager App:

1. Clone this repository to your local machine.

2. Create an external Docker volume for the PostgreSQL database:

   ```
   docker volume create postgres_data
   ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   VITE_API_BASE_URL=http://localhost:3000
   ```

   Replace `your_username`, `your_password`, and `your_database_name` with your desired values. The `VITE_API_BASE_URL` is set to `http://localhost:3000` because the backend is running on this port.

4. Build and run the Docker containers:

   ```
   docker compose up -d --build
   ```

   This command will build the images (if not already built) and start the containers in detached mode.

5. Once the containers are up and running, you can access the Task Manager App by opening your web browser and navigating to:

   ```
   http://localhost:5173
   ```

## Project Structure

The project consists of three main services:

- `frontend`: React application running on port 5173
- `backend`: Node.js/Express API running on port 3000
- `db`: PostgreSQL database

## Stopping the Application

To stop the application and remove the containers, run:

```
docker compose down
```

This command will stop and remove the containers, networks, and the default bridge network. However, it will not remove the external `postgres_data` volume, preserving your database data for the next run.

If you want to remove all data including the volume, you can use:

```
docker compose down -v
```

Be cautious with this command as it will delete all data stored in the database.
