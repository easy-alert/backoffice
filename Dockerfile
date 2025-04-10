# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app (if needed, e.g., React/Vue)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
