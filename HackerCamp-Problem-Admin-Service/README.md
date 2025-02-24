## Todos

- Naming convention of folders and files
- Error handling (in global error handling middleware)
- Create generic response structure
- Debugging in local/dev, Node.js debugging
- Logging (Winston and Azure App Insights)
- Unit tests
- Load testing

## Deployment

- Render, Railway (or any free platform)
- Azure

docker run -d --name mongo --network mynetwork -p 27017:27017 -v mongo-data:/data/db mongo

docker run --rm --name=problem-admin-service-container --network mynetwork -e MONGO_URI="mongodb://mongo:27017/problems" -p 6060:6060 problem-admin-service:1.7
