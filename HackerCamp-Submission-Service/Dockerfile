# Use official Node.js image
FROM node:20-alpine3.20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project (including dotenv files)
COPY . .

# Expose the port dynamically (Docker does not support dynamic EXPOSE, but we can still use it in the app)
EXPOSE 8080

# Set the default command
CMD ["npm", "start"]