#!/bin/bash

# Name of Docker image
IMAGE_NAME="resident-info-service"

# Name of Docker container
CONTAINER_NAME="resident-info-service"

# Port mapping (host:container)
PORT_MAPPING="4000:4000"

# Path to .env file
ENV_FILE_PATH="./.env"

# Stop the currently running container
echo "Stopping existing container..."
docker stop $CONTAINER_NAME

# Remove the stopped container
echo "Removing existing container..."
docker rm $CONTAINER_NAME

# Rebuild the Docker image with no cache
echo "Building new Docker image..."
docker build -t $IMAGE_NAME . --no-cache

# Run a new container from the rebuilt image
echo "Running new container..."
docker run --name $CONTAINER_NAME -p $PORT_MAPPING --env-file $ENV_FILE_PATH $IMAGE_NAME
