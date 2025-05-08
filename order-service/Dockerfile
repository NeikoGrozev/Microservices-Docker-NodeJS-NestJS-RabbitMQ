ARG NODE_VERSION=20.18.1

# Base image
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /app

COPY package-lock.json package-lock.json

# Copy the rest of the application files
COPY . .
COPY ./src/prisma prisma

# Install dependencies
RUN npm ci
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

# Expose the port the app runs on
EXPOSE 5010

# Set the default command to start the app
CMD ["node", "dist/src/main.js"]