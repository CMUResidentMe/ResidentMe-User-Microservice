# ResidentMe-UserController-Microservice

## Overview
This README provides instructions on how to set up and run the ResidentMe UserController microservice using Docker. The microservice is packaged into a Docker container, which can be rebuilt and rerun using the provided script.

## Prerequisites
Before you begin, make sure you have Docker installed on your machine. If you do not have Docker installed, you can download and install it from [Docker's official website](https://www.docker.com/get-started).

## Getting Started

### Step 1: Clone the Repository
To get started, clone this repository to your local machine using the following command:
```
git clone [repository-url]
cd ResidentMe-UserController-Microservice
```
Replace `[repository-url]` with the actual URL of the repository.

### Step 2: Create an .env File
Before proceeding with the Docker setup, create an `.env` file in the root directory of the project with the following content:
```
MONGODB_URI=your_own_url
JWT_SECRET=your_own_secret
```
Replace `your_own_url` and `your_own_secret` with your MongoDB connection string and JWT secret, respectively. This file is crucial for configuring your microservice's environment variables.

### Step 3: Make the Script Executable
Before running the script, you need to ensure it is executable. Run the following command in your terminal:
```
chmod +x ./rebuild_and_run_docker.sh
```
### Step 4: Run the Script
Once the script is executable, you can run it to rebuild and start the Docker container:
```
./rebuild_and_run_docker.sh
```
## What Does the Script Do?
The `rebuild_and_run_docker.sh` script performs the following actions:
1. Builds a new Docker image from the Dockerfile.
2. Stops any previously running containers of this microservice.
3. Starts a new container using the newly built image.

