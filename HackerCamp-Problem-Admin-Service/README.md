# Problem Admin Service

- Developed **Problem Admin Service** using **TypeScript, Express, and MongoDB**.
- Manages CRUD operations for coding problems.
- Supports complex test cases and code stubs to facilitate comprehensive evaluation.

To run the project locally:

```sh
cd HackerCamp-Problem-Admin-Service

docker build -t problem-admin-service:1.0 .

docker run --rm --name=problem-admin-service-container --network mynetwork -e MONGO_URI="mongodb://mongo:27017/problems" -p 6060:6060 problem-admin-service:1.0

```
