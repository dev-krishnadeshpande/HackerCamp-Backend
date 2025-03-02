# Evaluator Service

### ⚡ Advanced Code Execution

- Implemented an **Executor Service** in **TypeScript and Express**.
- Utilizes **Docker containers** to support JavaScript code execution.

To run the project locally:

```sh
cd HackerCamp-Evaluator-Service

docker build -t evaluator-service:1.0 .

docker run --privileged -v /var/run/docker.sock:/var/run/docker.sock --rm --name=evaluator-service-container --network mynetwork -p 4040:4040 evaluator-service:1.0

```
