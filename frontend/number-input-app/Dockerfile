# Use an official Node.js image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple web server to serve the build files
RUN npm install -g serve

# Expose port 3000 for the React app
EXPOSE 3000

# Command to serve the build files
CMD ["serve", "-s", "build"]
