ARG NODE_VERSION=20.18.1

# Base image
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /app

COPY package-lock.json package-lock.json

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm ci
RUN npm run build

# Expose the port the app runs on
EXPOSE 11000

# Set the default command to start the app
CMD ["node", "dist/index.js"]