# HackerCamp-Frontend

This project is a simple HTML-based frontend designed to display submission responses. The frontend establishes a connection with the socket service and retrieves the response as soon as it is ready.

To run the project locally:

```sh
cd HackerCamp-Frontend

docker build -t submission-response-frontend:1.0 .

docker run --rm --name=submission-response-frontend-container --network mynetwork -p 80:80 submission-response-frontend:1.0

```
