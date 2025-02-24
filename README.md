Added readme.md

Container CMDs

docker run -d --name mongo --network mynetwork -p 27017:27017 -v mongo-data:/data/db mongo

docker run -it --name redis --network mynetwork -p 6379:6379 -v /myredis/conf:/usr/local/etc/redis redis redis-server

1. Problem Admin Sevice
   docker build -t problem-admin-service:1.0 .

docker run --rm --name=problem-admin-service-container --network mynetwork -e MONGO_URI="mongodb://mongo:27017/problems" -p 6060:6060 problem-admin-service:1.0

2. Submission Service

docker build -t submission-service:1.0 .

docker run --rm --name=submission-service-container --network mynetwork -e MONGO_URI="mongodb://mongo:27017/submissions" -p 8080:8080 submission-service:1.0

3. Evaluator Service

docker build -t evaluator-service:1.0 .

docker run --rm --name=evaluator-service-container --network mynetwork -p 4040:4040 evaluator-service:1.0

docker run --privileged -v /var/run/docker.sock:/var/run/docker.sock --rm --name=evaluator-service-container --network mynetwork -p 4040:4040 evaluator-service:1.0

4. Socket Server

docker build -t socket-server:1.0 .

docker run --rm --name=socket-server-container --network mynetwork -p 3001:3001 socket-server:1.0

5. Sample Socket Frontend

docker build -t submission-response-frontend:1.0 .

docker run --rm --name=submission-response-frontend-container --network mynetwork -p 80:80 submission-response-frontend:1.0
