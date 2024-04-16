#!/bin/bash
# Build the docker image
# docker build -t resident-info-service:latest .
# Run the docker container
docker run -p 4000:4000 --env-file .env resident-info-service
