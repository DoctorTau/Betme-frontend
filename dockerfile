# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start"]
