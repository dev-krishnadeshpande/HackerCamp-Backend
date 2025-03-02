# Submission Service

- Designed a robust **Submission Service** using **Fastify**.
- Handles a high volume of requests efficiently.
- Integrated **Redis message queues** for asynchronous communication.
- Implemented **WebSocket services** to provide real-time feedback and enhance interactivity.

To run the project locally:

```sh
cd HackerCamp-Submission-Service

docker build -t submission-service:1.0 .

docker run --rm --name=submission-service-container --network mynetwork -e MONGO_URI="mongodb://mongo:27017/submissions" -p 8080:8080 submission-service:1.0

```
