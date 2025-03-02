# HackerCamp-Socket-Server

This service exposes API endpoint to collect response from submission service and sends it back to the respective clients connected through socket.

To run the project locally:

```sh
cd HackerCamp-Socket-Server

docker build -t socket-server:1.0 .

docker run --rm --name=socket-server-container --network mynetwork -p 3001:3001 socket-server:1.0

```
